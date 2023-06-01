import React, {useState} from 'react';
import './chatroom.css';


function Chatroom() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);


  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleMessageSubmit = () => {
    // 서버에 메시지 전송 로직 추가
    console.log('메시지 전송:', message);

    setMessages([...messages, message]);

    // 메시지 입력 필드 초기화
    setMessage('');
  };

  const enterKeyEventHandler = (e) => {
    if(e.key === 'Enter'){
      handleMessageSubmit();
    }
  }

  return (

    <div className="chat-room" class="container">


     
      {/* 대화 상대 */}
      <div class="chatheader" className="chat-header-card" style={{ position: 'fixed', top: '20px', left: 270, width: 'calc(96% - 250px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div class="card-body d-flex justify-content-center align-items-center">
          세종대왕
        </div>
      </div>



      {/* 주고받는 메시지 */}
      <div id='chatbox' className="chat-messages" style={{ height: '500px', marginTop: '80px', padding: '10px', overflowY: 'scroll', overflowX : 'hidden', maxHeight: '100vh'}}>
        {messages.map((msg, index) => (
          <div className="message" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}} key={index}>
            <div className="text"  style={{ wordWrap: 'break-word', maxWidth: '50%', padding: '10px', borderRadius: '5px', backgroundColor: '#f2f2f2', display: 'inline-block', whiteSpace: 'pre-wrap', overflowWrap: 'break-word', wordWrap: 'break-word'}}>{msg}</div>
          </div>
        ))}
      </div>

   

    

      {/* 메시지 입력 */}
      <div class="chatfooter" className="chat-input" style={{ position: 'fixed', bottom: 0, left: 270, marginBottom:10, width: 'calc(96% - 250px)'}}>
        <div class="input-group input-group-lg">
          {/* 퀴즈 버튼 */}
          <button type="button" class="btn btn-chat">  Q </button>
          {/* 메시지 입력 부분 */}
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
