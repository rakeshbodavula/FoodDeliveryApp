import { useContext } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import { AuthContext } from '../App';



const StyledNav = styled.div`
@import url("https://fonts.googleapis.com/css2?family=Lobster+Two&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Lobster&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600&display=swap');

& nav {
    position: absolute;
    top: 0;
    z-index: 10;
    width: 100%;
    display: flex;
  text-align: center;
  justify-content: space-between;
  height: 7vh;
  position: fixed;
  font-size: large;
  letter-spacing: 1px;
  background-color: #FF8200;
  background-color: #FDC22A;
}

& .logo-title-div {
    display: flex;
    text-align: center;
    align-items: center;
    font-size: 20px !important;
    font-family: default;
}

& .logo-title-div a {
    text-decoration: none;
  color: #ffff !important;
  font-family: 'Red Hat Text', sans-serif;
}

& #main_logo {
    height: 6vh;
    width: 6vh;
    border-radius: 50%;
    margin: 10px 10px 5px 20px;
    outline: solid 1px rgb(245, 121, 121);
}

& .nav {
    text-decoration: none;
    padding: 10px;
    display: flex;
    align-items: center;
}



& .nav ul {
    list-style: none;
  text-decoration: none;
}

& .nav ul li {
    display: inline-block;
    margin: 4px 15px;
}

& .nav ul li a {
    letter-spacing: 2px;
    font-size: 24px;
    text-decoration: none;
    border-radius: 5px;
    padding: 4px 6px;
    color: #ffff;
}

& .nav ul li a:hover:not(#loginUser),
& .nav ul li a:active {
    transition: 0.4s;
    background-color: orange;
    color: purple;
}

& #loginUser {
    background-color: #643fb4e1;
    border: solid 2px rgb(255, 255, 255);
    border-radius: 10px;
}

& .logout_btn{
    background:none;
    border:none;
}
`;


const NavBar = () => {

    // Getting the authentication token and logout function from the AuthContext
    const { authToken, logout } = useContext(AuthContext)

    return (
        <StyledNav>
            <nav className="change-nav-scroll">
                <div className="logo-title-div">
                    <p>
                        <img id="main_logo" src='/logo1.jpg' alt="Logo" />
                    </p>
                    <h1><Link to="/" className="title">Food Delivery</Link></h1>
                </div>
                <div className="nav">
                    <ul>
                        <li><Link to="/" className="nav-element">Home</Link></li>
                        <li><Link to="/order" className="nav-element">OrderFood</Link></li>
                        {/* Render the Login link if the user is not authenticated */}
                        {!authToken ?
                            <li><Link to="/login" className="nav-element">Login</Link></li> : <></>
                        }
                        {/* Render the Logout link if the user is authenticated */}
                        {authToken ? <li><Link className='nav-element' onClick={logout}>Logout</Link></li> : <></>}
                    </ul>
                </div>
            </nav>
        </StyledNav>
    );
}

export default NavBar;
