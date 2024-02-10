import React, { useEffect, useState } from 'react';
import * as S from './style/JoinPage.style';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firesbase';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';

function JoinPage() {
  const [emailTxt, setEmailTxt] = useState(''); // 이메일 텍스트
  const [selectEmail, setSelectEmail] = useState('naver.com'); // 이메일 주소
  const [customEmail, setCustomEmail] = useState(false);
  const [email, setEmail] = useState(''); //유저 id값
  const [nickName, setNickName] = useState(''); // 닉네임
  const [pw, setPw] = useState(''); //비밀번호
  const [pwCheck, setPwCheck] = useState(''); // 비밀번호 확인
  //밸리데이션
  const [emailValid, setEmailValid] = useState(false);
  const [nickNameValid, setNickNameValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [pwCheckValid, setPwCheckValid] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const navigate = useNavigate();

  //파이어베이스 데이터 추가
  const addUser = async () => {
    const newUser = { email: email, nickName: nickName };
    const collectionRef = collection(db, 'users');
    await addDoc(collectionRef, newUser);
    console.log('파이어베이스 확인해봐요');
  };

  //데이터 영역
  //이메일txt
  const emailTextHandler = (e) => {
    setEmailTxt(e.target.value);
    if (e.target.value.length > 0) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };
  //이메일select
  const emailHandler = (e) => {
    const selctEmail = e.target.value;
    if (selctEmail === '직접입력') {
      setCustomEmail(true);
    } else {
      setSelectEmail(selctEmail);
    }
  };
  //닉네임
  const nickNameHandler = (e) => {
    setNickName(e.target.value);
    if (e.target.value.length > 1) {
      setNickNameValid(true);
    } else {
      setNickNameValid(false);
    }
  };
  //비밀번호
  const pwChangeHandler = (e) => {
    setPw(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };
  //비밀번호 체크
  const pwCheckHandler = (e) => {
    setPwCheck(e.target.value);
  };
  useEffect(() => {
    if (pw === pwCheck) {
      setPwCheckValid(true);
    } else {
      setPwCheckValid(false);
    }
  }, [pw, pwCheck]);
  //버튼 disabled
  useEffect(() => {
    if (emailValid && nickNameValid && pwValid && pwCheckValid) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [emailValid, nickNameValid, pwValid, pwCheckValid]);

  //회원가입 버튼
  const subBtn = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        pw
      );
      addUser();
      confirm('회원가입 성공!');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  //이메일값
  useEffect(() => {
    setEmail(`${emailTxt}@${selectEmail}`);
  }, [emailTxt, selectEmail]);

  return (
    <S.Section>
      <S.Parents>
        <S.Title>JOIN</S.Title>
        <S.Form>
          <S.BorderTop>
            <S.EmailForm>
              <S.EmailLabel>E-mail</S.EmailLabel>
              <S.EmailInput
                value={emailTxt}
                onChange={emailTextHandler}
                type="text"
              />
              @
              {!customEmail ? (
                <S.EmailSelect name="domain" onChange={emailHandler}>
                  <option value={'naver.com'}>naver.com</option>
                  <option value={'gmail.com'}>gmail.com</option>
                  <option value={'daum.net'}>daum.net</option>
                  <option value={'nate.com'}>nate.com</option>
                  <option value={'직접입력'}>직접입력</option>
                  {/* label 직접입력 선택시 input으로 바뀌기, onChange로 인풋 값 받기 */}
                </S.EmailSelect>
              ) : (
                <S.CustomInput onChange={(e) => setEmail(e.target.value)} />
              )}
            </S.EmailForm>
            {!emailValid && (
              <S.ValidationJoin>*이메일을 입력 해주세요.</S.ValidationJoin>
            )}
          </S.BorderTop>
          {/* 정보입력 */}
          <S.UserBorder>
            <S.Block>
              <S.StyleP>
                <S.Label>닉네임</S.Label>
                <S.LabelInput
                  type="text"
                  value={nickName}
                  onChange={nickNameHandler}
                />
              </S.StyleP>
              {!nickNameValid && (
                <S.ValidationJoin>
                  *두 글자 이상 입력 해주세요.
                </S.ValidationJoin>
              )}
            </S.Block>
          </S.UserBorder>
          <S.BorderBottom>
            <S.Block>
              <S.StyleP>
                <S.Label>비밀번호</S.Label>
                <S.LabelInput
                  type="password"
                  value={pw}
                  onChange={pwChangeHandler}
                />
              </S.StyleP>
              {!pwValid && (
                <S.ValidationJoin>
                  *영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.
                </S.ValidationJoin>
              )}
              <S.StyleP>
                <S.Label>비밀번호 확인</S.Label>
                <S.LabelInput
                  type="password"
                  value={pwCheck}
                  onChange={pwCheckHandler}
                />
              </S.StyleP>
              {!pwCheckValid && (
                <S.ValidationJoin>*비밀번호를 확인해주세요.</S.ValidationJoin>
              )}
            </S.Block>
          </S.BorderBottom>
          <S.JoinBtn disabled={disabled} onClick={subBtn}>
            회원가입
          </S.JoinBtn>
        </S.Form>
      </S.Parents>
    </S.Section>
  );
}

export default JoinPage;
