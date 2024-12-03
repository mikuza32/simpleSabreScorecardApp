import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import '../design/HomePage.css';
{/*This jsx code is to display the home/landing page to users. This is a foundation before extensive sections are developed and formatted on this and other pages. 9/4/24*/}
const HomePage = () => {
    const navigation = useNavigate();         {/*useNavigate function to route users to their respective web pages*/}

    const [formValue, setFormValue] = useState({
        atBats: '',
        walks: '',
        hitByPitch: '',
        hits: '',
        sacrificeFlies: '',
        onBasePercentage: ''
    });
    {/* useState function used to set each variable to nothing so the user can manipulate on the web page*/}

    const handleInput = (Event) => {
        const {name, value} = Event.target;
        setFormValue({...formValue,[name]: value});            // Handles user input to their respective variables, in the event they chose to enter values in the TryMe form
    }

    const calcOnBasePercentage = (Event) => {
        Event.preventDefault();  // user input does not refresh webpage in the event a user calculates OBP
        const {atBats, walks, hitByPitch, hits, sacrificeFlies} = formValue;
        const ABs = parseFloat(atBats) || 0;
        const BB = parseFloat(walks) || 0;
        const HBP = parseFloat(hitByPitch) || 0;                        // Each variable is set and to be manipulated by their acronyms, in which their primary state is set to 0
        const H = parseFloat(hits) || 0;
        const SF = parseFloat(sacrificeFlies) || 0;

        const onBasePercentage = (H + BB + HBP) / (ABs + BB + HBP + SF);                 // Sets onBasePercentage to the exact formula to calculate the stat
        const onBasePercentageFixed = onBasePercentage && (ABs + BB + SF + HBP) > 0 ? onBasePercentage.toFixed(3): '0.000';  // onBasePercentage is called in the fixed function using the toFixed function to create a decimal when displaying
        setFormValue({...formValue, onBasePercentage: onBasePercentageFixed});

    };


    const loadLogin = () => {
        navigation('/LoginPage');
    };

    const loadSignUp = () => {
        navigation('/SignUpPage');
    };

    const homeSlides = [
        process.env.PUBLIC_URL + "ohtani.jpg",
        process.env.PUBLIC_URL + "1_8H2qjYmDnNrRxtu_7eLfkA.jpg",          //embeds images from the public directory so that they can be displayed
        process.env.PUBLIC_URL + "220929124151-aaron-judge-0926.jpg",
        process.env.PUBLIC_URL + "samplePhoto.jpg"
    ];

    const [slideIndex, setSlideIndex] = useState(0);          // sets the initialized state to the first image before being manipulated

    const nextSlide = () => {
        setSlideIndex((prevIndex) => (prevIndex + 1 ) % homeSlides.length);  //increment one everytime the user clicks the next button
    };

    const prevSlide = () => {
        setSlideIndex((prevIndex) =>
            prevIndex === 0 ? homeSlides.length - 1 : prevIndex - 1           // increment back one everytime the user clicks the prev button
        );
    };

    useEffect(() => {
        const intervalID = setInterval(nextSlide, 10000);
        return () => clearInterval(intervalID);                            // intervals of 10 seconds to change the photo to the next image in line
    }, []);

    return (
        <div
            className='homeBanner'>   {/*Home banner code which includes headliner, buttons, and eventually links, image carousel, tut video etc*/}
            <div className='headliner'>
                <h1>Streamline Your Personal Sabermetric
                    Needs!</h1>  {/*Home Banner to catch users eye is created along with front action buttons*/}
                <div className='frontButtons'>
                    <button onClick={loadLogin}>Login</button>
                    <button onClick={loadSignUp}>Signup</button>
                    {/*Action Buttons are created to be clicked and eventually will redirect to their respective web page*/}
                </div>
            </div>
            <div className="homeContentPictures">
                <div className="homePicSlide">
                    {homeSlides.map((slide, index) => (
                        <img
                            key={index}
                            className={`homeSlides ${index === slideIndex ? "displaySlides" : ""}`}
                            src={slide}
                            alt={`slide ${index}`}
                            style={{display: index === slideIndex ? "block" : "none"}}/>
                    ))}
                    <button className="homePrev" onClick={prevSlide}>&#10094;</button>
                    <button className="homeNext" onClick={nextSlide}>&#10095;</button>                                {/*This div is for the middle section in which will display the image carousel as well as tut video*/}
                </div>
                <div className="videoTutorial">
                    <p>Welcome Tutorial: </p>
                    <iframe
                        width="300"
                        height="200"
                        src="https://www.youtube.com/embed/HN0TOO1FhHM"
                        title="Website Tutorial"
                        allow="accelerometer: autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
            <div className="userContent">
                <div className="ourServices">
                    <h2>We Calculate:</h2>                                                  {/*Seperate div that has the list of services, benefits, and try me sections*/}
                    <div className="metrics">
                        <div>
                            <h3>Offensive Metrics: </h3>
                            <p>Batting Average, On Base Percentage, Slugging Percentage, On Base Plus Slugging, Walk
                                Percentage, Strikeout Percentage</p>
                        </div>
                        <div>
                            <h3>Defensive Metrics: </h3>
                            <p>Fielding Percentage, Adjusted Pitching Runs, Earned Run Average, Earned Run Average Plus,
                                Walk and Hits per Innings Pitched, Opposing Team Batting Average</p>
                        </div>
                        <p>Disclaimer: These metrics will not guarantee improvements! Data cannot provide change, only reasoning!</p>                                      {/* Disclaimer to users that this is a simple sabermetrics calculator, not state of the art*/}
                    </div>
                </div>
                <div className="userBenefits">
                    <h2>How will this Benefit YOU?</h2>
                    <p>By inputting personal counting stats one can analyze their performance and generate a summary based on what they see themselves.
                    For example, if one has a low on base percentage, they may have to change their approach in their at bats. This can help improve performance and help
                    their team win!</p>
                </div>
                <div className="tryMe">
                    <h2>TRY ME: </h2>
                    <p>Calculate OBP (On Base Percentage) Simulation</p>
                    <form onSubmit={calcOnBasePercentage}>                                                {/*Calls these calcOnBasePercentage function */}
                        <label>
                            Total At Bats:
                            <input type="number" name="atBats" value={formValue.atBats} onChange={handleInput}/>
                        </label>
                        <label>
                            Total Walks:
                            <input type="number" name="walks" value={formValue.walks} onChange={handleInput}/>
                        </label>
                        <label>
                            Total Hit By Pitch:
                            <input type="number" name="hitByPitch" value={formValue.hitByPitch} onChange={handleInput}/>      {/* This div handles the logic behind the user entering data and retrieving for a sample*/}
                        </label>
                        <label>
                            Total Hits:
                            <input type="number" name="hits" value={formValue.hits} onChange={handleInput}/>
                        </label>
                        <label>
                            Total Sacrifice Flies:
                            <input type="number" name="sacrificeFlies" value={formValue.sacrificeFlies} onChange={handleInput}/>
                        </label>
                        <div>
                            <span>Calculation: </span>
                            <input type="text" name="onBasePercentage" value={formValue.onBasePercentage} readOnly/>                  {/* Read only boolean for the box that displays OBP result*/}
                        </div>
                        <button type="submit">Calculate</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HomePage;