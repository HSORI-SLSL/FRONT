import React, { useState, createContext, useContext, useEffect } from 'react';

const LastMessageContext = createContext();

export function LastMessageProvider({ children }) {
  const [sejongLatestMessage, setSejongLatestMessage] = useState('');
  // 다른 채팅방에 대한 상태 변수 추가
  const [taejongLatestMessage, setTaejongLatestMessage] = useState('');
  const [yeongjoLatestMessage, setYeongjoLatestMessage] = useState('');

  useEffect(() => {
    // 세션 스토리지에서 이전에 저장된 채팅 목록 데이터 가져오기
    const storedSejongLatestMessage = sessionStorage.getItem('sejongLatestMessage');
    const storedTaejongLatestMessage = sessionStorage.getItem('taejongLatestMessage');
    const storedYeongjoLatestMessage = sessionStorage.getItem('yeongjoLatestMessage');

    if (storedSejongLatestMessage) {
      setSejongLatestMessage(storedSejongLatestMessage);
    }

    if (storedTaejongLatestMessage) {
      setTaejongLatestMessage(storedTaejongLatestMessage);
    }

    if (storedYeongjoLatestMessage) {
      setYeongjoLatestMessage(storedYeongjoLatestMessage);
    }
  }, []);

  const clearChatHistory = () => {
    setSejongLatestMessage('안녕하신가!'); // 초기화할 때 메시지를 빈 문자열로 설정
  };

  const clearChatHistory1 = () => {
    setTaejongLatestMessage('안녕하신가!'); // 초기화할 때 메시지를 빈 문자열로 설정
  };

  const clearChatHistory2 = () => {
    setYeongjoLatestMessage('안녕하신가!'); // 초기화할 때 메시지를 빈 문자열로 설정
  };

    
  useEffect(() => {
   // 세션 스토리지에 채팅 목록 데이터 저장
    sessionStorage.setItem('sejongLatestMessage', sejongLatestMessage);
    sessionStorage.setItem('taejongLatestMessage', taejongLatestMessage);
    sessionStorage.setItem('yeongjoLatestMessage', yeongjoLatestMessage);
  }, [sejongLatestMessage, taejongLatestMessage, yeongjoLatestMessage]);

  return (
    <LastMessageContext.Provider
      value={{
        sejongLatestMessage, // 세종 대화방의 최신 메시지 상태
        setSejongLatestMessage, // 세종 대화방의 최신 메시지 업데이트 함수
        taejongLatestMessage, // 다른 대화방의 최신 메시지 상태
        setTaejongLatestMessage, // 다른 대화방의 최신 메시지 업데이트 함수
        yeongjoLatestMessage, // 다른 대화방의 최신 메시지 상태
        setYeongjoLatestMessage, // 다른 대화방의 최신 메시지 업데이트 함수
        clearChatHistory,
        clearChatHistory1,
        clearChatHistory2, // 초기화 함수 추가
      }}
    >
      {children}
    </LastMessageContext.Provider>
  );
}

export function useLastMessageContext() {
  return useContext(LastMessageContext);
}
