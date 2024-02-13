import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as S from '../style/Login.style';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firesbase';
import Header from '../commons/Header';
import GoogleBtn from '../commons/GoogleBtn';
import GitHubBtn from '../commons/GitHubBtn';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (emailValid && pwValid) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [emailValid, pwValid]);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(e.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };
  const handlePw = (e) => {
    setPw(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };
  const signInBtn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pw);
      confirm('로그인 되었습니다.');
      navigate('/');
    } catch (error) {
      alert('가입되지 않은 계정입니다.');
      setEmail('');
      setPw('');
      setDisabled(true);
    }
  };

  return (
    <>
      <Header />
      <S.MainStyle>
        <S.Section>
          <S.Wrapper>
            <S.H2>LOGIN</S.H2>
            <form>
              <S.InputWrapper>
                <S.InputStyle
                  value={email}
                  onChange={handleEmail}
                  type="email"
                  placeholder="이메일"
                  autoFocus="autofocus"
                />
                <S.Validation>
                  {!emailValid && email.length > 0 && <div>올바른 이메일을 입력해주세요.</div>}
                </S.Validation>
              </S.InputWrapper>
              <S.InputWrapper>
                <S.InputStyle
                  value={pw}
                  onChange={handlePw}
                  type="password"
                  placeholder="password"
                  autoFocus="autofocus"
                />
                <S.Validation>
                  {!pwValid && pw.length > 0 && <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>}
                </S.Validation>
              </S.InputWrapper>
              <div>
                <S.ButtonStyle type="submit" disabled={disabled} onClick={signInBtn}>
                  로그인
                </S.ButtonStyle>
              </div>
            </form>
            <S.JoinWrap>
              <ul>
                <li>
                  <Link to={'/joinpage'}>회원가입</Link>
                </li>
              </ul>
            </S.JoinWrap>
            <S.EtcLoginWrap>
              <p>or</p>
              <S.EtcLoginUl>
                <li>
                  <GoogleBtn />
                </li>
                <li>
                  <GitHubBtn />
                </li>
              </S.EtcLoginUl>
            </S.EtcLoginWrap>
          </S.Wrapper>
        </S.Section>
      </S.MainStyle>
    </>
  );
}

export default LoginPage;
