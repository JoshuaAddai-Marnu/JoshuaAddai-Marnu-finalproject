import { Link } from "react-router-dom"
import styled from "styled-components"

export default function Login() {

    
    return (
        <LoginStyled>
            <div className="container">
                <h2>
                    Login
                </h2>

                <form>
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" />
                    </div>
                    <div className="field">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" />
                    </div>
                    <button>
                        Login
                    </button>
                </form>

                <p>
                    Dont have an account? <Link to={"/signup"}>Signup</Link>
                </p>
            </div>
        </LoginStyled>
    )
}

const LoginStyled = styled.div`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    
    .container{
       min-width: 500px;

   }

   .field{
    margin-top: 20px;
   }
    
    h2{
        font-size: 50px;
        margin-bottom: 10px;
    }

    label{
        display:block;
    }

    input{
        width: 100%;
        padding: 18px;
    }

    button{
        width: 100%;
        margin-top: 20px;
        padding: 18px 0;
        font-size: 20px;
        border-radius: 5px;
        font-weight: 500;
        background-color: #ff424d;
        border: none;
        color: white;
    }

    p{
        margin-top: 10px;

        a{
            color: #ff424d;
            cursor: pointer;
        }
    }
`
