import React, { useState, useRef, useEffect } from 'react';
import './chatroom.css';
import axios from 'axios';
import { useLastMessageContext } from './LastMessageContext';

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

  // 메시지 보내고 답 받아오기
  const sendMessage = async (message) => {
    try {
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: '...', sender: 'bot', isTyping: true },
      ]);

      const response = await axios.post('https://52e3-1-231-206-74.ngrok-free.app/query/NORMAL', {
        query: message,
      });
      const data = response.data;
      const answer = data.Answer;

      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        { content: answer, sender: 'bot' },
      ]);

      return answer;
    } catch (error) {
      console.error(error);
      // 오류가 났을때
      return '오류';
    }
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      const userMessage = query.trim();
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: userMessage, sender: 'user' },
      ]);

      setQuery('');

      const botResponse = await sendMessage(userMessage);

      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        { content: botResponse, sender: 'bot' },
      ]);
    }
  };

  // 엔터키로 보내기
  const enterKeyEventHandler = (e) => {
    if (e.key === 'Enter') {
      handleMessageSubmit(e);
    }
  };

  const chatRef = useRef(null);
  const initialGreetingDisplayed = useRef(false);

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessageContent(messages[messages.length - 1].content);
    }

    // 첫인사
    if (!initialGreetingDisplayed.current) {
      const initialGreeting = '안녕하신가!';
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: initialGreeting, sender: 'bot' },
      ]);
      initialGreetingDisplayed.current = true;
    }
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  };

  // 퀴즈
  const handleQuizButtonClick = async () => {
    const quizMessage = '퀴즈를 시작합니다.';
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: quizMessage, sender: 'user' },
    ]);

    try {
      const response = await axios.post('https://52e3-1-231-206-74.ngrok-free.app/query/QUIZ', {
        BotType: 'QUIZ',
      });
      const data = response.data;

      const question = data.Answer;
      const answer = data.label;

      setQuizAnswer(answer);
      setQuizMode(true);

      setMessages((prevMessages) => [
        ...prevMessages,
        { content: question, sender: 'bot' },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  // 퀴즈 종료 버튼 누르면 실행되는 것
  const handleQuizEndButtonClick = () => {
    const quizEndMessage = '퀴즈를 종료합니다.';
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: quizEndMessage, sender: 'user' },
    ]);

    setQuizMode(false);
    setSelectedAnswer(null); // 퀴즈 종료 시 사용자의 정답 초기화
  };

  // o/x 버튼 누를 시
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

  // o 버튼 클릭
  const handleCorrectButtonClick = () => {
    handleAnswerButtonClick(true);
  };

  // x 버튼 클릭
  const handleIncorrectButtonClick = () => {
    handleAnswerButtonClick(false);
  };

  return (
    <div className="chat-room container">
      <div className="chatheader chat-header-card">
        <div className="card-body d-flex justify-content-center align-items-center">
          세종대왕
        </div>
      </div>

      <div className="chat-messages-container">
        <div className="chat-messages" ref={chatRef}>
          {messages.map((msg, index) => (
            <div className="message" key={index}>
              {msg.sender === 'user' ? (
                <div className="text user">{msg.content}</div>
              ) : (
                <div className="text bot">
                  <div className="avatar-container">
                    <img src="/img/sejong.png" alt="Bot Avatar" className="avatar" width="40px" />
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
            <>
              <div className="quiz bot">
                <div className="quiz bot2">
                  <button type="button" className="btn btn-o" onClick={handleCorrectButtonClick}>
                    O
                  </button>
                  <button type="button" className="btn btn-x" onClick={handleIncorrectButtonClick}>
                    X
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 퀴즈 종료 버튼 - 퀴즈 모드일 때만 표시 */}
      {quizMode && (
        <button type="button" className="btn btn-chat" onClick={handleQuizEndButtonClick}>
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
        </div>
      </div>
    </div>
  );
}

export default Chatroom;
