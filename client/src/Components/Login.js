import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../App";
import axios from 'axios';

const Login = () => {
  // Get the setAuthToken function from the AuthContext
  const { setAuthToken } = useContext(AuthContext);

  // Get the navigation function from react-router-dom
  const navigate = useNavigate();

  // Use state hooks to manage email and password input values
  const [email, setEmail] = useState('test1@example.com');
  const [password, setPassword] = useState('password1');

  // Handle form submission and send a login request to the server
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post('http://localhost:5000/api/login', { email, password });
    const token = response.data.token;
    localStorage.setItem('token', token);
    setAuthToken(token);
    navigate('/');
  };

  // Return the JSX of the Login component
  return (
    <>
      <LoginStyledDiv>
        <div className="login-container">
          <div className="loginform">
            <div className="loginform-container">
              <div className="loginform-left">
                <form onSubmit={handleSubmit}>
                  <div className="input-block">
                    <label htmlFor="email" className="input-label">Email</label>
                    <input type="email" autoComplete="off" name="email" id="email" defaultValue="test1@example.com" onChange={(e) => setEmail(e.target.value)} />
                  </div>

                  <div className="input-block">
                    <label htmlFor="password" className="input-label">Password</label>
                    <input type="password" autoComplete="off" name="password" id="password" defaultValue="password1" onChange={(e) => setPassword(e.target.value)} />
                  </div>

                  <div className="loginform-buttons">
                    <button className="input-button" type="submit">Login</button>
                  </div>

                </form>
              </div>

              <div className="loginform-right">
                <img src="login_bg.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </LoginStyledDiv>
    </>
  );
};



const LoginStyledDiv = styled.section`
#login-bg{
  position: absolute;
    left: 0px;
    top: 0px;
    z-index: -1;
    width: 100%;
    height: 100%;
  }
  .login-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #FF9771;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loginform {
    width: 100%;
    /* height: 60px; */
    background: rgba(51, 51, 51, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: 0.4s;
  }
  .loginform-container {
    display: flex;
    max-width: 60vw;
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    position: absolute;

    transition-duration: 0.3s;
    background: #fff;
  }
  .loginform-title {
    margin: 0;
    font-weight: 400;
    font-size:40px;
    color: #55311c;
  }
  .form-error {
    font-size: 1.4rem;
    color: #b22b27;
  }
  .loginform-desc {
    margin: 6px 0 30px 0;
    font-size: 20px;
  }
  .loginform-left {
    padding: 60px 30px 20px;
    background: #fff;
    // background: #40C9B4;
    flex: 1.5;
    transition-duration: 0.5s;
    opacity: 1;
  }
  
  .loginform-right {
    // background: #40C9B4;
    flex: 2;
    font-size: 0;
    transition: 0.3s;
    overflow: hidden;

  }
  .loginform-right img {
    position : relative;
    top : 8vh;
    left : 7vw;
    width: 60%;
    height: 70%;
    transform: scale(1.15);
    object-fit: cover;
    transition-duration: 1.2s;
  }

  .loginform.is-open .loginform-left {
    transform: translateY(0);
    opacity: 1;
    transition-delay: 0.1s;
  }
  .loginform-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .loginform-buttons a {
    color: rgba(51, 51, 51, 0.6);
    font-size: 14px;
  }

  .input-button {
    display: inline-block;
    padding: 1.2rem 3.2rem;
    outline: none;
    text-transform: uppercase;
    border: 0;
    color: #fff;
    border-radius: 4px;
    background: #8c7569;
    transition: 0.3s;
    cursor: pointer;
    font-family: "Nunito", sans-serif;
  }
  .input-button:hover {
    background: #55311c;
  }

  .input-label {
    font-size: 11px;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.7px;
    color: #8c7569;
    transition: 0.3s;
  }

  .input-block {
    display: flex;
    flex-direction: column;
    padding: 10px 10px 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: 0.3s;
    height:5vh;
    margin:35px;
    margin-bottom: 40px;
    transform:scale(1.2);
  }
  .input-block input {
    outline: 0;
    border: 0;
    padding: 4px 0 0;
    font-size: 14px;
  }

  .input-block input::-moz-placeholder {
    color: #ccc;
    opacity: 1;
  }
  .input-block input:-ms-input-placeholder {
    color: #ccc;
    opacity: 1;
  }
  .input-block input::placeholder {
    color: #ccc;
    opacity: 1;
  }
  .input-block:focus-within {
    border-color: #8c7569;
  }
  .input-block:focus-within .input-label {
    color: rgba(140, 117, 105, 0.8);
  }

`;



export default Login;