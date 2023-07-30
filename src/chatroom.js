import React, { useState, useRef, useEffect } from 'react';
import './chatroom.css';
import axios from 'axios'
import { useLastMessageContext } from './LastMessageContext'; // Make sure the correct path is used here

function Chatroom() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [question, setQuizQuestion] = useState('');
  const [answer, setQuizAnswer] = useState('');
  const [quizMode, setQuizMode] = useState(false);

  const { lastMessageContent, setLastMessageContent } = useLastMessageContext();


  
  
  const handleMessageChange = (event) => {
    setQuery(event.target.value);
  };

  const sendMessage = async (message) => {
    try {
      // 답변 받기 전 기다리는 말풍선
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: '...', sender: 'bot', isTyping: true },
      ]);

      const response = await axios.post('https://1495-1-231-206-74.ngrok-free.app/query/NORMAL', {
        query: message,
      });
      const data = response.data;
      const answer = data.Answer;

      // 답변 받으면 ...말풍선 사라지게 하기
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1), // Remove the waiting message bubble
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

  // 엔터 키 누르면 보내짐
  const enterKeyEventHandler = (e) => {
    if (e.key === 'Enter') {
      handleMessageSubmit(e);
    }
  };

  const chatRef = useRef(null);
  const initialGreetingDisplayed = useRef(false);

  // 첫 인사
  useEffect(() => {

    if (messages.length > 0) {
      setLastMessageContent(messages[messages.length - 1].content);
    }


    if (!initialGreetingDisplayed.current) {
      const initialGreeting = '안녕하세요!'; // Initial greeting message
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: initialGreeting, sender: 'bot' },
      ]);
      initialGreetingDisplayed.current = true;
    }
    scrollToBottom();
    
  }, [messages]);

  // 자동으로 밑으로 내리는 스크롤바
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

    // 퀴즈 시작을 백엔드 서버에 요청
    try {
      const response = await axios.post('https://1495-1-231-206-74.ngrok-free.app/query/QUIZ', {
        BotType: 'QUIZ',
      });
      const data = response.data;

      // 서버에서 받은 퀴즈 질문과 답을 저장
      const question = data.Answer;
      const answer = data.label;

      // 퀴즈 질문과 답을 상태로 저장하고 퀴즈 모드를 활성화
      setQuizQuestion(question);
      setQuizAnswer(answer);
      setQuizMode(true);

      // 퀴즈 질문을 메시지로 추가
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: question, sender: 'bot' },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuizEndButtonClick = () => {
    const quizEndMessage = '퀴즈 종료';
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: quizEndMessage, sender: 'user' },
    ]);

    setQuizMode(false);
  };

  return (
    <div className="chat-room container">
      <div className="chatheader chat-header-card">
        {/* 각 왕의 이름 */}
        <div className="card-body d-flex justify-content-center align-items-center">
          세종대왕
        </div>
      </div>

      <div className="chat-messages" ref={chatRef}>
        {messages.map((msg, index) => (
          <div className="message" key={index}>
            {msg.sender === 'user' ? (
              <div className="text user">{msg.content}</div>
            ) : (
              <div className="text bot">
                {/* 왕 프로필 */}
                <div className="avatar-container">
                  <img src="/img/sejong.png" alt="Bot Avatar" className="avatar" width="40px" />
                </div>
                {/* 왕 말풍선 */}
                <div className="text bot2">
                  {msg.content}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>


      {/* 퀴즈 종료 버튼 */}
      {quizMode && (
        <button type="button" className="btn btn-chat" onClick={handleQuizEndButtonClick}>
          퀴즈 종료
        </button>
      )}

      <div className="chatfooter chat-input">
        <div className="input-group input-group-lg">
           {/* 퀴즈 시작 버튼 */}
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