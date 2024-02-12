import styled from 'styled-components';
import { useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const StFontColor = styled.div`
  color: black;
  font-weight: 200;
`;

const MyPage = () => {
  const [files, setFileList] = useState([]); // 파일 리스트
  const [isUploading, setUploading] = useState(false); // 업로드 상태
  const [photoURL, setPhotosURL] = useState([]); // 업로드 완료된 사진 링크들
  const [progress, setProgress] = useState(0); // 업로드 진행 상태
  const navigate = useNavigate();

  // 파일 선택 시 파일리스트 상태 변경
  const handleImageChange = (e) => {
    for (const image of e.target.files) {
      setFileList((prevState) => [...prevState, image]);
    }
  };

  // 업로드 시 호출되는 로직
  const handleImageUpload = async (e) => {
    e.preventDefault();
    setUploading(true);

    const uploadPromises = files.map((file) => {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            setProgress(progress);
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              resolve(downloadURL);
            });
          }
        );
      });
    });

    Promise.all(uploadPromises)
      .then((urls) => {
        setPhotosURL(urls);
        alert('프로필 사진이 업로드되었습니다.');
      })
      .catch((error) => {
        console.error('Error uploading files: ', error);
        alert('프로필 사진이 업로드에 실패했습니다.');
      })
      .finally(() => {
        setUploading(false);
        setFileList([]);
        setProgress(0);
      });
  };

  // 새 이미지로 교체
  const handleReplaceImage = async (file, index) => {
    if (!file) return;
    setUploading(true);
    const storageRef = ref(storage, `images/${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const newDownloadURL = await getDownloadURL(storageRef);
      const updatedUrls = [...photoURL];
      updatedUrls[index] = newDownloadURL; // 특정 인덱스의 URL을 새 URL로 업데이트
      setPhotosURL(updatedUrls);
      alert('프로필 사진이 교체되었습니다.');
    } catch (error) {
      console.error('프로필 사진 교체 실패: ', error);
      alert('프로필 사진 교체에 실패했습니다.');
    } finally {
      setUploading(false);
    }
  };

  // 업로드된 이미지 중 하나를 새 이미지로 교체하기 위한 UI와 로직
  const handleFileReplace = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      handleReplaceImage(file, index);
    }
  };

  // 게시물 작성 페이지로 이동하는 로직
  const handleNavigateToWritePage = () => {
    navigate('/writepage'); // '/writepage' 경로로 이동
  };

  return (
    <div>
      <StFontColor>마이페이지입니다</StFontColor>
      <form onSubmit={(e) => handleImageUpload(e, files)}>
        <label>
          <input multiple accept="image/*" type="file" onChange={handleImageChange} />
        </label>
        <button type="submit">{isUploading ? '업로드 중...' : '업로드'}</button>
      </form>
      {photoURL?.length > 0 && (
        <ul>
          {photoURL.map((url, index) => (
            <li key={index}>
              <img src={url} alt="Uploaded" style={{ width: '200px', height: '200px' }} />
              <input type="file" onChange={(e) => handleFileReplace(e, index)} />
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleNavigateToWritePage}>게시물 작성</button>
    </div>
  );
};

export default MyPage;
