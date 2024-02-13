import { Link, useNavigate } from 'react-router-dom';
import * as S from '../style/User.style';
import { getAuth, signOut } from 'firebase/auth';
import { useSelector } from 'react-redux';

function User() {
  const navigate = useNavigate();
  const user = useSelector(function (item) {
    return item.user;
  });
  const isLogin = user.isLogin;

  const authInfo = getAuth();

  // 로그아웃
  const outBtn = () => {
    const logout = confirm('로그아웃 하시겠습니까?');
    if (logout) {
      signOut(authInfo);
    } else {
      return;
    }
  };
  const writeBtnHandler = () => {
    if (isLogin) {
      navigate('/writepage');
    } else {
      alert('로그인이 필요한 서비스 입니다.');
      navigate('/loginpage');
    }
  };

  return (
    <S.UserSection>
      {isLogin && (
        <S.Parents>
          {/* 로그인시 */}

          {/* {signUpUser && signUpUser.length > 0 && currentUser.nickName === null ? (
            <UserNickName>{signUpUser[0].nickName}님</UserNickName>
          ) : (
            <UserNickName>{currentUser.nickName}님</UserNickName>
          )} */}
          <div>
            <S.NickNameSpan>{user.nickName}</S.NickNameSpan>님 환영 합니다.
          </div>
          <S.UserBtnSection>
            <Link to={'/mypage'}>마이페이지</Link>
            <button onClick={outBtn}>로그아웃</button>
          </S.UserBtnSection>
        </S.Parents>
      )}
      {!isLogin && (
        //  회원이 아닐 때
        <S.NotJoin>
          <div>
            <Link to={'/loginpage'}>로그인</Link>
          </div>
          <div>
            <Link to={'/joinpage'}>회원가입</Link>
          </div>
        </S.NotJoin>
      )}
      <S.WriteBtn onClick={writeBtnHandler}>게시물작성</S.WriteBtn>
    </S.UserSection>
  );
}

export default User;
