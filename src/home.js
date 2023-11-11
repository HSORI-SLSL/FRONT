import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './home.css';

function Home() {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = ['content/bangone.png', 'content/chunmoon.png', 'content/sado.png', 'content/isan.png', 'content/narat.png', 'content/sejongbook2.png'];
  const imagesPerGroup = 3;
  const maxIndex = images.length - 1;
  const intervalRef = useRef(null);
  

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      handleNextImage();
    }, 3000); // 3초간격
  };

  const stopAutoSlide = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoSlide();

    return () => {
      stopAutoSlide();
    };
  }, [currentImageIndex]);


  return (
    <div className="Home custom-font">
    <div className = "home">
      {/* 인물정보  */}
      <div className="person-info">
        <div className="info">
          <h5>인물정보&nbsp;</h5>
          <p>각 왕을 클릭하여 조선왕조실록을 열람해보세요</p>
        </div>
        <div className="person-info2">
          <div className="person-info-item">
            <div className="person-info-image">
              <a href="https://sillok.history.go.kr/search/inspectionMonthList.do?id=kda">
                <img className="person-image" alt="Sejong" src="img/sejong.png" />
              </a>
            </div>
            <div className="person-info-text">
              <h6>세종대왕</h6>
              <p>1397.05.15 ~ 1450.03.30</p>
              <p>제 4대</p>
            </div>
          </div>
          <div className="person-info-item">
            <div className="person-info-image">
              <a href="https://sillok.history.go.kr/search/inspectionMonthList.do?id=kca">
                <img className="person-image" alt="Sejong" src="img/taejong.png" />
              </a>
            </div>
            <div className="person-info-text">
              <h6>태종</h6>
              <p>1367.06.13 ~ 1422.05.30</p>
              <p>제 3대</p>
            </div>
          </div>
          <div className="person-info-item">
            <div className="person-info-image">
              <a href="https://sillok.history.go.kr/search/inspectionMonthList.do?id=kua">
                <img className="person-image" alt="Sejong" src="img/yeongjo.png" />
              </a>
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
          {/* <div className="content-header">
            <h5>추천콘텐츠</h5>
          </div> */}
          <div className="content">
            <div className="move-to-contents">
              <h2>더 많은 정보나 관련 콘텐츠를 찾고 계신가요?</h2>
              <th></th>
              <th></th>
              <h7> 세종대왕, 영조, 태종의 역사와 문화를 탐험해보세요!</h7>
              <h7> 왕에 관한 흥미로운 이야기와 관련된 콘텐츠를 발견하고 역사의 흐름을 새롭게 경험해보세요</h7>
              <div class="image-container">
              <div>
                <button className="btn btn-primary1" onClick={handlePrevImage}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 320 512">
                    <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                  </svg>
                </button>
                {Array.from({ length: imagesPerGroup }).map((_, index) => (
                  <img
                    key={index}
                    className="content-image"
                    alt={`Sejong ${currentImageIndex + index}`}
                    src={images[(currentImageIndex + index) % images.length]}
                  />
                ))}
                <button className="btn btn-primary1" onClick={handleNextImage}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 320 512">
                    <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                  </svg>
                </button>
              </div>
          </div>
          <Link to="/contents" className="link-black">
                <button className="btn btn-primary" style={{ marginLeft: '720px', marginTop: '25px'}}>추천콘텐츠로 이동</button>
              </Link>
            </div>     
          </div> 
        </div>
      </div>
      </div>
  );
}

export default Home;