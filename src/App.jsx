import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import React from "react";
import Navbar from './components/layouts/Navbar';
import Registration from "./components/pages/Registration";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./components/pages/Home";
import SitterList from "./components/pages/SitterList";
import SearchSitter from "./components/pages/SearchSitter";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import ChangePassword from "./components/pages/ChangePassword";
import ForgetPassword from "./components/pages/ForgetPassword";
import ResetPassword from "./components/pages/ResetPassword";

const  App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
            <Route exact path="/" element={<Home />} />  
            <Route exact path="/home" element={<Home />} />  
            <Route exact path="/register" element={<Registration />} />
            <Route exact path="/search" element={< SearchSitter />} />
            <Route exact path="/admin/sitterlist" element={<SitterList />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/changepassword" element={<ChangePassword />} />
            <Route exact path="/forgetpassword" element={<ForgetPassword />} />
        </Routes>
        <Routes>
        <Route  path="/reset_password" element={<ResetPassword />} />
        </Routes>
       
      </div>
    </Router>
  );
}

export default App;
