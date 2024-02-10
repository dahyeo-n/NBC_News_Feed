// App.js
import { useEffect, useState } from 'react';
import { app } from '../firebase';
import { auth } from '../firebase';
import { db } from '../firebase';
import styled from 'styled-components';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
console.log(app);

const StFontColor = styled.div`
  color: black;
  font-weight: 200;
`;

const WritePage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 로그인 중인 사용자 데이터 가져오는 법
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user);
    });
    // 현재 로그인한 유저의 정보 볼 수 있음: auth.currentUser
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // 특정 컬렉션의 프로젝트와 연결된 db, 컬렉션 이름이 posts인 문서를 가져온다
      const querySnapshot = await getDocs(collection(db, 'posts'));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
      });
    };
    fetchData();
  }, []);

  const onChange = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };

  // 회원가입
  const signUp = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('user', userCredential.user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error with signUp', errorCode, errorMessage);
    }
  };

  // 로그인
  const signIn = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('user with signIn', userCredential.user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error with signIn', errorCode, errorMessage); // 오류 메시지 정정
    }
  };

  // 로그아웃
  const logOut = async (event) => {
    event.preventDefault();
    await signOut(auth);
  };

  return (
    <StFontColor className="App">
      <h2>로그인 페이지</h2>
      <form>
        <div>
          <label>이메일 : </label>
          <input type="email" value={email} name="email" onChange={onChange} required></input>
        </div>
        <div>
          <label>비밀번호 : </label>
          <input type="password" value={password} name="password" onChange={onChange} required></input>
        </div>
        <button onClick={signUp}>회원가입</button>
        <button onClick={signIn}>로그인</button>
        <button onClick={logOut}>로그아웃</button>
      </form>
    </StFontColor>
  );
};

export default WritePage;
