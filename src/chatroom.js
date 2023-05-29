import React from 'react';
import './chatroom.css';


function chatroom() {
  return (
    <div className="chat-room">
      {/* 대화 상대 */}
      <div className="chat-header-card" style={{ position: 'fixed', top: '20px', left: 270, width: 'calc(96% - 250px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div class="card-body d-flex justify-content-center align-items-center">
          세종대왕
        </div>
      </div>

      {/* 주고받는 메시지 */}
      <div className="chat-messages" style={{marginTop:200}}>
        <div className="message">
          <span className="sender">세종대왕:</span>
          <span className="text">안녕하세요.</span>
        </div>
        <div className="message">
          <span className="sender">User2:</span>
          <span className="text">네, 안녕하세요.</span>
        </div>
      </div>

      {/* 메시지 입력 */}
      <div className="chat-input" style={{ position: 'fixed', bottom: 0, left: 270, marginBottom:10, width: 'calc(96% - 250px)'}}>
        <div class="input-group input-group-lg">
          {/* 퀴즈 버튼 */}
          <button type="button" class="btn btn-chat">  Q </button>
          {/* 메시지 입력 부분 */}
          <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"
          placeholder="메시지를 입력하세요" >
          </input>
          {/* 전송 버튼 */}
          <button type="button" class="btn btn-chat">전송</button>
        </div>
      </div>
    </div>
  );
}

export default chatroom;
