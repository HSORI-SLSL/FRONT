import React, { useState } from 'react';

function Contents() {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [relatedContents, setRelatedContents] = useState(null);

  const handlePersonSelect = (person) => {
    setSelectedPerson(person);

    // 백엔드 API 호출
    fetch(`https://1495-1-231-206-74.ngrok-free.app/query/crawl_watcha?person=${person}`)
      .then((response) => response.json())
      .then((data) => setRelatedContents(data))
      .catch((error) => console.error('Error fetching related contents:', error));
  };

  return (
    
    <div>
      <h1>인물 선택</h1>
      <button onClick={() => handlePersonSelect('인물1')}>세종대왕</button>
      <button onClick={() => handlePersonSelect('인물2')}>태종</button>
      <button onClick={() => handlePersonSelect('인물3')}>영조</button>

      {selectedPerson && relatedContents && (
        <div>
          <h1>{selectedPerson}에 대한 연관콘텐츠</h1>
          <h2>영화</h2>
          <ul>
            {relatedContents.movies.map((movie, index) => (
              <li key={index}>{movie.title}</li>
            ))}
          </ul>

          <h2>도서</h2>
          <ul>
            {relatedContents.books.map((book, index) => (
              <li key={index}>{book.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Contents;
