import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
// import { DatePicker } from 'antd';

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import MainPage from './components/views/MainPage/MainPage';
import Auth from './hoc/auth'


function App() {
  
  const NewLandingPage  = Auth(LandingPage, null)   //null => 아무나 출입이 가능한 페이지
  const NewLoginPage  = Auth(LoginPage, false)       //true => 로그인한 유저만 출입이 가능한 페이지
  const NewRegisterPage  = Auth(RegisterPage, false) //false => 로그인한 유저는 출입 불가능한 페이지

  return (
    <Router>
      <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<NewLoginPage />} />
        <Route path="/register" element={<NewRegisterPage />} />
        <Route path="/main" element={<MainPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
