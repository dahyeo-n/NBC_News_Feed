import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { addDoc, collection, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, storage } from '../firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';

const StHeader = styled.header`
  background-color: white;
  padding: 30px; // 예시로 추가한 스타일
  height: 800px;
  max-height: 1000px; // 내용에 따라 이 범위 내에서 크기가 조정됨
`;

const StPageWide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-weight: 200;
  width: 1300px;
  height: 800px;
  min-width: 800px;
  margin: auto;
  padding: auto;
  background-color: white;
  border-radius: 10px;
  font-size: large;
`;

const StTitleWriteBox = styled.input`
  width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  margin: 20px 10px 0px 10px;
  border-radius: 10px;
  background-color: gainsboro;
  font-size: larger;
  font-weight: 600;
  text-align: center;
  &::placeholder {
    color: black;
  }
`;

const StContentWriteBox = styled.input`
  width: 1000px;
  height: 200px;
  padding: 15px;
  margin: 20px 10px 0px 10px;
  border-radius: 10px;
  background-color: gainsboro;
  font-size: larger;
  font-weight: 600;
  text-align: center;
  &::placeholder {
    color: black;
  }
`;

const StImageText = styled.div`
  width: 100px;
  background-color: gainsboro;
  font-size: large;
  font-weight: 1000;
  text-align: center;
  padding: 10px;
  margin: 20px 15px 0px 0px;
  border-radius: 10px;
`;

const StFileSelect = styled.div`
  width: 885px;
  height: 30px;
  display: flex;
  align-items: center;
  background-color: gainsboro;
  font-size: large;
  font-weight: 1000;
  text-align: center;
  padding: 5px;
  margin: 20px 0px 0px 0px;
  border-radius: 10px;
`;

const StImageBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 10px;
`;

const StWriteCancleCompleteBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  border-radius: 10px;
  margin: 20px 10px 0px 0px;
