import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import '../design/SignUpPage.css'

const SignUpPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')   //creates the username, password, and retype password objects
    const [error, setError] = useState('')    //error object for exception handling (I.E passwords don't match, field is not filled out)
    const navigation = useNavigate();          // navigation object and useNavigate function is created and ready to be used once Tools page is developed, this will redirect the user >
                                                               // once the user successully makes an account

    const handleSubmition = (error) => {
        error.preventDefault();             //if user does not create an account their Tools page won't load

        if (password !== confirmPassword) {
            setError('Inputted Passwords do NOT match.');       //if password and retyped password don't match user will be prompted to do so
        } else {
            setError('');
            console.log('Sign Up Successful!', {username, password});   //signup successful prompt along with logging method to display successful message
            navigation('/Tools')   //using the useNavigate method then redirects the user to their personal Tools page
        }
    };

    return (
        <div className='signUpBox'>
            <h1>CREATE YOUR ACCOUNT</h1> {/* Sign up eye catching header when user opens the sign up web page*/}
            <h2> Simple Sabre Scorecard</h2>
            <form onSubmit={handleSubmition} className="signUpForm">      {/* handleSubmition function is called to run to verify user input, handles the entire form below */}
                <h2> SIGN-UP</h2>
                <div>
                    <label>Username:</label>
                    <input
                        type= "text"                                // text box
                        value={username}                           //the value of the users input is the users created username for future logins and account data
                        onChange={(error) => setUsername(error.target.value)}  // onChange event is used if the intended value above has an error
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="text"
                        value={password}
                        onChange={(error) => setPassword(error.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input
                        type="text"
                        value={confirmPassword}
                        onChange={(error) => setConfirmPassword(error.target.value)}
                        required
                    />
                </div>
                {error && <p className='errorMessage'>{error}</p>}           {/* Paragraph created to display error messages */}
                <button type="submit" className='signUpButton'>SIGN UP</button>      {/* Button the user clicks to submit*/}
            </form>
        </div>
    );
};

export default SignUpPage;