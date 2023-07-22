// LastMessageContext.js

import { createContext, useState, useContext } from 'react';

// Context 생성
export const LastMessageContext = createContext();

// Provider 생성
export const LastMessageProvider = ({ children }) => {
  const [lastMessageContent, setLastMessageContent] = useState('');

  return (
    <LastMessageContext.Provider value={{ lastMessageContent, setLastMessageContent }}>
      {children}
    </LastMessageContext.Provider>
  );
};

export const useLastMessageContext = () => {
  return useContext(LastMessageContext);
};
