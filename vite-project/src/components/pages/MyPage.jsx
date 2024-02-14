import styled from 'styled-components';

import { db } from '../../firesbase';
import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../commons/Header';
import { useSelector } from 'react-redux';

const MyPage = () => {
  const { posts, user } = useSelector(function (item) {
    return item;
  });

  const userWriteData = posts.filter(function (post) {
    return post.email === user.email;
  });

  const defaultProfileImage =
    'https://firebasestorage.googleapis.com/v0/b/newsfeed-96796.appspot.com/o/profile_images%2F%EB%A1%9C%EC%A7%81%EC%9D%B4_%EB%96%A0%EC%98%A4%EB%A5%B8_%ED%96%84%EC%8A%88%ED%83%80.jpg?alt=media&token=38a85eef-766a-4c55-9aef-bdd35fe8ba7b';
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const navigate = useNavigate();

  const userEmail = user.email;
  const [nickname, setNickname] = useState(user.nickName);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const docRef = doc(db, 'users', userEmail);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setProfileImage(userData.profileImage || defaultProfileImage);
        setNickname(userData.nickname || 'Anonymous');
      } else {
        console.log('No such document!');
      }
    };

    fetchUserProfile();
  }, [userEmail]);

  const handleNavigateToWritePage = () => {
    navigate('/writepage');
  };

  return (
    <StAllArea>
      <Header />
      <StLeftArea>
        <StProfileBox>
          <StProfileImage src={profileImage} alt="Profile" style={{ width: '200px', height: '200px' }} />
          <StNicknameBox>
            <div>{nickname}</div>
          </StNicknameBox>
        </StProfileBox>
        <StWritePostBtn onClick={handleNavigateToWritePage}>게시물 작성</StWritePostBtn>
      </StLeftArea>
      <StRightArea>
        {userWriteData.length === 0 ? (
          <None>😢아직 작성한 게시물이 없습니다😢</None>
        ) : (
          userWriteData.map((post) => (
            <div key={post.id}>
              <StWriteBox
                onClick={() => {
                  navigate(`/detailpage/${post.id}`);
                }}
              >
                <StTitle>{post.title}</StTitle>
                <StCreatedAt>| {post.createdAt}</StCreatedAt>
                <StContent>{post.content}</StContent>
              </StWriteBox>
            </div>
          ))
        )}
      </StRightArea>
    </StAllArea>
  );
};

MyPage.propTypes = {
  posts: PropTypes.array.isRequired
};

export default MyPage;

const StAllArea = styled.div`
  width: 1400px;
  margin: auto;
`;

const StProfileImage = styled.img`
  width: 100px;
  cursor: pointer;
`;

const StLeftArea = styled.div`
  width: 22%;
  height: 1000px;
  float: left;
  box-sizing: border-box;
  padding: 20px;
  background: #8977ad;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
`;

const StRightArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */
  width: 77%;
  height: 1000px;
  float: right;
  box-sizing: border-box;
  background-color: #1c1c20 !important;
  border-radius: 20px;
  padding: 15px;
`;

const StProfileBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-radius: 10px;
  background: white;
  padding: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StNicknameBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  color: #5250d8;
  font-size: 18px;
  font-weight: bold;
`;

const StWriteBox = styled.div`
  width: 240px;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  padding: 15px;
  margin: 20px 10px 0px 10px;
  border-radius: 10px;
  background-color: #505050;
  font-size: 20px;
  line-height: 120%;
  font-weight: bold;
  /* font-weight: 400; */
  letter-spacing: -0.02px;
  color: #fff !important;
  cursor: pointer;
  &:hover {
    transition: all 0.2s;
    transform: scale(1.05);
  }
`;

const StTitle = styled.div`
  color: #7a78fa;
  font-size: 25px;
  margin-bottom: 10px;
  line-height: 120%;
`;

const StCreatedAt = styled.div`
  color: #cfcfcf;
  font-size: 12px;
  margin-bottom: 10px;
`;

const StContent = styled.div`
  color: #fff !important;
  font-size: 22px;
  line-height: 120%;
`;

const StWritePostBtn = styled.button`
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
const None = styled.div`
  color: #7472e7;
  border: 1px solid white;
  width: 100%;
  height: 300px;
  font-size: 30px;
  display: flex;
  justify-content: space-around;
  flex-direction: column-reverse;
  align-items: center;
  font-weight: bold;
`;
