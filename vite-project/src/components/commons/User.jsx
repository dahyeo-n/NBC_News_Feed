import React from 'react';
import styled from 'styled-components';

function User() {
  return (
    <>
      <Parents>
        <ImgSection>
          <div>이미지</div>
        </ImgSection>

        <UserNickName>닉네임</UserNickName>

        <UserBtnSection>
          <button>마이페이지</button>
          <button>로그아웃</button>
        </UserBtnSection>
      </Parents>
      <WriteBtn>게시물작성</WriteBtn>
    </>
  );
}

export default User;

export const Parents = styled.div`
  height: 300px;
  width: 250px;
  display: flex;
  border: 2px solid black;
  background-color: lightgrey;
  margin: 10px 0 10px 10px;
  flex-direction: column;
  align-items: center;
`;

export const LogoTitle = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px;
  font-size: 30px;
`;
export const WriteBtn = styled.button`
  margin-bottom: 5px;
`;

export const ImgSection = styled.div`
  height: 200px;
  width: 200px;
  margin-top: 20px;
  border: 2px solid black;
`;
export const UserNickName = styled.p`
  margin-top: 20px;
`;
export const UserBtnSection = styled.div`
  display: flex;
  margin-top: 30px;
`;
