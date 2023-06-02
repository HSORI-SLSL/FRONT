import React, {useState} from 'react';
import { useRef, useEffect } from 'react';
import './chatroom.css';

function Chatroom() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleMessageSubmit = () => {
    if (message.trim() !== '') {
      // 서버에 메시지 전송 로직 추가
      console.log('메시지 전송:', message);
  
      setMessages([...messages, message]);
  
      // 메시지 입력 필드 초기화
      setMessage('');
    }
  };

  const enterKeyEventHandler = (e) => {
    if(e.key === 'Enter'){
      handleMessageSubmit();
    }
  }

  const chatRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  };




  return (
    <div className="chat-room" class="container">
      {/* 대화 상대 나타내는 부분*/}
      <div class="chatheader" className="chat-header-card">
        <div class="card-body d-flex justify-content-center align-items-center">
          세종대왕
        </div>
      </div>

      {/* 메시지 주고받는 부분*/}
      <div className="chat-messages" ref={chatRef}>
      {messages.map((msg, index) => (
        <div className="message" key={index}>
          <div className="text" style={{ padding: '10px' }}>{msg}</div>
        </div>
      ))}
    </div>



      {/* 메시지 입력 부분*/}
      <div class="chatfooter" className="chat-input">
        <div class="input-group input-group-lg">
          {/* 퀴즈 버튼 */}
          <button type="button" class="btn btn-chat">  Q </button>
          {/* 메시지 입력 */}
          <input 
          type="text" 
          class="form-control" 
          aria-label="Sizing example input" 
          aria-describedby="inputGroup-sizing-lg"
          placeholder="메시지를 입력하세요" 
          value={message}
          onChange={handleMessageChange}
          onKeyPress={enterKeyEventHandler}>
          </input>
          {/* 전송 버튼 */}
          <button 
          type="button" 
          class="btn btn-chat" 
          onClick={handleMessageSubmit}>
            전송
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatroom;
