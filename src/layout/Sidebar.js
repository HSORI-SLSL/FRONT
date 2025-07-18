import React, { useState, useEffect } from 'react';
import './sidebars.css';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { useLastMessageContext } from '../LastMessageContext';
import { Link } from 'react-router-dom';

function getFormattedTime12Hour() {
  const today = new Date();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const ampm = hours >= 12 ? '오후' : '오전';
  const formattedHours = String(hours % 12 || 12).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  return `${ampm} ${formattedHours}:${formattedMinutes}`;
}

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
}

function Sidebar() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const {sejongLatestMessage, taejongLatestMessage, yeongjoLatestMessage } = useLastMessageContext();
  // 각 대화방의 최신 메시지를 20글자로 제한한 변수
  const sejongLatestMessageLimited = truncateText(sejongLatestMessage, 17);
  const taejongLatestMessageLimited = truncateText(taejongLatestMessage, 17);
  const yeongjoLatestMessageLimited = truncateText(yeongjoLatestMessage, 17);
  const formattedTime12Hour = getFormattedTime12Hour();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedin(isLoggedIn);

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail('');
      }
    });
  }, []);

  const handleLogin = () => {
    setIsLoggedin(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    const auth = getAuth();
    setIsLoggedin(false);
    localStorage.setItem('isLoggedIn', 'false');
    signOut(auth)
      .then(() => {
        console.log('로그아웃 성공');
        setIsLoggedin(false);
        window.location.href = "http://localhost:3000/";
      })
      .catch((error) => {
        console.log('로그아웃 에러:', error);
      });
  };

  const clickMe = () => {
    window.location.href = "http://localhost:3000/login";
  };

  return (
    <div className="Sidebar custom-font">
      <div className="Sidebar">
        <div className="d-flex flex-column align-items-stretch flex-shrink-0" style={{ width: '250px', backgroundColor: '#F3F2EB' }}>
          <div>
            <a href="/" className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
              </svg>
            </a>
          </div>
          
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="80" height="30" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16" style={{ marginTop: '10px', marginLeft: '85px' }}>
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          </svg> */}
          <img src="/img/sayongja2.png" className="sayongja"></img>
          
          <div className='user'> {userEmail ? `${userEmail}` : '실록샐록'} </div>

          <span className="fs-5 fw-semibold" style={{ marginTop: '70px' }}>
            대화 목록
          </span>
          
          <div className="list-group list-group-flush border-bottom">
          <Link to="/chatroom" className="list-group-item list-group-item-action py-3 lh-tight">
   <div className="d-flex w-100 align-items-center justify-content-between">
                <strong className="mb-1" margin="30px">
                  <img src="/img/sejong.png" alt="Bot Avatar" className="avatar" width="40px" style={{ marginRight: '10px' }} />
                  세종대왕
                </strong>
                <small style={{ fontSize: '12px' }}>{formattedTime12Hour}</small>
              </div>
              <div className="col-13 mx-1 small">{sejongLatestMessageLimited}</div>
          
</Link>

<Link to="/taejong" className="list-group-item list-group-item-action py-3 lh-tight">
              <div className="d-flex w-100 align-items-center justify-content-between">
                <strong className="mb-1" margin="30px">
                  <img src="/img/taejong.png" alt="Bot Avatar" className="avatar" width="40px" style={{ marginRight: '10px' }} />
                  태종
                </strong>
                <small style={{ fontSize: '12px' }}>{formattedTime12Hour}</small>
              </div>
              <div className="col-13 mx-1 small">{taejongLatestMessageLimited}</div>
          </Link>

          <Link to="/yeongjo" className="list-group-item list-group-item-action py-3 lh-tight">
              <div className="d-flex w-100 align-items-center justify-content-between">
                <strong className="mb-1" margin="30px">
                  <img src="/img/yeongjo.png" alt="Bot Avatar" className="avatar" width="40px" style={{ marginRight: '10px' }} />
                  영조
                </strong>
                <small style={{ fontSize: '12px' }}>{formattedTime12Hour}</small>
              </div>
              <div className="col-13 mx-1 small">{yeongjoLatestMessageLimited}</div>
           </Link>
          </div>

          {isLoggedin ? (
            <button onClick={handleLogout} type="button" className="btn btn-light" style={{ marginTop: '100px' }}>
              로그아웃
            </button>
          ) : (
            <button onClick={() => { clickMe(); handleLogin(); }} type="button" className="btn btn-light" style={{ marginTop: '100px' }}>
              로그인
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;