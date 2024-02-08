import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as S from './style/Login.style';

function Login() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  return (
    <main>
      <S.Section>
        {/* 로그인,비번 최상위 부모 */}
        <S.Wrapper>
          <S.H2>LOGIN</S.H2>
          <form>
            <S.InputWrapper>
              <S.InputStyle
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="이메일"
                autoFocus="autofocus"
              />
              <S.Validation>올바른 이메일을 입력해주세요.</S.Validation>
            </S.InputWrapper>
            <S.InputWrapper>
              <S.InputStyle
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                type="password"
                placeholder="password"
                autoFocus="autofocus"
              />
              <S.Validation>
                영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.
              </S.Validation>
            </S.InputWrapper>
            <div>
              <S.ButtonStyle type="submit">로그인</S.ButtonStyle>
            </div>
          </form>
          {/* form 파트 끝 부분 */}
          {/* 회원가입부분 */}
          <S.JoinWrap>
            <ul>
              <li>
                <Link to={'/join'}>회원가입</Link>
              </li>
            </ul>
          </S.JoinWrap>
          {/* 회원가입 파트 끝 */}
          {/* 소셜로그인 */}
          <S.EtcLoginWrap>
            <p>or</p>
            <S.EtcLoginUl>
              <li>
                <Link to={''}>구글 로그인</Link>
              </li>
              <li>
                <Link to={''}>깃허브 로그인</Link>
              </li>
            </S.EtcLoginUl>
          </S.EtcLoginWrap>
        </S.Wrapper>
      </S.Section>
    </main>
  );
}

export default Login;
