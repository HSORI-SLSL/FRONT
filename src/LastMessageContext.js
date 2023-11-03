import React, { useState, createContext, useContext, useEffect } from 'react';

const LastMessageContext = createContext();

export function LastMessageProvider({ children }) {
  const [lastMessageContent, setLastMessageContent] = useState('');
  const [sejongLatestMessage, setSejongLatestMessage] = useState('');
  // 다른 채팅방에 대한 상태 변수 추가
  const [taejongLatestMessage, setTaejongLatestMessage] = useState('');
  const [yeongjoLatestMessage, setYeongjoLatestMessage] = useState('');

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
    <LastMessageContext.Provider
      value={{
        lastMessageContent,
        setLastMessageContent,
        sejongLatestMessage, // 세종 대화방의 최신 메시지 상태
        setSejongLatestMessage, // 세종 대화방의 최신 메시지 업데이트 함수
        taejongLatestMessage, // 다른 대화방의 최신 메시지 상태
        setTaejongLatestMessage, // 다른 대화방의 최신 메시지 업데이트 함수
        yeongjoLatestMessage, // 다른 대화방의 최신 메시지 상태
        setYeongjoLatestMessage, // 다른 대화방의 최신 메시지 업데이트 함수
      }}
    >
      {children}
    </LastMessageContext.Provider>
  );
}

export function useLastMessageContext() {
  return useContext(LastMessageContext);
}
