import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { app } from '../firebase';
console.log(app);

const StFontColor = styled.div`
  color: white;
  font-weight: 200;
`;

function Main() {
  return (
    <StFontColor>
      메인입니다
      <Link to={'/mypage'}>마이페이지로 가기</Link>
      <Link to={'/writepage'}>게시글 작성하기</Link>
    </StFontColor>
  );
}

export default Main;
