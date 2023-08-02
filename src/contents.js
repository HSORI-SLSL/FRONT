import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContentList = () => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    // 백엔드 API 호출을 위한 함수 정의
    const fetchContentsFromBackend = async () => {
      try {
        const response = await axios.post(
          'https://0218-1-231-206-74.ngrok-free.app/query/CRAWL',
          {
            query: '세종대왕',
          },
          {
            withCredentials: false,
          }
        );
        setContents(response.data.contents); // Use 'contents' array from the API response
      } catch (error) {
        console.error('Error fetching contents from backend:', error);
      }
    };

    fetchContentsFromBackend(); // 함수 호출로 API 데이터 가져오기
  }, []);


   // 카테고리별로 콘텐츠를 분류하는 함수
   const groupContentsByCategory = () => {
    const groupedContents = {
      '영화': [],
      'TV 프로그램': [],
      '책': []
    };

    contents.forEach((content) => {
      const { category } = content;
      if (groupedContents[category]) {
        groupedContents[category].push(content);
      }
    });

    return groupedContents;
  };

  const groupedContents = groupContentsByCategory();




  return (
    <div>
      <h2>콘텐츠 목록</h2>
      <ul style={{ display: 'flex' }}>
        {/* '영화' 카테고리 */}
        <li>
          <h3 style={{ marginTop: '50px', marginBottom: '25px'}}>영화</h3>
          <ul style={{ display: 'flex', listStyleType: 'none' }}>
            {groupedContents['영화'].map((content, index) => (
              <li key={index}>
                <a href={content.href} target="_blank" rel="noopener noreferrer">
                  <img src={content.img_urls} alt={content.title} width='150px' style={{ marginRight: '30px' }} />
                </a>
                <h5 style={{ marginTop: '10px'}}>{content.title}</h5>
                <small>{content.info}</small>
              </li>
            ))}
          </ul>
        </li>
        {/* 'TV 프로그램' 카테고리 */}
        <li>
          <h3 style={{ marginTop: '30px', marginBottom: '25px'}}>TV 프로그램</h3>
          <ul style={{ display: 'flex', listStyleType: 'none' }}>
            {groupedContents['TV 프로그램'].map((content, index) => (
              <li key={index}>
                <a href={content.href} target="_blank" rel="noopener noreferrer">
                  <img src={content.img_urls} alt={content.title} width='150px' style={{ marginRight: '30px' }} />
                </a>
                <h5 style={{ marginTop: '10px'}}>{content.title}</h5>
                <small>{content.info}</small>
              </li>
            ))}
          </ul>
        </li>
        {/* '책' 카테고리 */}
        <li>
          <h3 style={{ marginTop: '30px', marginBottom: '25px'}}>책</h3>
          <ul style={{ display: 'flex', listStyleType: 'none' }}>
            {groupedContents['책'].map((content, index) => (
              <li key={index}>
                <a href={content.href} target="_blank" rel="noopener noreferrer">
                  <img src={content.img_urls} alt={content.title} width='150px' style={{ marginRight: '30px' }} />
                </a>
                <h5 style={{ marginTop: '10px'}}>{content.title}</h5>
                <small>{content.info}</small>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default ContentList;
