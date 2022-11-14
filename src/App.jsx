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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
