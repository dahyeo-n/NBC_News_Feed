import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, storage } from '../firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';

const StFontColor = styled.div`
  color: black;
  font-weight: 200;
`;

const WritePage = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  // Firebase에서 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      // posts라는 이름으로 되어있는 컬렉션의 쿼리값 가져옴
      // 쿼리값을 토대로 가져온 다큐먼트들을 '쿼리스냅샷'으로 담음
      // getDocs 메서드를 통해 collection에 있는 모든 다큐먼트 가져옴
      const querySnapshot = await getDocs(collection(db, 'posts'));

      // 최초 게시물을 배열로 선언
      // doc에 메타 데이터까지 들어가있기 때문에 실제 데이터는 doc.data로 가져올 수 있음
      // querySnapshot에 들어가있는 모든 doc에 대해서 initialPosts값을 추가한 다음,
      // initialPosts를 setPosts를 통해서 값을 넣어줌
      const initialPosts = querySnapshot.docs.map((doc) => ({
        // doc에 id값을 추가해서 posts 추가
        id: doc.id,
        ...doc.data()
      }));
      setPosts(initialPosts);
    };
    fetchData();
  }, []);

  // addDoc으로 데이터 추가 로직
  // async - await 공부하기
  const addPost = async (event) => {
    event.preventDefault();

    // Firestore에 데이터 추가
    // 어느 collection의 문서를 가져올지 지정, 2번째 인자로 어떤 값을 추가할지 지정
    // 코드를 작성할 때 비동기 함수를 사용하는 경우, 항상 try...catch 블록을 사용하여 예외 처리를 해주는 것이 좋음
    if (!title.trim() || !content.trim()) return; // 빈 제목 또는 내용 방지

    try {
      const docRef = await addDoc(collection(db, 'posts'), { title, content, isDone: false });
      // 상태 업데이트 로직
      setPosts([...posts, { title, content, isDone: false, id: docRef.id }]);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error adding document: ', error);
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
      // 코드를 collection작성할 때 비동기 함수를 사용하는 경우, 항상 try...catch 블록을 사용하여 예외 처리를 해주는 것이 좋음
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

  return (
    <StFontColor>
      <h1>게시글 작성 페이지</h1>
      <form onSubmit={addPost}>
        <div>
          <label>게시글 : </label>
          <input type="text" value={title} name="title" onChange={titleChangeHandler} required />
          <input type="text" value={content} name="content" onChange={contentChangeHandler} required />
          <button type="submit">추가</button>
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
        <div>
          <h2>파일 업로드</h2>
          <input type="file" onChange={handleFileSelect} />
          <button onClick={fileUploadHandler}>Upload</button>
        </div>
      </div>
    </StFontColor>
  );
};

export default WritePage;
