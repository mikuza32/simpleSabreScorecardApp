import React from "react";
import {BrowserRouter as Router, Route, Routes, useLocation} from "react-router-dom";
import NavigationBar from './Structure/NavigationBar'
import AboutMe from './webpages/AboutMe'
import HomePage from'./webpages/HomePage'
import LoginPage from './webpages/LoginPage'
import SABR from './webpages/SABR'
import SignUpPage from './webpages/SignUpPage'
import Tools from './webpages/Tools'
import SignUpNavigationBar from "./Structure/SignUpNavigationBar";
import LoginPageNavigationBar from "./Structure/LoginPageNavigationBar";

function App() {
    const location = useLocation();

  return (
      <div>
          {location.pathname === '/' && <NavigationBar/>}
          {location.pathname === '/SignUpPage' && <SignUpNavigationBar/>}
          {location.pathname === '/LoginPage' && <LoginPageNavigationBar/>}
          <Routes>
              <Route path='/' element={<HomePage/>}/>
              <Route path='/aboutMe' element={<AboutMe/>}/>
              <Route path='/loginPage' element={<LoginPage/>}/>       {/*Each individual Route URL path is created using react-router-dom package in order
                                                                   to call each js file when acted upon. Each class created and their webpage will open since it is routed. */}
              <Route path='/sabr' element={<SABR/>}/>
              <Route path='/SignUpPage' element={<SignUpPage/>}/>
              <Route path='/tools' element={<Tools/>}/>
          </Routes>
      </div>


  );
}

export default App;
