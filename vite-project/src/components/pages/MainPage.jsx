import { collection, getDocs } from 'firebase/firestore';
import { useEffect } from 'react';
import { db } from '../../firesbase';
import Header from '../commons/Header';
import User from '../commons/User';
import Card from '../commons/Card';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { init } from '../../redux/modules/posts';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firesbase';
import { loginUser, logoutUser } from '../../redux/modules/user';

function MainPage() {
  const posts = useSelector(function (item) {
    return item.posts;
  });
  const user = useSelector(function (item) {
    return item.user;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'posts'));

      // initialPosts => 데이터로 이루어진 배열(객체로 이루어진 배열)
      const initialPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      dispatch(init(initialPosts));
    };
    fetchData();
  }, []);

  // 로그인 확인
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // 로그인 한 유저가 존재하는 경우

        // (1) github

        // (2) google

        dispatch(
          loginUser({
            email: user.email,
            nickName: user.displayName,
            isLogin: true
          })
        );
      } else {
        // 로그인 한 유저가 존재하지 않는 경우
        dispatch(logoutUser());
      }
    });
  }, []);

  return (
    <>
      <Header />
      <Parents>
        <Wrapper>
          <User />
          {posts.length > 0 ? <Card /> : <div>작성된 게시글이 없습니다.</div>}
        </Wrapper>
      </Parents>
    </>
  );
}

export default MainPage;
export const Parents = styled.div`
  width: 100%;
  border-top: 2px solid black;
`;
export const Wrapper = styled.div`
  display: flex;
`;
