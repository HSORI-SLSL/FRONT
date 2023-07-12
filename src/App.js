import React from 'react';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Sidebar from './layout/sidebar';
import ChatRoom from './chatroom';
import Home from './home';
import Login from './log/Login';
import Signup from './log/Signup';
import app from './firebase';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WithSidebar component={Home} />} />
        <Route path="/chatroom" element={<WithSidebar component={ChatRoom} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}


function WithSidebar({ component: Component }) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar/>
      <Component/>
    </div>
  );
}

export default App;

