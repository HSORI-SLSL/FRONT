import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Home() {
  return (
    <div className = "home">
      {/* 인물정보  */}
      <div className="person-info">
        <h5>인물정보</h5>
        <div className="person-info2">
          <img className="sejongImage" alt="Sejong" src="img/sejong.png" />
          <img className="taejongImage" alt="Sejong" src="img/taejong.png" />
          <img className="yeongjoImage" alt="Sejong" src="img/yeongjo.png" />

        </div>
      </div>

      <div className="home-container">
        {/* 공부방  */}
        <div className="study-room">
          <h5>공부방</h5> 
          <div className="sejong-room">
            <h5> 세종대왕</h5>
          </div>
          <div className="taejo-room">
            <h5> 태종 </h5>
          </div>
          <div className="yeongjo-room">
            <h5> 영조 </h5>
          </div>
        </div>

        {/* 추천 콘텐츠 */}
        <div className="recommended-content">
          <div className="content-header">
            <h5>추천콘텐츠</h5>
            <Link to="/contents">
              {/* 아이콘 넣기 */}
              {/* <FontAwesomeIcon icon="fa-solid fa-chevron-right" /> */}
            </Link>
          </div>
          <img src="/img/abc.png" alt="Bot Avatar" className="avatar" width="250px" height="300px" />
        </div>
        
      </div>
    </div>
  );
}

export default Home;
