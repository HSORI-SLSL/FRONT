import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './home.css';

function Home() {
  return (
    <div className = "home">
      {/* 인물정보  */}
      <div className="person-info">
      <h5>인물정보</h5>
        <div className="person-info2">
          <div className="person-info-item">
            <div className="person-info-image">
              <img className="person-image" alt="Sejong" src="img/sejong.png" />
            </div>
            <div className="person-info-text">
              <h6>세종대왕</h6>
              <p>1397.05.15 ~ 1450.03.30</p>
              <p>제 4대</p>
            </div>
          </div>
          <div className="person-info-item">
            <div className="person-info-image">
              <img className="person-image" alt="Sejong" src="img/taejong.png" />
            </div>
            <div className="person-info-text">
              <h6>태종</h6>
              <p>1367.06.13 ~ 1422.05.30</p>
              <p>제 3대</p>
            </div>
          </div>
          <div className="person-info-item">
            <div className="person-info-image">
              <img className="person-image" alt="Sejong" src="img/yeongjo.png" />
            </div>
            <div className="person-info-text">
              <h6>영조</h6>
              <p>1694.10.31 ~ 1776.04.22</p>
              <p>제 21대</p>
            </div>
          </div>
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
        <Link to="/contents" className="link-black">
        <div className="recommended-content">
          <div className="content-header">
          <h5>추천콘텐츠</h5>
          </div>
          <img src="/img/abc.png" alt="Bot Avatar" className="avatar" width="250px" height="300px" />
        </div>
        </Link>
        
      </div>
    </div>
  );
}

export default Home;
