// Importing necessary hooks and context API from React and react-router
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Creating the authentication context
const AuthContext = createContext();

// AuthProvider component provides authentication context to children components
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track if user is authenticated
    const router = useNavigate(); // Hook to programmatically navigate between routes
    const location = useLocation(); // Hook to get current location (URL)

    // Function to check if the session time has elapsed
    function hasTimeElapsed() {
        const expirationTime = localStorage.getItem('JB_LOGGEDIN_TIME'); // Fetch the session expiration time from localStorage
        if (!expirationTime) {
            return false; // If no expiration time is set, return false
        }

        const now = new Date(); // Current time
        const storedTime = new Date(expirationTime); // Stored expiration time

        return now >= storedTime; // Return true if current time has passed the expiration time
    }

    // Function to set the user as logged in
    const login = () => setIsAuthenticated(true);

    // Function to log out the user by clearing session data and redirecting to login page
    const logout = () => {
        localStorage.removeItem("JB_TOKEN"); // Remove authentication token
        localStorage.removeItem("JB_NAME"); // Remove user name
        localStorage.removeItem("JB_LOGGEDIN_TIME"); // Remove session expiration time
        setIsAuthenticated(false); // Set authentication state to false
        router("login"); // Redirect to login page
    };

    // useEffect to check if user is authenticated on component mount and on localStorage changes
    useEffect(() => {
        const token = localStorage.getItem("JB_TOKEN"); // Fetch token from localStorage
        // Check if the token exists and session time hasn't elapsed
        if (token?.length && !hasTimeElapsed()) {
            setIsAuthenticated(true); // User is authenticated
        } else {
            setIsAuthenticated(false); // User is not authenticated
            // Redirect to login/signup if not authenticated and not already on these pages
            if (!["/signup", "/login"].includes(location.pathname) && !isAuthenticated) {
                logout(); // Log out the user and redirect to login
            }
        }
    }, [localStorage]); // Runs when localStorage changes

    // Providing authentication-related state and functions to children components
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children} {/* Renders the child components */}
        </AuthContext.Provider>
    );
};

// Custom hook to use authentication context in any component
export const useAuth = () => {
    return useContext(AuthContext);
};
