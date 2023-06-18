import React from 'react';
import './App.css';
import Sidebar from './layout/sidebar';
import ChatRoom from './chatroom';
import Home from './home';
import { Routes, Route, BrowserRouter } from "react-router-dom";


function App() { 

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/chatroom" element={<ChatRoom/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
