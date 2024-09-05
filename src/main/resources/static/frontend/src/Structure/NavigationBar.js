import React from "react";
import {Link} from 'react-router-dom';  {/*react-router-dom package imported to have links on nav bar for CTA and other pages*/}


{
    /*
    * This jsx code is meant to describe the basic logic behind the nav bar on the landing page for this site*/
}

const NavigationBar = () => {
    return (
        <header>
            <nav className='navigationBar'>
                <ul className='webLinks'>
                    <li><Link to='/aboutMe'></Link></li>   {/*Links in nav bar to redirect to those URL pages*/}
                    <li><Link to='/SABR'></Link></li>
                </ul>
                <Link to='/SignUpPage'>
                    <button className='callToAction'>GET STARTED</button>     {/*Button embedded in link logic for start of CTA button*/}
                </Link>
            </nav>
        </header>
    )
}

export default NavigationBar;