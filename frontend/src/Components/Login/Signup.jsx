// Importing necessary libraries and components
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form"; // Form handling using React Hook Form
import { yupResolver } from "@hookform/resolvers/yup"; // Resolver for using Yup with React Hook Form
import * as yup from "yup"; // For schema validation
import { toast } from "react-toastify"; // For displaying notifications
import { useEffect, useState } from "react";

// Defining a validation schema for form inputs using Yup
const schema = yup
    .object({
        email: yup.string().email().required(), // Email field validation: must be a valid email
        password: yup.string().required(), // Password field validation: required
        name: yup.string().required(), // Name field validation: required
    })
    .required();

    // Signup component for user registration
export default function Signup() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useNavigate();

    useEffect(() => {
        // redirect to home if user is already logged in
        if (localStorage.getItem("JB_TOKEN")?.length) {
            router("/home");
        }
    }, []);

    // Initializing form handling with validation using react-hook-form and Yup
    const {
        register, // Registers inputs for validation
        handleSubmit, // Handles form submission
        formState: { errors }, // Stores validation errors
    } = useForm({
        resolver: yupResolver(schema), // Uses Yup schema for validation
    });

    // Form submission handler
    const onSubmit = async (data) => {
        setIsLoading(true); // Set loading state to true when the form is being submitted

        // Sending a POST request to signup API
        const request = await fetch("http://localhost:3001/api/v1/signup", {
            method: "POST",
            body: JSON.stringify(data), // Sending the form data as JSON
            headers: { "content-type": "application/json" },
        });

         // Handling the response from the API
         if (request.ok) {
            router("/login"); // Redirect to login page after successful signup
            toast("Successfully signed up, please log in", { type: "success" }); // Display success message
        } else {
            toast("There was an unexpected error", { type: "error" }); // Display error message
        }

        setIsLoading(false); // Reset loading state after submission
    };

    return (
        <SignupStyled>
            <div className="container">
                <h2>Signup</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="field">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" {...register("name")} />
                    </div>
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" {...register("email")} />
                    </div>
                    <div className="field">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" {...register("password")} />
                    </div>
                    <button disabled={isLoading}>
                        {isLoading ? "Loading..." : "Sign up"}
                    </button>
                </form>

                <p>
                    Already have an account? <Link to={"/login"}>Login</Link>
                </p>
            </div>
        </SignupStyled>
    );
}

const SignupStyled = styled.div`
    display: flex;
    height: 100vh; /* Ensure it takes up the full height */
    justify-content: center;
    align-items: center;
    padding: 1rem; /* Add padding to prevent content from touching the edges on small screens */

    .container {
        width: 100%;
        max-width: 500px; /* Set a max width for larger screens */
        background: white;
        padding: 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

        @media (max-width: 768px) {
            max-width: 100%;
            padding: 1.5rem;
        }

        h2 {
            font-size: 2.5rem;
            margin-bottom: 1.5rem;
            text-align: center;

            @media (max-width: 768px) {
                font-size: 2rem;
            }
        }

        .field {
            margin-top: 1rem;

            label {
                font-size: 1rem;
                margin-bottom: 0.5rem;
                display: block;
            }

            input {
                width: 100%;
                padding: 0.75rem;
                border-radius: 5px;
                border: 1px solid #ddd;
                font-size: 1rem;

                @media (max-width: 768px) {
                    padding: 0.5rem;
                }
            }
        }

        button {
            width: 100%;
            margin-top: 1.5rem;
            padding: 0.75rem;
            font-size: 1.25rem;
            border-radius: 5px;
            font-weight: 500;
            background-color: #ff424d;
            border: none;
            color: white;
            cursor: pointer;
            transition: background-color 0.3s;

            &:hover {
                background-color: #e63946;
            }

            &:disabled {
                background-color: #ddd;
                cursor: not-allowed;
            }

            @media (max-width: 768px) {
                padding: 0.75rem;
            }
        }

        p {
            margin-top: 1rem;
            font-size: 1rem;
            text-align: center;

            a {
                color: #ff424d;
                font-weight: bold;
                text-decoration: none;
                transition: color 0.3s;

                &:hover {
                    color: #e63946;
                }
            }
        }
    }
`;
