import React from 'react';
import { Link } from 'react-router-dom';

function Land() {
  return (
    <div>
      <h1>랜딩페이지</h1>
      <Link to="/login">
        <button>로그인</button>
      </Link>
      <Link to="/signup">
        <button>회원가입</button>
      </Link>
      <Link to="/">
        <button>홈화면으로 이동</button>
      </Link>
    </div>
  );
}

export default Land;
