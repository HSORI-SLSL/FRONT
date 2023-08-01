import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContentList = () => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    // 백엔드 API 호출을 위한 함수 정의
    const fetchContentsFromBackend = async () => {
      try {
        const response = await axios.post(
          'https://52e3-1-231-206-74.ngrok-free.app/query/CRAWL',
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

  return (
    <div>
      <h2>콘텐츠 목록</h2>
      <ul>
        {contents.map((content, index) => (
          <li key={index}>
            <a href={content.href} target="_blank" rel="noopener noreferrer">
              <img src={content.img_urls} alt={content.title} />
            </a>
            <h3>{content.title}</h3>
            <p>{content.info}</p>
            <p>카테고리: {content.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContentList;
