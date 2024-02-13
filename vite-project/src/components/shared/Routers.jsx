import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useEffect } from 'react';
// import { auth } from '../../firesbase';
// import { onAuthStateChanged } from 'firebase/auth';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import JoinPage from '../pages/JoinPage';
import MyPage from '../pages/MyPage';
import WritePage from '../pages/WritePage';
import DetailPage from '../pages/DetailPage';
import { useSelector } from 'react-redux';

function Routers() {
  //db posts데이터
  // const [_, setPosts] = useState([]);
  //로그인 여부
  // const [check, setCheck] = useState(false);
  //로그인한 유저 정보 {email:000 , nickName: 000}
  // const [currentUser, setCurrentUser] = useState([]);
  //로그아웃정보
  // const [authInfo, setAuthInfo] = useState(null);
  //로그인한 유저의 이메일값 000@000.com
  // const [localUser, setLocalUser] = useState();
  //회원가입으로 가입 한 유저의 정보
  // const [signUpUser, setSignUpUser] = useState([]);

  // const dispatch = useDispatch();

  const posts = useSelector(function (item) {
    return item.posts;
  });

  console.log('ROUTERS posts => ', posts);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     // query 세팅해서 data get하는 로직
  //     const querySnapshot = await getDocs(collection(db, 'posts'));

  //     // initialPosts => 데이터로 이루어진 배열(객체로 이루어진 배열)
  //     const initialPosts = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data()

  //       // createdAt: doc.data().createdAt?.toDate().toLocaleString() ???????????
  //     }));

  //     console.log('initialPosts', initialPosts);
  //     // setPosts(initialPosts);
  //     dispatch(init(initialPosts));
  //   };
  //   fetchData();
  // }, []);

  return (
    <Router>
      <Routes>
        <Route path="/mypage" element={<MyPage />} />
        {/* 새 게시글 '작성' */}
        <Route path="/writepage" element={<WritePage />} />
        {/* 클릭한 본인 게시글 '수정' */}
        <Route path="/writepage/:id" element={<WritePage />} />
        <Route path="/detailpage" element={<DetailPage />} />
        <Route path="/detailpage/:id" element={<DetailPage />} />
        <Route
          path="/"
          element={
            // <MainPage
            //   check={check}
            //   currentUser={currentUser}
            //   authInfo={authInfo}
            //   localUser={localUser}
            //   setSignUpUser={setSignUpUser}
            //   signUpUser={signUpUser}
            // />
            <MainPage />
          }
        />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/joinpage" element={<JoinPage />} />
      </Routes>
    </Router>
  );
}

export default Routers;
