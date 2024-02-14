import React from 'react';
import GitHubImg from '../style/image/github.png';
import GoogleImg from '../style/image/google.png';
import { SocialBtn } from '../style/SocialLogin.style';
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../../firesbase';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function SocialLoginBtn({ type = 'google' }) {
  const navigate = useNavigate();
  const addUser = async (email, nickName) => {
    const userRef = collection(db, 'users');
    const userQuery = query(userRef, where('email', '==', email));
    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.size === 0) {
      const newUser = { email: email, nickName: nickName };
      const collectionRef = collection(db, 'users');
      await addDoc(collectionRef, newUser);
      confirm('로그인 성공!');
      navigate('/');
    } else {
      console.log('이미 가입 된 이메일 처리 입니다.');
      confirm('로그인 성공!');
      navigate('/');
    }
  };
  //로그인 버튼 클릭시
  const handleGithubLogin = () => {
    let provider;
    if (type === 'google') {
      provider = new GoogleAuthProvider();
    } else if (type === 'github') {
      provider = new GithubAuthProvider();
    }
    signInWithPopup(auth, provider)
      .then((data) => {
        const githubEmail = data.user.email;
        const githubNickName = data.user.displayName;
        addUser(githubEmail, githubNickName);
      })
      .catch((err) => {
        console.log(err);
        alert('이미 사용중인 이메일 입니다.');
      });
  };
  return (
    <SocialBtn onClick={handleGithubLogin}>
      {type === 'google' && <img src={GoogleImg} alt="구글로 로그인" />}
      {type === 'github' && <img src={GitHubImg} alt="깃허브로 로그인" />}
    </SocialBtn>
  );
}

export default SocialLoginBtn;
