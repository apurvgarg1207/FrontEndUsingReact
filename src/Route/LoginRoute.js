import React from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import Login from '../Auth Module/Login';
import App from '../App';
import Signup from '../Auth Module/Signup';



function LoginRoute() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path='/app/*' element={<App />} />
                
              
            </Routes>           
        </div>
    );
}
export default LoginRoute;