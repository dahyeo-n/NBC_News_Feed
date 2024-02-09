import React, { useEffect, useState } from 'react';
import * as S from './style/JoinPage.style';

function JoinPage() {
  const [emailTxt, setEmailTxt] = useState(''); // 이메일 텍스트
  const [email, setEmail] = useState('naver.com'); // 이메일 주소
  const [customEmail, setCustomEmail] = useState(false);
  const [id, setId] = useState(''); //유저 id값
  const [nickName, setNickName] = useState(''); // 닉네임
  const [pw, setPw] = useState(''); //비밀번호
  const [pwCheck, setPwCheck] = useState(''); // 비밀번호 확인
  //밸리데이션
  const [pwValid, setPwValid] = useState(false);
  const [pwCheckValid, setPwCheckValid] = useState(false);

  const emailTextHandler = (e) => {
    setEmailTxt(e.target.value);
  };
  const emailHandler = (e) => {
    const selctEmail = e.target.value;
    if (selctEmail === '직접입력') {
      setCustomEmail(true);
    } else {
      setEmail(selctEmail);
    }
  };
  const subBtn = (e) => {
    e.preventDefault();
  };
  const pwHandler = (e) => {
    //change추가
    setPw(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };
  const pwCheckHandler = (e) => {
    setPwCheck(e.target.value);
  };
  useEffect(() => {
    if (pw === pwCheck && pw !== '' && pwCheck !== '') {
      setPwCheckValid(true);
    } else {
      setPwCheckValid(false);
    }
  }, [pw, pwCheck]);

  useEffect(() => {
    setId(`${emailTxt}@${email}`);
  }, [emailTxt, email]);
  const nickNameHandler = (e) => {
    setNickName(e.target.value);
  };
  console.log(pw);
  console.log(pwCheck);
  console.log(pwCheckValid);

  //join true로 넘겨줌
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
            {emailTxt.length < 0 ||
              (emailTxt.length === 0 && (
                <S.ValidationJoin>*이메일을 입력 해주세요.</S.ValidationJoin>
              ))}
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
              {nickName.length < 2 && (
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
                <S.LabelInput type="password" value={pw} onChange={pwHandler} />
              </S.StyleP>
              {pw.length > 0 && !pwValid && (
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
              {!pwCheckValid && pwCheck.length > 0 && (
                <S.ValidationJoin>*비밀번호가 다릅니다.</S.ValidationJoin>
              )}
            </S.Block>
          </S.BorderBottom>
          <S.JoinBtn disabled={true} onClick={subBtn}>
            회원가입
          </S.JoinBtn>
        </S.Form>
      </S.Parents>
    </S.Section>
  );
}

export default JoinPage;
