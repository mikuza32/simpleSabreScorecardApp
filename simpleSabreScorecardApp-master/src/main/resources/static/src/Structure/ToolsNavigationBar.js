import React from "react";
import {Link, useNavigate} from "react-router-dom";
import '../design/ToolsNavigationBar.css'

const ToolsNavigationBar = () => {
    const navigation = useNavigate();       // useNavigate function for routing to respective webpages

    const logout = () => {
        console.log('User has been logged out!')              // logout function will log the user out with no save feature for now, but returns user back to home page with navigation() function
        navigation('/')
    };
    return (
        <header className="toolsNavBar">
            <nav className="toolsNavContent">
                <ul className="toolsNavLinks">
                    <li><Link to="/">HOME</Link></li>
                    <li><Link to="/AboutMe">ABOUT</Link></li>
                    <li><Link to="/SABR">SABR</Link></li>
                </ul>
                <button className="userLogoutButton" onClick={logout}>LOGOUT</button>     {/* Routes user back to home page after logging out*/}
            </nav>
        </header>
    );
};

export default ToolsNavigationBar