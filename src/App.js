import React from 'react';
import './App.css';
import Sidebar from './layout/sidebar';
import ChatRoom from './chatroom';

function App() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar/>
      <ChatRoom/>
    </div>
  );
}


export default App;
