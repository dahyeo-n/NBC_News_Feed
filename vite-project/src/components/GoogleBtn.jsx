import React, { useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../firesbase';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const GoogleBtn = () => {
  const [email, setEmail] = useState();
  const [nickName, setNickName] = useState();
  const navigate = useNavigate();

  //파이어베이스 데이터 추가
  // const addUser = async () => {
  //   const newUser = { email: email, nickName: nickName };
  //   const collectionRef = collection(db, 'users');
  //   await addDoc(collectionRef, newUser);
  // };

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider(); // provider 구글 설정
    signInWithPopup(auth, provider) // 팝업창 띄워서 로그인
      .then((data) => {
        const googleEmail = data.user.email;
        setEmail(googleEmail);
        setNickName(data.user.displayName); //user data 설정
        console.log(email);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return <button onClick={handleGoogleLogin}>구글로 로그인</button>;
};

export default GoogleBtn;