`;

const WritePage = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        setIsLoading(true);
        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTitle(docSnap.data().title);
          setContent(docSnap.data().content);
        } else {
          alert('게시물이 존재하지 않습니다.');
          navigate('/');
        }
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = '';
      if (selectedFile) {
        const fileRef = ref(storage, `uploads/${selectedFile.name}`);
        const uploadResult = await uploadBytes(fileRef, selectedFile);
        imageUrl = await getDownloadURL(uploadResult.ref);
      }

      if (id) {
        // 기존 게시글 수정
        await updateDoc(doc(db, 'posts', id), {
          title,
          content,
          ...(imageUrl && { imageUrl })
        });
        alert('게시물이 수정되었습니다!');
      } else {
        // 새 게시글 작성
        await addDoc(collection(db, 'posts'), {
          // email
          title,
          content,
          imageUrl,
          createdAt: Timestamp.now()
        });
        alert('새 게시물이 추가되었습니다!');
      }
    } catch (error) {
      console.error('게시물 저장 실패: ', error);
      alert('게시물 저장에 실패했습니다.');
    } finally {
      setIsLoading(false);
      navigate('/');
    }
  };

  // 입력값 변경 처리 로직
  const titleChangeHandler = (event) => setTitle(event.target.value);
  const contentChangeHandler = (event) => setContent(event.target.value);

  // 파일 선택 로직
  const handleFileSelect = (event) => setSelectedFile(event.target.files[0]);

  // 파일 업로드 로직
  const fileUploadHandler = async () => {
    if (!selectedFile) return; // 파일이 선택되지 않았으면 함수 종료

    try {
      // ref라는 함수를 통해 storage 내부에 저장할 위치를 정할 수 있음
      // 두 번째 인자로 folder/file이라는 이름으로 저장(/로 경로 구분)
      const imageRef = ref(storage, `uploads/${auth.currentUser.uid}/${selectedFile.name}`);
      // 첫 번째 인자로 참조값인 imageRef를 받고, 두 번째 인자로 실제로 업로드할 파일 적음
      await uploadBytes(imageRef, selectedFile);
      const downloadURL = await getDownloadURL(imageRef);
      console.log('Download URL:', downloadURL);
    } catch (error) {
      console.error('Error uploading file: ', error);
    }
  };

  // updateDoc을 사용하여 게시글 수정
  // 게시글 상태 업데이트 로직
  const updatePost = async (id) => {
    try {
      // 비동기 함수를 사용하는 경우, 항상 try...catch 블록을 사용하여 예외 처리를 해주는 것이 좋음
      // collection 안에 있는 document의 값을 업데이트 해줘야 됨
      const postToUpdate = posts.find((post) => post.id === id);
      const postRef = doc(db, 'posts', id);
      await updateDoc(postRef, { isDone: !postToUpdate.isDone });
      setPosts((prev) => prev.map((post) => (post.id === id ? { ...post, isDone: !post.isDone } : post)));
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  // deleteDoc을 사용하여 게시글 삭제
  const deletePost = async (id) => {
    try {
      const postRef = doc(db, 'posts', id);
      await deleteDoc(postRef);
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  const cancelBtnhandler = () => {
    const userConfirmed = window.confirm('변경사항이 모두 초기화됩니다. 정말 나가시겠습니까?');
    if (userConfirmed) {
      // 사용자가 확인을 누른 경우, 폼 상태를 초기화
      setTitle('');
      setContent('');
      setSelectedFile(null);
    }
    // 사용자가 취소를 누른 경우, 아무것도 안 함
  };

  return (
    <StHeader>
      <StPageWide>
        <h1>{id ? '게시글 수정' : '새 게시글 작성'}</h1>
        <form onSubmit={handleSubmit}>
          <div>
            {/* 제목 입력 구간 */}
            <StTitleWriteBox
              type="text"
              value={title}
              name="title"
              placeholder="제목을 입력해주세요."
              onChange={titleChangeHandler}
              required
            />
            {/* 내용 입력 구간 */}
            <StContentWriteBox
              type="text"
              value={content}
              name="content"
              placeholder="내용을 입력해주세요."
              onChange={contentChangeHandler}
              required
            />
            {/* 파일 업로드 구간 */}
            <StImageBox>
              <StImageText>Image</StImageText>
              <StFileSelect>
                <input type="file" onChange={handleFileSelect} />
                <button onClick={fileUploadHandler}>Upload</button>
              </StFileSelect>
            </StImageBox>
            {/* Cancle, Complete 버튼 구간 */}
            <StWriteCancleCompleteBtn>
              {/* submit은 onClick 이벤트 없이 form의 onSubmit 이벤트를 통해 처리됨 */}
              {/* 사용자가 현재 작업을 취소하고 폼을 초기 상태로 리셋.
              type="button"으로 설정하고 클릭 이벤트에 폼 상태를 초기화하는 함수 연결 */}
              <button type="button" onClick={cancelBtnhandler}>
                Cancle
              </button>
              <button type="submit">Complete</button>{' '}
            </StWriteCancleCompleteBtn>
          </div>
        </form>
        <div>
          {/* Working Section */}
          <h3>Working</h3>
          {posts
            .filter((post) => !post.isDone)
            .map((post) => (
              <div key={post.id}>
                <span>{post.title}</span>
                <span>{post.content}</span>
                {/* 첫 작성일 때랑 수정일 때랑 다르게(삼항연산자) */}
                <button onClick={() => updatePost(post.id)}>완료</button>
                <button onClick={() => deletePost(post.id)}>삭제</button>
              </div>
            ))}
          {/* Done Section */}
          <h3>Done</h3>
          {posts
            .filter((post) => post.isDone)
            .map((post) => (
              <div key={post.id}>
                <span>{post.title}</span>
                <span>{post.content}</span>
                <button onClick={() => updatePost(post.id)}>취소</button>
                <button onClick={() => deletePost(post.id)}>삭제</button>
              </div>
            ))}
        </div>
      </StPageWide>
    </StHeader>
  );
};

export default WritePage;
