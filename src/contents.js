import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './contents.css';

const ContentList = () => {
  const [watchaContents, setWatchaContents] = useState([]);
  const [youtubeContents, setYoutubeContents] = useState([]);
  const [selectedKing, setSelectedKing] = useState(''); // Initialize with empty string
  const [isLoading, setIsLoading] = useState(false); // Initialize with false

  const kings = ['세종대왕', '태종', '영조'];


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading to true before fetching data

      if (selectedKing) {
        try {
          const responseWatcha = await axios.post(
            'https://6f7c-1-231-206-74.ngrok-free.app/query/CRAWL',
            {
              query: selectedKing,
            },
            {
              withCredentials: false,
            }
          );

          const responseYoutube = await axios.post(
            'https://6f7c-1-231-206-74.ngrok-free.app/query/CRAWLY',
            {
              query: selectedKing,
            },
            {
              withCredentials: false,
            }
          );

          setWatchaContents(responseWatcha.data.contents);
          setYoutubeContents(responseYoutube.data.contents);
        } catch (error) {
          console.error('Error fetching contents from backend:', error);
        }
      } else {
        // Clear contents if no king is selected
        setWatchaContents([]);
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
            onClick={() => setSelectedKing(king)}
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
          <h2>왕을 선택하세요</h2>
        )}
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
              <div className='watcha'>
                <h4>왓챠 콘텐츠</h4>
                <ul className='horizontal-list'>
                  {watchaContents.map((content, index) => (
                    <li key={index} className='horizontal-list-item'>
                      <a href={content.href} target='_blank' rel='noopener noreferrer'>
                        <img
                          src={content.img_urls}
                          alt={content.title}
                          width='150px'
                          style={{ marginRight: '10px' }}
                        />
                      </a>
                      <div style={{ display: 'inline-block' }}>
                        <h3>{content.title}</h3>
                        <small>{content.info}</small>
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
