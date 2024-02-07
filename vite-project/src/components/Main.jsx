import React from 'react';
import { Link } from 'react-router-dom';

function Main() {
  return (
    <div>
      <div>
        <Link to="/login">로그인</Link>
      </div>
      <div>
        <Link to="/join">회원가입</Link>
      </div>
    </div>
  );
}

export default Main;
