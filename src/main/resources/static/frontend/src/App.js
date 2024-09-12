import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NavigationBar from './Structure/NavigationBar'
import AboutMe from './webpages/AboutMe'
import HomePage from'./webpages/HomePage'
import LoginPage from './webpages/LoginPage'
import SABR from './webpages/SABR'
import SignUpPage from './webpages/SignUpPage'
import Tools from './webpages/Tools'

function App() {
  return (
    <Router>
      <NavigationBar/>          {/*NavigationBar URL path is added so that it can be loaded anytime a webpage is called*/}
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/aboutMe' element={<AboutMe/>}/>
        <Route path='/loginPage' element={<LoginPage/>}/>       {/*Each individual Route URL path is created using react-router-dom package in order
                                                                   to call each js file when acted upon. Each class created and their webpage will open since it is routed. */}
        <Route path='/sabr' element={<SABR/>}/>
        <Route path='/SignUpPage' element={<SignUpPage/>}/>
        <Route path='/tools' element={<Tools/>}/>
      </Routes>
    </Router>
  );
}

export default App;
