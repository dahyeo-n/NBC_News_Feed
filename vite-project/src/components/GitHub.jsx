import React from 'react';
import GitHubImg from '../components/image/github.png';
import { SocialBtn } from './style/SocialLogin.style';

function GitHub() {
  return (
    <SocialBtn>
      <img src={GitHubImg} alt="깃허브로 로그인" />
    </SocialBtn>
  );
}

export default GitHub;
