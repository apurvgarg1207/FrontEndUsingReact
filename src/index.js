// import 'bootstrap/dist/css/bootstrap.css';//Original theme 
// import './css/main.css';//orange color theam 
// import './css/red.css';//red color theam 
import './css/blue.css';//red color theam 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import './css/green.css';//green color theam 

// import "bootstrap-icons/font/bootstrap-icons.css";
// import 'main.min.css'
// import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginRoute from './Route/LoginRoute';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<div>
  <Router>
    
    <LoginRoute/>
    
  </Router>
  {/* <Router>
    
    <App />
    
  </Router> */}
  
  </div>
);


reportWebVitals();