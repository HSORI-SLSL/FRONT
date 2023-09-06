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


        {/* 추천 콘텐츠 */}
        <div className="recommended-content">
          <div className="content-header">
            <h5>추천콘텐츠</h5>
            {/* 추천 창작물? */}
          </div>
          <div className="content">
            <div className="move-to-contents">
              <h3>세종대왕에 대해 더 알고싶으시다구요?</h3>
              <h5>세종대왕과 관련된 영화, 드라마, 도서, 유튜브를 통해 더 많은 지식을 얻어 가세요!</h5>
              <Link to="/contents" className="link-black">
                <button className="btn btn-primary">추천콘텐츠로 이동</button>
              </Link>
            </div>
            <div className="image">
            <img src="/img/ezgif.com-gif-maker.gif" alt="Bot Avatar" className="avatar" width="300px" height="400px" />
            </div>
          </div>
        </div>
      </div>
  );
}

export default Home;