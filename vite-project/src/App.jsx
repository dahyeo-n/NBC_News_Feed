import MyPage from './components/MyPage';
import WritePage from './components/Writepage';
import DetailPage from './components/DetailPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import { collection, getDocs } from 'firebase/firestore';
import { db } from './firesbase';
import { useEffect, useState } from 'react';
import MainPage from './components/pages/MainPage';
import LoginPage from './components/pages/LoginPage';
import JoinPage from './components/pages/JoinPage';

const StFontColor = styled.div`
  color: black;
  font-weight: 200;
`;

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Firebase에서 데이터 가져오기
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
        ...doc.data(),
        // createdAt을 적절한 날짜 형식으로 변환
        createdAt: doc.data().createdAt?.toDate().toLocaleString()
      }));
      setPosts(initialPosts);
      console.log(posts);
    };
    fetchData();
  }, []);

  //   onAuthStateChanged(auth, (user) => {
  //     console.log('user', user); // 사용자 인증 정보가 변경될 때마다 해당 이벤트를 받아 처리
  //   });
  // }, []);

  return (
    <Router>
      <StFontColor>
        <Routes>
          <Route path="/mypage" element={<MyPage posts={posts} />} />
          {/* 새 게시글 '작성' */}
          <Route path="/writepage" element={<WritePage />} />
          {/* 클릭한 본인 게시글 '수정' */}
          <Route path="/writepage/:id" element={<WritePage posts={posts} setPosts={setPosts} />} />
          <Route path="/detailpage" element={<DetailPage posts={posts} setPosts={setPosts} />} />
          <Route path="/detailpage/:id" element={<DetailPage posts={posts} setPosts={setPosts} />} />
          <Route path="/" element={<MainPage posts={posts} setPosts={setPosts} />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/joinpage" element={<JoinPage />} />
        </Routes>
      </StFontColor>
    </Router>
  );
};

export default App;
