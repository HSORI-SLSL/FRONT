import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './contents.css';

const ContentList = () => {
  const [booksContents, setBooksContents] = useState([]);
  const [youtubeContents, setYoutubeContents] = useState([]);
  const [selectedKing, setSelectedKing] = useState(''); // Initialize with empty string
  const [isLoading, setIsLoading] = useState(false); // Initialize with false

  const kings = ['세종대왕', '태종', '영조'];

  // Toggle the selected king when the button is clicked
  const toggleSelectedKing = (king) => {
    if (selectedKing === king) {
      setSelectedKing(''); // If the same king is clicked again, clear the selection
    } else {
      setSelectedKing(king); // Otherwise, set the selected king
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading to true before fetching data

      if (selectedKing) {
        try {
          const responseBooks = await axios.post(
            'https://4c0b-1-231-206-74.ngrok-free.app/query/CRAWL',
            {
              query: selectedKing,
            },
            {
              withCredentials: false,
            }
          );

          const responseYoutube = await axios.post(
            'https://4c0b-1-231-206-74.ngrok-free.app/query/CRAWLY',
            {
              query: selectedKing,
            },
            {
              withCredentials: false,
            }
          );

          setBooksContents(responseBooks.data.contents);
          setYoutubeContents(responseYoutube.data.contents);
        } catch (error) {
          console.error('Error fetching contents from backend:', error);
        }
      } else {
        // Clear contents if no king is selected
        setBooksContents([]);
        setYoutubeContents([]);
      }

      setIsLoading(false); // Set loading to false after fetching data
    };

    fetchData();
  }, [selectedKing]);

  return (
    <div className='content-list'>
      <div className='king-buttons'>
        {kings.map((king) => (
          <button
            key={king}
            onClick={() => toggleSelectedKing(king)}
            style={{
              backgroundColor: selectedKing === king ? '#442F11' : '#E7E2D7' ,
              color: selectedKing === king ?  'white' :'black',
              border: selectedKing === king ? '1px solid #442F11' : '1px solid #E7E2D7',
            }}
          >
            {king}
          </button>
        ))}
      </div>
      <div className='selected-king'>
        {selectedKing ? (
          <h2>{selectedKing}의 콘텐츠</h2>
        ) : (
          <h5>왕을 선택하세요</h5>
        )}
      </div>

  {/* 크롤링 결과 나오기 전 영화 리스트  */}
  <div className='image' style={{ display: selectedKing ? 'none' :'flex', flexDirection:'row'}}>
    <div className="im1">
    <a href="https://pedia.watcha.com/ko-KR/contents/mO0g2Yx">
      <img src="\content\sado.png" alt="Bot Avatar" className="avatar"  width="150px" height="200px" />
    </a>
      <small className="small-text">
        사도  <br />
        2015 • 한국<br />
        영화
      </small>
    </div>

    <div className="im2">
    <a href="https://pedia.watcha.com/ko-KR/contents/mOo0wJk">
      <img src="\content\narat.png" alt="Bot Avatar" className="avatar"  width="150px" height="200px"/>
    </a>
      <small className="small-text">
        나랏말싸미<br />
        2018 • 한국<br />
        영화
      </small>
    </div>

    <div className="im2">
      <a href="https://pedia.watcha.com/ko-KR/contents/tRX5Nem">
      <img src="\content\bangone.png" alt="Bot Avatar" className="avatar" width="150px" height="200px"/>
      </a>
      <small className="small-text">
        태조 이방원<br />
        2021 • KBS1<br />
        TV 프로그램
      </small>
    </div>

    <div className="im2">
    <a href="https://pedia.watcha.com/ko-KR/contents/mdjwRxl">
      <img src="\content\chunmoon.png" alt="Bot Avatar" className="avatar"  width="150px" height="200px" />
      </a>
      <small className="small-text">
        천문<br />
        2018 • 한국<br />
        영화
      </small>
    </div>

    <div className="im2">
    <a href="https://pedia.watcha.com/ko-KR/contents/tPVmwxR">
      <img src="\content\isan.png" alt="Bot Avatar" className="avatar"  width="150px" height="200px" />
      </a>
      <small className="small-text">
        이산<br />
        2017 • MBC<br />
        TV 프로그램
      </small>
    </div>
  </div>

  {/* 크롤링 결과 나오기 전 도서 리스트 */}
  <div className='image2' style={{ display: selectedKing ? 'none' :'flex', flexDirection:'row' }}>
    <div className="im11">
    <a href="https://product.kyobobook.co.kr/detail/S000000777369">
      <img src="\content\sejongbook1.png" alt="Bot Avatar" className="avatar"  width="150px" height="200px" />
      </a>
      <small className="small-text">
        세종대왕<br />
        2008 • 조정래<br />
        책
      </small>
    </div>

    <div className="im22">
    <a href="https://product.kyobobook.co.kr/detail/S000000403030">
      <img src="\content\sejongbook2.png" alt="Bot Avatar" className="avatar"  width="150px" height="200px"/>
      </a>
      <small className="small-text">
      한권으로 읽는 세종대왕실록<br />
        2008 • 박영규<br />
        책
      </small>
    </div>

    <div className="im22">
    <a href="https://product.kyobobook.co.kr/detail/S000001283711">
        <img src="\content\taejongbook1.png" alt="Bot Avatar" className="avatar" width="150px" height="200px"/>
      </a>
      <small className="small-text">
        태종 이방원<br />
        2016 • 방기환<br />
        책
      </small>
    </div>

    <div className="im22">
    <a href="https://product.kyobobook.co.kr/detail/S000001136610">
        <img src="\content\taejongbook2.png" alt="Bot Avatar" className="avatar"  width="150px" height="200px" />
      </a>
      <small className="small-text">
        태종 조선의 길을 열다<br />
        2005 • 이한우<br />
        책
      </small>
    </div>

    <div className="im22">
    <a href="https://product.kyobobook.co.kr/detail/S000000864797">
      <img src="\content\yeongjobook1.png" alt="Bot Avatar" className="avatar"  width="150px" height="200px" />
      </a>
      <small className="small-text"> 
  두 리더 : 영조 그리고 정조<br />
        2020 • 노혜경<br />
        책
      </small>
    </div>
  </div>

      {/* 크롤링 결과 나오기 전까지 나오는 문구 */}
      {isLoading ? ( 
        <div className='loading-message'>잠시만 기다려주세요...</div>
        // <h1>잠시만 기다려주세요...</h1>
      ) : (
        <div className="crawling-result">
          {/* 왕 선택하면 나오는 크롤링 결과 */}
          {selectedKing && ( 
            <div>
              <div className='books'>
                <h4>도서 콘텐츠</h4>
                <ul className='horizontal-list'>
                  {booksContents.map((content, index) => (
                    <li key={index} className='horizontal-list-item'>
                      <a href={content.href} target='_blank' rel='noopener noreferrer'>
                        <img
                          src={content.thumbnail}
                          alt={content.title}
                          width='150px'
                          style={{ marginRight: '10px' }}
                        />
                      </a>
                      <div style={{ display: 'inline-block' }}>
                        <h3>{content.title}</h3>
                        <small>작가: {Array.isArray(content.authors) ? content.authors.map((author, authorIndex) => (
                          <span key={authorIndex}>{author}{authorIndex < content.authors.length - 1 ? ', ' : ''}</span>
                        )) : content.authors}</small>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='youtube'>
                <h4>유튜브 콘텐츠</h4>
                <ul className='vertical-list'>
                  {youtubeContents.map((content, index) => (
                    <li key={index} className='vertical-list-item'>
                      <img
                          src={content.thumbnail}
                          alt={content.title}
                          width='150px'
                          style={{ marginRight: '10px' }}
                        />
                      <div style={{ display: 'inline-block' }}>
                      <a href={content.url} target='_blank' rel='noopener noreferrer'>
                        <h3>{content.title}</h3>
                      </a>
                        <p>{content.channelName}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContentList;
