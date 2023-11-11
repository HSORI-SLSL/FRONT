import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './home.css';

function Home() {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = ['content/bangone.png', 'content/chunmoon.png', 'content/sado.png', 'content/isan.png', 'content/narat.png', 'content/sejongbook2.png'];
  const imagesPerGroup = 3;
  const maxIndex = images.length - 1;

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
  };


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

      {/* <div className="image">
            <img src="/img/content.png" width="1000px" height="400px"/>
          </div> */}

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
              {/* <h5> 역사의 흐름을 새롭게 경험해보세요</h5> */}
              <div class="image-container">
              <div>
      <button onClick={handlePrevImage}>&lt; Prev</button>
      {images
        .slice(currentImageIndex, currentImageIndex + imagesPerGroup)
        .map((image, index) => (
          <img key={index} className="person-image" alt={`Sejong ${currentImageIndex + index}`} src={image} />
        ))}
      <button onClick={handleNextImage}>Next &gt;</button>
    </div>
</div>

              <Link to="/contents" className="link-black">
                <button className="btn btn-primary" style={{ marginLeft: '500px'}}>추천콘텐츠로 이동</button>
              </Link>
               </div>
           
            
            
          </div> 
        </div>
      </div>
      </div>
  );
}

export default Home;