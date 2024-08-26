import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import JBB from "../../Img/JBB.png";
import { FaEnvelope, FaLock } from "react-icons/fa";

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useNavigate();

  useEffect(() => {
    // redirect to home if user is already logged in
    if (localStorage.getItem("JB_TOKEN")?.length) {
      router("/");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const request = await fetch("http://localhost:3001/api/v1/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });

    if (request.ok) {
      const response = await request.json();
      const now = new Date();
      const futureTime = new Date(now.getTime() + 23 * 60 * 60 * 1000); // Add 23 hours
      localStorage.setItem("JB_TOKEN", response?.data?.token);
      localStorage.setItem("JB_NAME", response?.data?.user?.name);
      localStorage.setItem("JB_LOGGEDIN_TIME", futureTime.toISOString());
      router("/home");
      toast("Successfully logged in", { type: "success" });
    } else {
      toast("Invalid credentials", { type: "error" });
    }

    setIsLoading(false);
  };

  return (
    <LoginStyled>
      <div className="floating-icons">
        <span className="icon fa-solid fa-chart-line"></span>
        <span className="icon fa-solid fa-credit-card"></span>
        <span className="icon fa-solid fa-tags"></span>
        <span className="icon fa-solid fa-wallet"></span>
        <span className="icon fa-solid fa-cog"></span>
        <span className="icon fa-solid fa-sign-out"></span>
        <span className="icon fa-solid fa-money-bill-trend-up"></span>
        <span className="icon fa-solid fa-money-bill-transfer"></span>
        <span className="icon fa-solid fa-money-bill"></span>
        <span className="icon fa-solid fa-earth-americas"></span>
        <span className="icon fa-solid fa-arrow-trend-up"></span>
        <span className="icon fa-brands fa-bitcoin"></span>
        <span className="icon fa-solid fa-piggy-bank"></span>
        <span className="icon fa-brands fa-youtube"></span>
        <span className="icon fa-brands fa-cc-visa"></span>
        <span className="icon fa-solid fa-users-between-lines"></span>
        <span className="icon fa-solid fa-dollar-sign"></span>
        <span className="icon fa-solid fa-sterling-sign"></span>
        <span className="icon fa-solid fa-calendar"></span>
        <span className="icon fa-solid fa-comment"></span>
        <span className="icon fa-solid fa-plus"></span>
        <span className="icon fa-solid fa-trash"></span>
        <span className="icon fa-solid fa-right-from-bracket"></span>
        <span className="icon fa-solid fa-utensils"></span>
        <span className="icon fa-solid fa-shirt"></span>
        <span className="icon fa-solid fa-book-open"></span>
        <span className="icon fa-solid fa-bowl-food"></span>
        <span className="icon fa-solid fa-briefcase-medical"></span>
        <span className="icon fa-solid fa-tv"></span>
        <span className="icon fa-solid fa-circle-dot"></span>
        <span className="icon fa-solid fa-bullseye"></span>
        <span className="icon fa-solid fa-scale-unbalanced"></span>
        <span className="icon fa-solid fa-hand-holding-dollar"></span>
      </div>
      <div className="image-container">
        <img src={JBB} alt="JoshBudgetBuddy Logo" />
      </div>
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <FaEnvelope className="icon" />
              <input
                {...register("email")}
                type="email"
                name="email"
                placeholder="Enter your email"
              />
            </div>
            {errors.email && <p className="error">Provide a valid email</p>}
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <FaLock className="icon" />
              <input
                {...register("password")}
                type="password"
                name="password"
                placeholder="Enter your password"
              />
            </div>
            {errors.password && <p className="error">Provide a password</p>}
          </div>
          <button disabled={isLoading}>
            {isLoading ? <Spinner /> : "Login"}
          </button>
        </form>
        <p>
          Don't have an account? <Link to={"/signup"}>Signup</Link>
        </p>
      </div>
    </LoginStyled>
  );
}

// Spinner component for loading state
const Spinner = () => (
  <div className="spinner">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

const floatAnimation = keyframes`
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
    100% {
        transform: translateY(0);
    }
`;

const glowAnimation = keyframes`
    0% {
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    }
    50% {
        box-shadow: 0 0 20px #4c16a4;
    }
    100% {
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    }
`;

const moveAnimation = keyframes`
    0% {
        transform: translateY(0) translateX(0);
    }
    50% {
        transform: translateY(-20px) translateX(20px);
    }
    100% {
        transform: translateY(0) translateX(0);
    }
`;

const LoginStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 91.5vh;
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
  padding: 7rem;
  position: relative;
  overflow: hidden;

  .floating-icons {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    pointer-events: none;

    .icon {
      position: absolute;
      color: rgba(255, 255, 255, 0.6);
      font-size: 2rem;
      animation: ${moveAnimation} 10s infinite ease-in-out;
      opacity: 0.8;

      /* Positioned icons around the screen */
      &.fa-chart-line {
        top: 10%;
        left: 5%;
      }
      &.fa-credit-card {
        top: 15%;
        right: 5%;
      }
      &.fa-tags {
        bottom: 10%;
        left: 5%;
      }
      &.fa-wallet {
        bottom: 15%;
        right: 5%;
      }
      &.fa-cog {
        top: 45%;
        left: 10%;
      }
      &.fa-sign-out {
        top: 45%;
        right: 10%;
      }
      &.fa-money-bill-trend-up {
        top: 5%;
        left: 15%;
      }
      &.fa-money-bill-transfer {
        top: 5%;
        right: 15%;
      }
      &.fa-money-bill {
        bottom: 5%;
        left: 50%;
        transform: translateX(-50%);
      }
      &.fa-earth-americas {
        top: 90%;
        left: 28%;
      }
      &.fa-arrow-trend-up {
        top: 30%;
        right: 20%;
      }
      &.fa-bitcoin {
        bottom: 25%;
        left: 20%;
      }
      &.fa-piggy-bank {
        bottom: 30%;
        right: 20%;
      }
      &.fa-youtube {
        top: 35%;
        left: 30%;
      }
      &.fa-cc-visa {
        top: 40%;
        right: 30%;
      }
      &.fa-users-between-lines {
        bottom: 35%;
        left: 30%;
      }
      &.fa-dollar-sign {
        bottom: 40%;
        right: 30%;
      }
      &.fa-sterling-sign {
        top: 10%;
        right: 25%;
      }
      &.fa-calendar {
        bottom: 10%;
        right: 25%;
      }
      &.fa-comment {
        top: 60%;
        left: 35%;
      }
      &.fa-plus {
        top: 65%;
        right: 35%;
      }
      &.fa-trash {
        bottom: 60%;
        left: 35%;
      }
      &.fa-right-from-bracket {
        bottom: 65%;
        right: 35%;
      }
      &.fa-utensils {
        top: 70%;
        left: 40%;
      }
      &.fa-shirt {
        top: 75%;
        right: 40%;
      }
      &.fa-book-open {
        bottom: 70%;
        left: 40%;
      }
      &.fa-bowl-food {
        bottom: 75%;
        right: 40%;
      }
      &.fa-briefcase-medical {
        top: 80%;
        left: 45%;
      }
      &.fa-tv {
        top: 85%;
        right: 45%;
      }
      &.fa-circle-dot {
        bottom: 80%;
        left: 45%;
      }
      &.fa-bullseye {
        bottom: 85%;
        right: 45%;
      }
      &.fa-scale-unbalanced {
        top: 50%;
        left: 55%;
        transform: translateX(-50%);
      }
      &.fa-hand-holding-dollar {
        bottom: 90%;
        right: 50%;
        transform: translateX(50%);
      }
    }
  }

  .image-container {
    flex: 1;
    display: flex;
    justify-content: left;
    padding-left: 8rem;
    align-items: center;
    animation: ${floatAnimation} 3s ease-in-out infinite;
    z-index: 1;

    img {
      max-width: 500px;
      width: 100%;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      animation: ${glowAnimation} 2s ease-in-out infinite;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 30px rgba(255, 255, 255, 0.8);
      }
    }

    @media (max-width: 768px) {
      display: none;
    }
  }

  .container {
    flex: 1;
    background-color: white;
    border-radius: 10px;
    padding: 3rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
    text-align: center;
    z-index: 1;

    h2 {
      font-size: 2.5rem;
      color: #333;
      font-weight: bold;
      margin-bottom: 2rem;
    }

    .field {
      margin-top: 1.5rem;
      text-align: left;

      label {
        display: block;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #555;
      }

      .input-wrapper {
        position: relative;
        display: flex;
        align-items: center;

        .icon {
          position: absolute;
          left: 15px;
          color: #aaa;
        }

        input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 40px;
          border-radius: 5px;
          border: 1px solid #ddd;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.3s;

          &:focus {
            border-color: #ff424d;
          }
        }
      }

      .error {
        font-size: 0.875rem;
        color: #ff424d;
        margin-top: 0.5rem;
      }
    }

    button {
      width: 100%;
      margin-top: 1.5rem;
      padding: 0.75rem 0;
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

      .spinner {
        display: flex;
        justify-content: center;
        align-items: center;

        div {
          width: 8px;
          height: 8px;
          margin: 0 2px;
          background-color: white;
          border-radius: 50%;
          animation: bounce 1.4s infinite both;
        }

        @keyframes bounce {
          0%,
          100% {
            transform: scale(0);
          }
          50% {
            transform: scale(1);
          }
        }
      }
    }

    p {
      margin-top: 1.5rem;
      font-size: 1rem;

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

    @media (max-width: 500px) {
      padding: 2rem;

      h2 {
        font-size: 2rem;
      }
    }
  }
`;
