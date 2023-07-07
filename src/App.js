import React from 'react';
import './App.css';
import Sidebar from './layout/sidebar';
import ChatRoom from './chatroom';
import Home from './home';
import Login from './log/Login';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signup from './log/Signup';
import app from "./firebase";


function App() { 

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/chatroom" element={<ChatRoom/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
