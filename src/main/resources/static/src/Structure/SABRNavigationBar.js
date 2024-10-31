import '../design/SABRNavigationBar.css'
import React from "react";
import {Link} from "react-router-dom";

const SABRNavigationBar = () => {
    return (
        <header>
            <nav className='sabrNav'>
                <ul className='sabrWebLinks'>
                    <li><Link to='/'>HOME</Link></li>
                    <li><Link to='/AboutMe'>ABOUT</Link></li>
                    <li><Link to='/LoginPage'>LOGIN</Link></li>
                </ul>
                <Link to='/SignUpPage'>
                    <button className='sabrCTAButton'>GET STARTED</button>
                </Link>
            </nav>
        </header>
    )
}

export default SABRNavigationBar