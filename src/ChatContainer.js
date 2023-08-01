// ChatContainer.js

import React, { useState } from 'react';
import Sidebar from './layout/Sidebar';
import Chatroom from './chatroom';

import { LastMessageProvider } from './LastMessageContext';

function ChatContainer() {
  const [messages, setMessages] = useState([]);

  
  return (
    <div className="chat-container">
      <LastMessageProvider>
        <Sidebar handleChatroomClick={handleChatroomClick} />
        <Chatroom messages={messages} setMessages={setMessages} />
      </LastMessageProvider>
    </div>
  );
}

export default ChatContainer;


