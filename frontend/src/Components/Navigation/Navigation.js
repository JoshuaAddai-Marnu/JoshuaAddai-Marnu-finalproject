import React from "react";
import styled from "styled-components";
import JBB from "../../Img/JBB.png";
import { signout } from "../../Utils/Icons";
import { menuItems } from "../../Utils/menuItems";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/authContext";

function Navigation() {
  const { logout } = useAuth();
  const router = useNavigate();
  const userName = localStorage.getItem("JB_NAME");
  const firstName = userName ? userName.split(" ")[0] : "";

  return (
    <NavStyled>
      <div className="user-con">
        <img src={JBB} alt="User Avatar" />
        <TextContainer>
          <div className="text">
            <h2>Welcome, {firstName}</h2>
            <p>Your Money</p>
          </div>
        </TextContainer>
      </div>
      <ul className="menu-items">
        {menuItems.map((item) => {
          return (
            <NavLink key={item.id} to={item.link} activeClassName="active">
              {item.icon}
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </ul>
      <div className="bottom-nav">
        <li
          onClick={() => {
            logout();
            router("/login");
          }}
        >
          {signout} Sign Out
        </li>
      </div>
    </NavStyled>
  );
}

const NavStyled = styled.nav`
  padding: 2rem 1.5rem;
  width: 374px;
  height: 100%;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #ffffff;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: 768px) {
    width: 250px;
    padding: 1.5rem 1rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 1rem;
    height: auto;
    border-radius: 0;
  }

  .user-con {
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
      border: 2px solid #ffffff;
      padding: 0.2rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);

      @media (max-width: 768px) {
        width: 80px;
        height: 80px;
      }

      @media (max-width: 480px) {
        width: 60px;
        height: 60px;
      }
    }
  }

  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;

    a {
      display: grid;
      grid-template-columns: 40px auto;
      align-items: center;
      margin: 0.6rem 0;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      color: rgba(34, 34, 96, 0.6);
      padding-left: 1rem;
      position: relative;
      text-decoration: none;

      i {
        color: rgba(34, 34, 96, 0.6);
        font-size: 1.4rem;
        transition: all 0.4s ease-in-out;
      }

      @media (max-width: 768px) {
        padding-left: 0.5rem;
      }

      @media (max-width: 480px) {
        grid-template-columns: 30px auto;
        font-size: 0.9rem;
      }
    }
  }

  .active {
    color: rgba(34, 34, 96, 1) !important;

    i {
      color: rgba(34, 34, 96, 1) !important;
    }

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: #222260;
      border-radius: 0 10px 10px 0;
    }
  }

  .bottom-nav {
    li {
      cursor: pointer;
      display: flex;
      align-items: center;
      font-weight: 500;
      transition: all 0.4s ease-in-out;
      color: rgba(34, 34, 96, 0.6);
      padding-left: 1rem;

      @media (max-width: 480px) {
        font-size: 0.9rem;
        padding-left: 0.5rem;
      }

      i {
        margin-right: 0.5rem;

        @media (max-width: 480px) {
          font-size: 1.2rem;
        }
      }

      &:hover {
        color: rgba(34, 34, 96, 1);
      }
    }
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h1 {
    font-size: 1.5rem;
    color: rgba(34, 34, 96, 1);
  }

  .text {
    h2 {
      color: rgba(34, 34, 96, 1);
      font-size: 1.2rem;

      @media (max-width: 768px) {
        font-size: 1rem;
      }

      @media (max-width: 480px) {
        font-size: 0.9rem;
      }
    }

    p {
      color: rgba(34, 34, 96, 0.6);
      font-size: 1rem;

      @media (max-width: 768px) {
        font-size: 0.9rem;
      }

      @media (max-width: 480px) {
        font-size: 0.8rem;
      }
    }
  }
`;

export default Navigation;
