import React from "react";


{/*This jsx code is to display the home/landing page to users. This is a foundation before extensive sections are developed and formatted on this and other pages. 9/4/24*/}
const HomePage = () => {
    return (
        <div className='homeBanner'>   {/*Home banner code which includes headliner, buttons, and eventually links, image carousel, tut video etc*/}
            <div className='headliner'>
                <h1>Streamline Your Personal Sabermetric Needs!</h1>  {/*Home Banner to catch users eye is created along with front action buttons*/}
                <div className='frontButtons'>
                    <button>Login</button>
                    <button>Signup</button>         {/*Action Buttons are created to be clicked and eventually will redirect to their respective web page*/}
                </div>
            </div>
        </div>
    )
}

export default HomePage;