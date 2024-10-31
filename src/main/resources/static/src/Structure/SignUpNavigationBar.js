import '../design/SignUpNavigationBar.css'
import React from "react";
import {Link} from "react-router-dom";


const SignUpNavigationBar = () => {
    return (
        <header>
            <nav className='signUpNav'>
                <ul className='signUpWebLinks'>
                    <li><Link to='/'>HOME</Link></li>
                    <li><Link to='/AboutMe'>ABOUT</Link></li>
                    <li><Link to='/LoginPage'>LOGIN</Link></li>
                    <li><Link to='/SABR'>SABR</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default SignUpNavigationBar;