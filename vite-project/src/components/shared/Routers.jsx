import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firesbase';
import { onAuthStateChanged } from 'firebase/auth';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import JoinPage from '../pages/JoinPage';
import MyPage from '../pages/MyPage';
import WritePage from '../pages/WritePage';
import DetailPage from '../pages/DetailPage';

function Routers() {
  //db posts데이터
  const [posts, setPosts] = useState([]);
  //로그인 여부
  const [check, setCheck] = useState(false);
  //로그인한 유저 정보 {email:000 , nickName: 000}
  const [currentUser, setCurrentUser] = useState([]);
  //로그아웃정보
  const [authInfo, setAuthInfo] = useState(null);
  //로그인한 유저의 이메일값 000@000.com
  const [localUser, setLocalUser] = useState();
  //회원가입으로 가입 한 유저의 정보
  const [signUpUser, setSignUpUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'posts'));

      const initialPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()

        // createdAt: doc.data().createdAt?.toDate().toLocaleString() ???????????
      }));
      setPosts(initialPosts);
    };
    fetchData();
  }, []);
  // 로그인 확인
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        setCheck(true);
        setCurrentUser({ email: user.email, nickName: user.displayName });
        setLocalUser(user.email);
        setAuthInfo(auth);
      } else {
        setCheck(false);
        setCurrentUser(null);
      }
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/mypage" element={<MyPage posts={posts} />} />
        {/* 새 게시글 '작성' */}
        <Route path="/writepage" element={<WritePage currentUser={currentUser} />} />
        {/* 클릭한 본인 게시글 '수정' */}
        <Route
          path="/writepage/:id"
          element={<WritePage posts={posts} setPosts={setPosts} currentUser={currentUser} />}
        />
        <Route
          path="/detailpage"
          element={<DetailPage posts={posts} setPosts={setPosts} />}
          currentUser={currentUser}
        />
        <Route
          path="/detailpage/:id"
          element={<DetailPage posts={posts} setPosts={setPosts} currentUser={currentUser} />}
        />
        <Route
          path="/"
          element={
            <MainPage
              posts={posts}
              setPosts={setPosts}
              check={check}
              currentUser={currentUser}
              authInfo={authInfo}
              localUser={localUser}
              setSignUpUser={setSignUpUser}
              signUpUser={signUpUser}
            />
          }
        />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/joinpage" element={<JoinPage />} />
      </Routes>
    </Router>
  );
}

export default Routers;
