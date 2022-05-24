import React from 'react';
import Main from './Main/Main';
import DayNight from './daynight/DayNight';
import Error from "./404/404-1";
import Login from "./LoginRegistrationForgot/Login";
import Registration from "./LoginRegistrationForgot/Registration";
import Forgot from "./LoginRegistrationForgot/Forgot";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Loading from "./Loading/Loading";

export default function App() {
    // window.oncontextmenu = function () {
    //   console.log("Right Click Disabled");
    //   return false;
    // };
    return (
        <>
            <div className="background"></div>
            <Router>
                <Routes>
                    <Route extact path="/" element={<Main />} />
                    <Route extact path="/login" element={<Login />} />
                    <Route extact path="/registration" element={<Registration />} />
                    <Route extact path="/forgot" element={<Forgot />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </Router>
            <DayNight />
        </>
    )
}