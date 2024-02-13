import styled from 'styled-components';
// db, doc, getDoc, updateDoc, useState, useEffect는 닉네임 넣으려고 한 거라 나중에 빼야 됨
// 이메일 동적으로 가져올 때, auth 추가하기
import { storage, db } from '../../firesbase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../commons/Header';

const MyPage = ({ posts }) => {
  // 기본 이미지 주소 저장 로직
  const defaultProfileImage =
    'https://firebasestorage.googleapis.com/v0/b/newsfeed-96796.appspot.com/o/profile_images%2F%EB%A1%9C%EC%A7%81%EC%9D%B4_%EB%96%A0%EC%98%A4%EB%A5%B8_%ED%96%84%EC%8A%88%ED%83%80.jpg?alt=media&token=38a85eef-766a-4c55-9aef-bdd35fe8ba7b';
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setUploading] = useState(false);
  const navigate = useNavigate();

  // 사용자 이메일로 식별해서 닉네임 변경하는 로직
  const userEmail = 'user@example.com';
  const [nickname, setNickname] = useState('Dev햄슈타');

  useEffect(() => {
    const fetchUserProfile = async () => {
      // const user = auth.currentUser; (이거 추가할 때, 아래 두 줄 코드 if문 안으로 넣어야 됨)
      const docRef = doc(db, 'users', userEmail); // Using userEmail as document identifier
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
    //   }, []); 아래 코드 이걸로 변경
  }, [userEmail]);

  // 파일 선택 시, 파일리스트 상태 변경
  const handleImageChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // 파일 업로드 시, 호출되는 로직
  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    setUploading(true);

    // const userEmail = auth.currentUser.email; // 현재 사용자의 이메일
    const storageRef = ref(storage, `profile_images/${selectedFile.name}`);

    try {
      await uploadBytes(storageRef, selectedFile);
      const downloadURL = await getDownloadURL(storageRef);
      await updateDoc(doc(db, 'users', userEmail), {
        profileImage: downloadURL,
        // 아래 닉네임 삭제
        nickname
      });
      setProfileImage(downloadURL); // Update profile image with the new URL
      alert('프로필 사진이 업데이트 되었습니다.');
    } catch (error) {
      console.error('프로필 사진 업로드 실패: ', error);
      alert('프로필 사진 업로드에 실패했습니다.');
    } finally {
      setUploading(false);
      setSelectedFile(null); // 파일 Reset
    }
  };

  // 닉네임 수정 로직
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleNicknameUpdate = async (e) => {
    e.preventDefault();
    // if (!auth.currentUser) return;
    setUploading(true);

    // const userEmail = auth.currentUser.email;

    try {
      await updateDoc(doc(db, 'users', userEmail), { nickname });
      alert('닉네임이 변경됐습니다.');
    } catch (error) {
      console.error('[Error] 닉네임 변경 실패: ', error);
      alert('닉네임 변경에 실패했습니다.');
    } finally {
      setUploading(false);
    }
  };

  // 게시물 작성 페이지로 이동하는 로직
  const handleNavigateToWritePage = () => {
    navigate('/writepage'); // '/writepage' 경로로 이동
  };

  return (
    <StAllArea>
      <Header />
      <StLeftArea>
        <StProfileBox>
          <StLogoImage src={profileImage} alt="Profile" style={{ width: '200px', height: '200px' }} />
          <StNicknameBox>
            <form onSubmit={handleNicknameUpdate}>
              <label>
                <input type="text" value={nickname} onChange={handleNicknameChange} />
              </label>
              <button type="submit">{isUploading ? '수정 중...' : '닉네임 수정'}</button>
            </form>
          </StNicknameBox>
          <StFileUploadBox>
            <form onSubmit={handleImageUpload}>
              <label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </label>
              <button type="submit">{isUploading ? '수정 중...' : '사진 수정'}</button>
            </form>
          </StFileUploadBox>
        </StProfileBox>
        <button onClick={handleNavigateToWritePage}>게시물 작성</button>
      </StLeftArea>
      <StRightArea>
        {posts.map((post) => (
          <div key={post.id}>
            <StTitleWriteBox>
              <div>{post.title}</div>
              <div>| Nickname</div>
              <div>| {post.createdAt}</div>
            </StTitleWriteBox>
            <StBoxWithImage>
              {/* 전역 상태로 저장된 사진 불러와서 보여주기 */}
              {/* {post.imageUrl && <img src={imageUrl} alt="Post" style={{ maxWidth: '500px', maxHeight: '500px' }} />} */}
            </StBoxWithImage>
            <StContentWriteBox>{post.content}</StContentWriteBox>
          </div>
        ))}
      </StRightArea>
    </StAllArea>
  );
};

// prop-types 정의 추가
MyPage.propTypes = {
  posts: PropTypes.array.isRequired // posts는 배열이며, 필수적으로 전달되어야 함을 의미
};

export default MyPage;

const StAllArea = styled.div`
  width: 1400px;
  margin: auto;
`;

const StLogoImage = styled.img`
  width: 100px;
  cursor: pointer;
`;

const StLeftArea = styled.div`
  width: 30%;
  height: 1000px;
  float: left;
  box-sizing: border-box;
  padding: 20px;
  background: #8977ad;
  display: flex;
  flex-direction: column;
`;

const StRightArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 70%;
  float: right;
  box-sizing: border-box;
  background: white;
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
  background: #8977ad;
`;

const StFileUploadBox = styled.div`
  padding: 10px;
  margin: 15px 30px 0px 30px;
`;

const StTitleWriteBox = styled.div`
  width: 240px;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  padding: 15px;
  margin: 20px 10px 0px 10px;
  border-radius: 10px;
  background-color: gainsboro;
  font-size: medium;
  font-weight: 600;
`;

const StBoxWithImage = styled.div`
  width: 250px;
  height: 150px;
  padding: 10px;
  margin: 10px 10px 0px 10px;
  background-color: gainsboro;
  font-size: x-large;
  font-weight: 600;
  align-items: baseline;
`;

const StContentWriteBox = styled.div`
  width: 250px;
  padding: 10px;
  margin: 10px 10px 0px 10px;
  border-radius: 10px;
  background-color: gainsboro;
  font-size: small;
  font-weight: 600;
  align-items: baseline;
`;
