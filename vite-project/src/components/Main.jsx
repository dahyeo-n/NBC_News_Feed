import { Link } from 'react-router-dom';
import { app } from './firebase';
console.log(app);

function Main() {
  return (
    <div>
      메인입니다
      <Link to={'/mypage'}>마이페이지로 가기</Link>
      <Link to={'/writepage'}>게시글 작성하기</Link>
    </div>
  );
}

export default Main;
