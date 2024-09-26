import '../design/LoginPageNavigationBar.css'
import React from "react";
import {Link} from "react-router-dom";


const LoginPageNavigationBar = () => {
    return (
        <header>
            <nav className='loginNav'>
                <ul className='loginWebLinks'>
                    <li><Link to='/'>HOME</Link></li>
                    <li><Link to='/AboutMe'>ABOUT</Link></li>                {/* Navigation bar logic creation to direct to other webpages in the web application */}
                    <li><Link to='/LoginPage'>LOGIN</Link></li>
                    <li><Link to='/SABR'>SABR</Link></li>
                </ul>
                <Link to='/SignUpPage' >
                    <button className="loginCTA">NEW HERE?</button>            {/* CTA button for the LoginPage */}
                </Link>
            </nav>
        </header>
    )
}

export default LoginPageNavigationBar;