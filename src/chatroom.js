import React, { useState, useRef, useEffect } from 'react';
import './chatroom.css';
import axios from 'axios'

function Chatroom() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);

  const handleMessageChange = (event) => {
    setQuery(event.target.value);
  };

  const sendMessage = async (message) => {
    try {
      // 답변 받기전 기다리는 말풍선
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: '...', sender: 'bot', isTyping: true  },
      ]);

      const response = await axios.post('https://9022-1-231-206-74.ngrok-free.app/query/NORMAL', {
        query: message,
      });
      const data = response.data;
      const answer = data.Answer;

      // 답변받으면 ...말풍선 사라지게 하기
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

  // 첫인사
  useEffect(() => {
    if (!initialGreetingDisplayed.current) {
      const initialGreeting = '안녕하세요!'; // Initial greeting message
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: initialGreeting, sender: 'bot' },
      ]);
      initialGreetingDisplayed.current = true;
    }
    scrollToBottom();
  }, []);


  // 자동으로 밑으로 내리는 스크롤바 
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  };

  return (
    <div className="chat-room container">
      <div className="chatheader chat-header-card">
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
                {/* <img src={botAvatar} alt="Bot Avatar" className="avatar" /> */}
                {msg.content}
                </div>
            )}
          </div>
        ))}
      </div>

      <div className="chatfooter chat-input">
        <div className="input-group input-group-lg">
          <button type="button" className="btn btn-chat">Q</button>
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
