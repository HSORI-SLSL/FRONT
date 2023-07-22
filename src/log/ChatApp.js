import React, { useState } from 'react';
import './App.css';
import Chatroom from './Chatroom';
import Sidebar from './Sidebar';

function ChatApp() {
  const [messages, setMessages] = useState([]); // Define messages state here once

  return (
    <div className="app-container">
      <Sidebar messages={messages} /> {/* Pass messages prop to Sidebar */}
      <Chatroom messages={messages} setMessages={setMessages} /> {/* Pass messages and setMessages props to Chatroom */}
    </div>
  );
}

export default ChatApp;
