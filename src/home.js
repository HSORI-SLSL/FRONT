import React from 'react';
import './home.css';

function Home() {
  return (
    <div>
      {/* 인물정보  */}
      <div className="person-info">
        <h4>인물정보</h4>
      </div>

      <div className="home-container">
        {/* 공부방  */}
        <div className="study-room">
          <h4>공부방</h4> 
          <div className="sejong-room">

          </div>
          <div className="taejo-room">
            
          </div>
          <div className="yeongjo-room">
            
          </div>
        </div>

        {/* 추천 콘텐츠  */}
        <div className="recommended-content">
          <h4>추천콘텐츠</h4>
        </div>
      </div>
    </div>
  );
}

export default Home;
