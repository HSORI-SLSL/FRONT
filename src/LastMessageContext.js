// LastMessageContext.js

import React, { useState, createContext, useContext, useEffect } from 'react';

const LastMessageContext = createContext();

export function LastMessageProvider({ children }) {
  const [lastMessageContent, setLastMessageContent] = useState('');

  useEffect(() => {
    // 세션 스토리지에서 이전에 저장된 마지막 대화 내용 가져오기
    const storedLastMessageContent = sessionStorage.getItem('lastMessageContent');
    if (storedLastMessageContent) {
      setLastMessageContent(storedLastMessageContent);
    }
  }, []);

  useEffect(() => {
    // 세션 스토리지에 마지막 대화 내용 저장
    sessionStorage.setItem('lastMessageContent', lastMessageContent);
  }, [lastMessageContent]);

  return (
    <LastMessageContext.Provider value={{ lastMessageContent, setLastMessageContent }}>
      {children}
    </LastMessageContext.Provider>
  );
}

export function useLastMessageContext() {
  return useContext(LastMessageContext);
}