import React, { useState, useRef, useEffect } from 'react';
import './chatroom.css';
import axios from 'axios';
import { useLastMessageContext } from './LastMessageContext';

function saveChatHistory(messages) {
  localStorage.setItem('chatHistory', JSON.stringify(messages));
}

function Chatroom() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [quizMode, setQuizMode] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const { setLastMessageContent } = useLastMessageContext();

  const handleMessageChange = (event) => {
    setQuery(event.target.value);
  };

  const sendMessage = async (message) => {
    try {
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: '...', sender: 'bot', isTyping: true },
      ]);

      const response = await axios.post('https://70a5-1-231-206-74.ngrok-free.app/query/NORMAL/Taejong', {
        query: message,
      });
      const data = response.data;
      const answer = data.Answer;

      // '...' 메시지를 답으로 대체하도록 수정
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        { content: answer, sender: 'bot' },
      ]);

      return answer;
    } catch (error) {
      console.error(error);
      return '오류';
    }
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      const userMessage = query.trim();
      const userMessageObject = { content: userMessage, sender: 'user' };

      setMessages((prevMessages) => [
        ...prevMessages,
        userMessageObject,
      ]);

      // 사용자 메시지와 봇 메시지를 모두 저장
      const savedChatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
      const updatedChatHistory = [...savedChatHistory, userMessageObject];
      localStorage.setItem('chatHistory', JSON.stringify(updatedChatHistory));

      setQuery('');

      await sendMessage(userMessage);
    }
  };

  const handleClearChatHistory = () => {
    // 초기화 버튼 클릭 시 '안녕하신가!' 메시지를 chatHistory에 추가
    const initialGreeting = '안녕하신가!';
    const initialGreetingMessage = { content: initialGreeting, sender: 'bot' };

    localStorage.setItem('chatHistory', JSON.stringify([initialGreetingMessage]));
    setMessages([initialGreetingMessage]);
  };
  const enterKeyEventHandler = (e) => {
    if (e.key === 'Enter') {
      handleMessageSubmit(e);
    }
  };

  const chatRef = useRef(null);
  const [initialGreetingDisplayed, setInitialGreetingDisplayed] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 로컬 스토리지에서 대화 기록을 불러옴
    const savedChatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];

    if (savedChatHistory.length > 0) {
      setMessages(savedChatHistory);
    } else {
      // 초기 대화 추가 (대화 기록이 없을 때)
      const initialGreeting = '안녕하신가!';
      setMessages([
        ...savedChatHistory,
        { content: initialGreeting, sender: 'bot' },
      ]);
      localStorage.setItem(
        'chatHistory',
        JSON.stringify([{ content: initialGreeting, sender: 'bot' }])
      );
      setInitialGreetingDisplayed(true);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessageContent(messages[messages.length - 1].content);
    }

    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  };

  const handleQuizButtonClick = async () => {
    const quizMessage = '퀴즈를 시작합니다.';
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: quizMessage, sender: 'user' },
    ]);

    try {
      const response = await axios.post('https://70a5-1-231-206-74.ngrok-free.app/query/QUIZ/Taejong', {
        BotType: 'QUIZ',
      });
      const data = response.data;

      const question = data.Answer;
      const answer = data.label;

      setQuizAnswer(answer);
      setQuizMode(true);

      if (question === '대화를 통해 학습을 진행해 보세요.') {
        setMessages((prevMessages) => [
          ...prevMessages,
          { content: question, sender: 'bot' },
        ]);
        setQuizMode(false);
      } else {
        setQuizMode(true);
        setMessages((prevMessages) => [
          ...prevMessages,
          { content: question, sender: 'bot' },
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuizEndButtonClick = () => {
    const quizEndMessage = '퀴즈를 종료합니다.';
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: quizEndMessage, sender: 'user' },
    ]);

    setQuizMode(false);
    setSelectedAnswer(null);
  };

  const handleAnswerButtonClick = (isCorrect) => {
    if (isCorrect) {
      const correctMessage = '정답이다!';
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: `O`, sender: 'user' },
        { content: correctMessage, sender: 'bot' },
      ]);
    } else {
      const incorrectMessage = '오답이다!';
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: `X`, sender: 'user' },
        { content: incorrectMessage, sender: 'bot' },
      ]);
    }

    setQuizMode(false);
  };

  const handleCorrectButtonClick = () => {
    handleAnswerButtonClick(true);
  };

  const handleIncorrectButtonClick = () => {
    handleAnswerButtonClick(false);
  };

  return (
    <div className="Chatroom custom-font">
    <div className="chat-room container">
      <div className="chatheader chat-header-card">
        <div className="card-body d-flex justify-content-center align-items-center">
          태종
        </div>
      </div>

      <div className="chat-messages-container">
        <div className="chat-messages" ref={chatRef}>
          {messages.map((msg, index) => (
            <div className="message" key={index}>
              {msg.sender === 'user' ? (
                <div className="text user">{msg.content}</div>
              ) : (
                <div className={`text bot ${quizMode && index === messages.length - 1 ? 'quiz' : ''}`}>
                  <div className="avatar-container">
                    <img src="/img/taejong.png" alt="Bot Avatar" className="avatar" width="40px" />
                  </div>
                  <div className="text bot2">
                    {msg.content}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* o/x 버튼 */}
          {quizMode && (
            <div className="quiz">
              <div className="quiz-bot">
                <div className="quiz-user">
                  <button type="button" className="btn btn-light" className="btn btn-o" style={{ fontSize: '38px', backgroundColor: 'grey', width: '80px'}} onClick={handleCorrectButtonClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M224 96a160 160 0 1 0 0 320 160 160 0 1 0 0-320zM448 256A224 224 0 1 1 0 256a224 224 0 1 1 448 0z"/></svg>
                  </button>
                  <button type="button" className="btn btn-light" className="btn btn-x" style={{ fontSize: '38px', backgroundColor: 'grey', marginLeft: '2px', width: '80px'}} onClick={handleIncorrectButtonClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 퀴즈 종료 버튼 - 퀴즈 모드일 때만 표시 */}
      {quizMode && (
        <button type="button" className="btn btn-chat btn-quiz-end" onClick={handleQuizEndButtonClick}>
          퀴즈 종료
        </button>
      )}

      <div className="chatfooter chat-input">
        <div className="input-group input-group-lg">
          {!quizMode && (
            <button type="button" className="btn btn-chat" onClick={handleQuizButtonClick}>
              Q
            </button>
          )}
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-lg"
            placeholder="메시지를 입력하세요"
            value={query}
            onChange={handleMessageChange}
            onKeyPress={enterKeyEventHandler}
          />
          <button
            type="button"
            className="btn btn-chat"
            onClick={handleMessageSubmit}
          >
            전송
          </button>
          <button
            type="button"
            className="btn btn-chat"
            onClick={handleClearChatHistory}
          >
            초기화
          </button>
        </div>
      </div>
    </div>
    </div>
  );
  
}


export default Chatroom;
