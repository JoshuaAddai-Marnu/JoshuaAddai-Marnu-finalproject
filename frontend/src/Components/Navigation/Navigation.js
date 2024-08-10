import React from 'react'
import styled from 'styled-components'
import JBB from '../../Img/JBB.png'
import { signout } from '../../Utils/Icons'
import { menuItems } from '../../Utils/menuItems'
import { Link, NavLink } from 'react-router-dom'

function Navigation() {
    return (
        <NavStyled>
            <div className="user-con">
                <img src={JBB} alt="" />
                <TextContainer>
                    <div className="text">
                        <h2>Welcome, Joshua</h2>
                        <p>Your Money</p>
                    </div>
                </TextContainer>
            </div>
            <ul className="menu-items">
                {menuItems.map((item) => {
                    return <NavLink
                        key={item.id}
                        to={item.link}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </NavLink>
                })}
            </ul>
            <div className="bottom-nav">
                <li>
                    {signout} Sign Out
                </li>
            </div>
        </NavStyled>
    )
}

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 374px;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;

    .user-con{
        display: flex;
        align-items: center;
        gap: 1rem;
        img{
            width: 150px;
            height: 150px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }
    }

    .menu-items{
        flex: 1;
        display: flex;
        flex-direction: column;
        a{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;
            text-decoration: none;
            i{
                color: rgba(34, 34, 96, 0.6);
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
        }
    }

    .active{
        color: rgba(34, 34, 96, 1) !important;
        i{
            color: rgba(34, 34, 96, 1) !important;
        }
        &::before{
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
        }
        p {
            color: rgba(34, 34, 96, .6);
            font-size: 1rem;
        }
    }
`;

export default Navigation
