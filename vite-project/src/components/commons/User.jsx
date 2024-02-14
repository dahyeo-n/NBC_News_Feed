import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

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
    <UserSection>
      {isLogin && (
        <Parents>
          {/* 로그인시 */}

          {/* {signUpUser && signUpUser.length > 0 && currentUser.nickName === null ? (
            <UserNickName>{signUpUser[0].nickName}님</UserNickName>
          ) : (
            <UserNickName>{currentUser.nickName}님</UserNickName>
          )} */}
          <div>
            <NickNameSpan>{user.nickName}</NickNameSpan>님 환영합니다.
          </div>
          <UserBtnSection>
            <Link
              style={{
                color: 'black',
                border: 'none',
                margin: '10px',
                padding: '10px',
                fontSize: 'medium',
                fontWeight: 'bold',
                backgroundColor: 'darkgray',
                borderRadius: '10px'
              }}
              to={'/mypage'}
            >
              마이페이지
            </Link>
            <StLogoutBtn onClick={outBtn}>로그아웃</StLogoutBtn>
          </UserBtnSection>
        </Parents>
      )}
      {!isLogin && (
        //  회원이 아닐 때
        <NotJoin>
          <div>
            <Link
              style={{
                color: 'white',
                border: 'none',
                margin: '10px',
                padding: '10px',
                fontSize: 'medium',
                backgroundColor: 'gray',
                borderRadius: '10px',
                fontWeight: 'bold'
              }}
              to={'/loginpage'}
            >
              로그인
            </Link>
          </div>
          <div>
            <Link
              style={{
                color: 'black',
                border: 'none',
                margin: '10px',
                padding: '10px',
                fontSize: 'medium',
                fontWeight: 'bold',
                backgroundColor: 'darkgray',
                borderRadius: '10px'
              }}
              to={'/joinpage'}
            >
              회원가입
            </Link>
          </div>
        </NotJoin>
      )}
      <WriteBtn onClick={writeBtnHandler}>게시물 작성</WriteBtn>
    </UserSection>
  );
}

export default User;

const UserSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0px 0px 100px;
`;

const Parents = styled.div`
  height: 200px;
  width: 250px;
  display: flex;
  justify-content: center;
  background-color: #8977ad;
  margin: 10px 0 10px 10px;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
`;

const NotJoin = styled.div`
  height: 200px;
  width: 250px;
  background-color: #3e3e3e;
  display: flex;
  border-radius: 10px;
  margin: 10px 0 10px 10px;
  flex-direction: column;
  align-items: center;
  align-items: center;
  justify-content: center;
  gap: 30px;
  font-size: 25px;
`;

const WriteBtn = styled.button`
  border: none;
  margin: 10px;
  padding: 10px;
  font-size: medium;
  font-weight: bold;
  color: white;
  background-color: #3e3e3e;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    transition: all 0.2s;
    transform: scale(1.05);
  }
`;

const UserBtnSection = styled.div`
  display: flex;
  margin-top: 30px;
  align-items: center;
  gap: 5px;
  & > *:hover {
    color: #8977ad;
  }
  & > button {
    font-size: 16px;
  }
`;
const NickNameSpan = styled.span`
  color: black;
  font-weight: bold;
  font-size: 20px;
`;

const StLogoutBtn = styled.button`
  border: none;
  padding: 10px;
  font-size: medium;
  color: white;
  background-color: #3e3e3e;
  border-radius: 10px;
  font-weight: bold;
`;
