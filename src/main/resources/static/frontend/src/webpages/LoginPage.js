import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import '../design/LoginPage.css'

const LoginPage = () => {
    const [username, setUsername] = useState('')         // username and password objects created
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')               // error object is created to display for exception handling
    const navigation = useNavigate();                     // useNavigate function to redirect user to custom Tools page once sucessfully logged in

    const handleSubmition = (error) => {
        error.preventDefault()                        // if user does not successfully login the tools page will not load

        if (!username || !password) {
            setError('Enter in both fields to Login!');             // If user does not sucessfully enter into both fields
        } else {
            setError('')
            console.log("Login successful!")                             // Success prompt displayed to user then redirected to tools page
            navigation('/Tools')
        }
    }
    return (
        <div className='loginBox'>
            <h1>Welcome Back!</h1>                             {/*Welcoming header for when the user loads the login webpage*/}
            <form onSubmit={handleSubmition} className='loginForm'>{/* handleSubmition function called to run logic throughout entire form */}
                <h2>LOGIN HERE!</h2>
                <div>
                    <label>Username:</label>
                    <input
                        type='text'
                        value={username}
                        onChange={(error) => setUsername(error.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>                               {/* See SignUpPage.js for commenting on logic of similar code*/}
                    <input
                        type='text'
                        value={password}
                        onChange={(error) => setPassword(error.target.value)}
                        required
                    />
                </div>
                {error && <p className= 'errorMessage'>{error}</p>}
                <button type='submit' className='loginButton'>LOGIN</button>
            </form>
        </div>
    );

};

export default LoginPage;
