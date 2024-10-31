import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "../design/AboutMe.css"



const AboutMe = () => {
    const navigate = useNavigate();                // useNavigate function is used to direct users to sign up web page

    const directCTA = () => {                                // directCTA function calls the useNavigate function to route user
        navigate('/SignUpPage');
    }

    const aboutSlides = [
        process.env.PUBLIC_URL + "CollegePhotoOne.JPG",
        process.env.PUBLIC_URL + "athlete_3169311_profile.jpg",
        process.env.PUBLIC_URL + "2179053468-ZaneMikula.JPG",
    ];

    const [slideIndex, setSlideIndex] = useState(0);   //sets the inital state to zero for the slides, this being that the first slide to be shown is the first url image provided

    const nextSlide = () => {
        setSlideIndex((prevIndex) => (prevIndex + 1 ) % aboutSlides.length);  // starting from 0 the slide will go to the next one when the user clicks on the button or hits 10 seconds
    };

    const prevSlide = () => {
        setSlideIndex((prevIndex) =>
        prevIndex === 0 ? aboutSlides.length - 1 : prevIndex - 1            // starting from 0 the slide will go back one, this being the last image provided
        );
    };

    useEffect(() => {
        const intervalID = setInterval(nextSlide, 10000);   //intervals the slide to change to the next image after 10 seconds
        return () => clearInterval(intervalID);     // returns that iteration so that it is done on a loop
    }, []);



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
                   {aboutSlides.map((slide, index) => (   // Dynamically renders the images provided in aboutSlides function to generate all three img elements
                       <img
                            key={index}
                            className={`aboutSlides ${index === slideIndex ? "displaySlides" : ""}`}
                            src={slide}                                                               //indicates what slide to show, based on the index
                            alt={`slide ${index}`}
                            style={{display: index === slideIndex ? "block" : "none"}}/>
                   ))}
               </div>
               <button className="prev" onClick={prevSlide}>&#10094;</button>   {/* Calls the prevSlide and nextSlide functions, so that their logic used when the prev and next button is clicked*/}
               <button className="next" onClick={nextSlide}>&#10095;</button>
               <div className="aboutMeInfo">
                   <div className="infoSection">
                       <h2>My Love for SWD</h2>
                       <p>After my baseball career ended, I struggled to find a passion in something other than sports and school. This then led to computers in my free time.
                       After learning about my excitement and curiosity of how software works, I wanted to learn and use that knowledge as a career. This project is not just a school project but also a
                       passion project since I am able to utilize both my love and knowledge for baseball and software development at the same time!</p>
                   </div>
                   <div className="infoSection">                             {/* Basic info sections to inform the user about the developer and why this app was created */}
                       <h2>My Baseball Career</h2>
                       <p>As I have played baseball my entire life, I was blessed enough to experience a high level of competition throughout my life. From college baseball, to travel youth baseball, and everything in between.
                       These experiences blessed me to have great knowledge of the game at the player level, and to be able to provide that knowledge to others through software development is amazing!</p>
                   </div>
                   <div className="infoSection">
                       <h2>Why Sabermetrics</h2>
                       <p>Sabermetrics not only paints a picture using numbers on how well one performs, but also can be used as a catalyst to analyze and improve. Certain new age metrics like WHIP helped me adjust
                       and point out what I needed to improve upon in my career. Therefore, one can apply the same to analyze their performance using numbers!</p>
                   </div>
               </div>
           </section>
       </div>

   );
};

export default AboutMe;