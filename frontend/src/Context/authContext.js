import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useNavigate()
    const location = useLocation()

    function hasTimeElapsed() {
        const expirationTime = localStorage.getItem('JB_LOGGEDIN_TIME');
        if (!expirationTime) {
            return false;
        }

        const now = new Date();
        const storedTime = new Date(expirationTime);

        if (now >= storedTime) {
            return true;
        } else {
            return false;
        }
    }


    const login = () => setIsAuthenticated(true);
    const logout = () => {
        localStorage.removeItem("JB_TOKEN")
        localStorage.removeItem("JB_NAME")
        localStorage.removeItem("JB_LOGGEDIN_TIME")
        setIsAuthenticated(false)
        router("login")
    };

    useEffect(() => {
        const token = localStorage.getItem("JB_TOKEN")
        if (token?.length && !hasTimeElapsed()) {
            setIsAuthenticated(true)

        } else {
            setIsAuthenticated(false)
            if (!["/signup", "/login"].includes(location.pathname) && !isAuthenticated) {
                logout()
            } else {
            }
        }
    }, [localStorage])


    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
