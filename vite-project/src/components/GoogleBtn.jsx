import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../firesbase';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const GoogleBtn = () => {
  const navigate = useNavigate();

  // 파이어베이스 데이터 추가 전에 데이터 중복 여부를 위해 getDocs
  const addUser = async (email, nickName) => {
    //email,nickName을 매개변수로 받아 비동기로 실행
    const userRef = collection(db, 'users');
    const userQuery = query(userRef, where('email', '==', email));
    const querySnapshot = await getDocs(userQuery);
    //db에서 email이 똑같은 데이터를 받아오고 없다면 (길이가0이면) 추가
    if (querySnapshot.size === 0) {
      const newUser = { email: email, nickName: nickName };
      const collectionRef = collection(db, 'users');
      await addDoc(collectionRef, newUser);
      confirm('로그인 성공!');
      navigate('/');
    } else {
      console.log('이미 가입 된 이메일 입니다.');
      confirm('로그인 성공!');
      navigate('/');
    }
  };

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider(); // provider 구글 설정
    signInWithPopup(auth, provider) // 팝업창 띄워서 로그인
      .then((data) => {
        const googleEmail = data.user.email;
        const googleNickName = data.user.displayName;
        addUser(googleEmail, googleNickName); //db추가 함수에 매개변수로 전달
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return <button onClick={handleGoogleLogin}>구글로 로그인</button>;
};

export default GoogleBtn;
