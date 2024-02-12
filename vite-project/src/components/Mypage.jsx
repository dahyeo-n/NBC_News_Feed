import styled from 'styled-components';
// db, doc, getDoc, updateDoc, useState, useEffect는 닉네임 넣으려고 한 거라 나중에 빼야 됨
// 이메일 동적으로 가져올 때, auth 추가하기
import { storage, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const StFontColor = styled.div`
  color: black;
  font-weight: 200;
  font-size: larger;
`;

const MyPage = () => {
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
    <div>
      <StFontColor>My Profile</StFontColor>
      <div>
        <img src={profileImage} alt="Profile" style={{ width: '200px', height: '200px' }} />
      </div>
      <form onSubmit={handleNicknameUpdate}>
        <label>
          Nickname:
          <input type="text" value={nickname} onChange={handleNicknameChange} />
        </label>
        <button type="submit">{isUploading ? '닉네임 수정 중...' : '닉네임 수정'}</button>
      </form>
      <form onSubmit={handleImageUpload}>
        <label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <button type="submit">{isUploading ? '사진 수정 중...' : '사진 수정'}</button>
      </form>
      <button onClick={handleNavigateToWritePage}>게시물 작성</button>
      <div>{/* map 메서드 넣을 곳 */}</div>
    </div>
  );
};

export default MyPage;
