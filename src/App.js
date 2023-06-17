import React from 'react';
import './App.css';
import Sidebar from './layout/sidebar';
import ChatRoom from './chatroom';
import Chatbot from './chatbot';

function App() {

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar/>
      <Chatbot/>
    </div>
  );
}


export default App;
