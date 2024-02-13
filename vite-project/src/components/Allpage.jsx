import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { app } from '../firebase';
console.log(app);

const StFontColor = styled.div`
  color: black;
  font-weight: 200;
`;

function Main() {
  return (
    <StFontColor>
      메인입니다
      <Link to={'/auth'}>로그인</Link>
      <Link to={'/fileupload'}>이미지 업로드</Link>
      <Link to={'/mypage'}>마이페이지로 가기</Link>
      <Link to={'/writepage'}>새 게시글 작성</Link>
      <Link to={'/detailpage'}>상세 페이지</Link>
    </StFontColor>
  );
}

export default Main;
