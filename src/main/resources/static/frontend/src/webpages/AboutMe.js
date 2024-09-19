import React from "react";
import {useNavigate} from "react-router-dom";
import "../design/AboutMe.css"



const AboutMe = () => {
    const navigate = useNavigate();                // useNavigate function is used to direct users to sign up web page

    const directCTA = () => {                                // directCTA function calls the useNavigate function to route user
        navigate('/SignUpPage');
    }

   return (
       <div className="aboutMeHeader">
           <header className="aboutNavbar">
               <ul>
                   <li><a href="/">HOME</a></li>
                   <li><a href ="/SignUpPage">SIGN UP</a></li>                    {/*href/li/a to reference each link to their respective web page, HTML*/}
                   <li><a href="/LoginPage">LOGIN</a></li>
                   <li><a href="/SABR">SABR</a></li>
               </ul>
               <button className="aboutCTA" onClick={directCTA}>GET STARTED</button>              {/* Button calls the directCTA function using the onClick type to router user when CTA is clicked*/}
           </header>
           <section className="aboutContent">
               <h1>About Me</h1>
               <div className="aboutSlider">
                   <img src="../images/CollegePhotoOne.JPG" alt="slideshow" />               {/* Starter implementation of AboutMe slideshow*/}
                   <p>My Slideshow</p>
               </div>
               <div className="aboutMeInfo">
                   <div className="infoSection">
                       <h2>My Love for SWD</h2>
                       <p>Placeholder</p>
                   </div>
                   <div className="infoSection">                             {/* Basic info sections to inform the user about the developer and why this app was created */}
                       <h2>My Baseball Career</h2>
                       <p>Placeholder</p>
                   </div>
                   <div className="infoSection">
                       <h2>Why Sabermetrics</h2>
                       <p>Placeholder</p>
                   </div>
               </div>
           </section>
       </div>

   );
};

export default AboutMe;