import React from 'react';
import { Link } from 'react-router-dom';

function Main() {
  return (
    <div>
      메인입니다
      <div></div>
      <Link to={'/mypage'}>마이페이지로 가기</Link>
    </div>
  );
}

export default Main;
