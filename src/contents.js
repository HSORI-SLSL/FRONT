import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './contents.css';

const ContentList = () => {
  const [watchaContents, setWatchaContents] = useState([]);
  const [youtubeContents, setYoutubeContents] = useState([]);
  const [selectedKing, setSelectedKing] = useState(''); // Initialize with empty string

  useEffect(() => {
    const fetchData = async () => {
      if (selectedKing) {
        try {
          const responseWatcha = await axios.post(
            'https://0218-1-231-206-74.ngrok-free.app/query/CRAWL',
            {
              query: selectedKing,
            },
            {
              withCredentials: false,
            }
          );

          const responseYoutube = await axios.post(
            'https://0218-1-231-206-74.ngrok-free.app/query/CRAWLY',
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
    };

    fetchData();
  }, [selectedKing]);

  return (
    <div className='content-list'>
      <div className='king-buttons'>
        <button onClick={() => setSelectedKing('세종대왕')}>세종대왕</button>
        <button onClick={() => setSelectedKing('태종')}>태종</button>
        <button onClick={() => setSelectedKing('영조')}>영조</button>
      </div>
      <div className='selected-king'>
        {selectedKing ? (
          <h2>{selectedKing}의 콘텐츠</h2>
        ) : (
          <h2>왕을 선택하세요</h2>
        )}
      </div>
      <div className='watcha'>
        <h3>왓챠 콘텐츠</h3>
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
        <h3>유튜브 콘텐츠</h3>
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
  );
};

export default ContentList;
