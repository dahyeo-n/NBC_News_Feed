import React from 'react';
import * as S from './style/JoinPage.style';

function JoinPage() {
  return (
    <S.Section>
      <S.Parents>
        <S.Title>JOIN</S.Title>
        <S.Form>
          <S.BorderTop>
            <S.EmailForm>
              <S.EmailLabel>E-mail</S.EmailLabel>
              <S.EmailInput type="email" />@
              <S.EmailSelect name="domain">
                <option>naver.com</option>
                <option>gmail.com</option>
                <option>daum.net</option>
                <option>nate.com</option>
                <option>직접입력</option>
              </S.EmailSelect>
            </S.EmailForm>
            <S.ValidationJoin>*이메일을 입력 해주세요.</S.ValidationJoin>
          </S.BorderTop>
          {/* 정보입력 */}
          <S.UserBorder>
            <S.Block>
              <S.StyleP>
                <S.Label>닉네임</S.Label>
                <S.LabelInput type="text" />
              </S.StyleP>
              <S.ValidationJoin>*두 글자 이상 입력 해주세요.</S.ValidationJoin>
            </S.Block>
          </S.UserBorder>
          <S.BorderBottom>
            <S.Block>
              <S.StyleP>
                <S.Label>비밀번호</S.Label>
                <S.LabelInput type="password" />
              </S.StyleP>
              <S.ValidationJoin>
                *영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.
              </S.ValidationJoin>
              <S.StyleP>
                <S.Label>비밀번호 확인</S.Label>
                <S.LabelInput type="password" />
              </S.StyleP>
              <S.ValidationJoin>*비밀번호가 다릅니다.</S.ValidationJoin>
            </S.Block>
          </S.BorderBottom>
          <S.JoinBtn disabled={true}>회원가입</S.JoinBtn>
        </S.Form>
      </S.Parents>
    </S.Section>
  );
}

export default JoinPage;
