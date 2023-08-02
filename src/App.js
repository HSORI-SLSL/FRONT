import React from 'react';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Sidebar from './layout/Sidebar';
import ChatRoom from './chatroom';
import Home from './home';
import Login from './log/Login';
import Signup from './log/Signup';
import app from './log/firebase';
import Land from './land';
import Contents from './contents';

import { LastMessageProvider } from './LastMessageContext'; // 추가

function App() {
  return (
    <BrowserRouter>
    <LastMessageProvider>

    <Routes>
        <Route path="/" element={<WithSidebar component={Home} />} />
        <Route path="/chatroom" element={<WithSidebar component={ChatRoom} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/land" element={<Land/>}/>
        <Route path="/contents" element={<WithSidebar component ={Contents}/>}/>
      </Routes>
      </LastMessageProvider>
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

