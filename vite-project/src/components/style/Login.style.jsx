import styled from 'styled-components';
//이미지가 import가 안됨,사이즈 좀 줄이기
//현재 브랜치 에서 커밋 푸쉬하면 PR해야 하는지
export const Section = styled.section`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  text-align: center;
`;
export const H2 = styled.h2`
  font-size: 28px;
  font-weight: 700;
  line-height: 54px;
  padding-bottom: 30px;
`;
export const Wrapper = styled.div`
  width: 530px;
  font-size: 16px;
`;
export const InputWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const InputStyle = styled.input`
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
  margin-top: 10px;
`;
export const ButtonStyle = styled.button`
  color: #fff;
  cursor: pointer;
  width: 100%;
  padding: 15px 0;
  background: #0096d6;
  border-radius: 5px;
  font-size: 18px;
  border-color: transparent;
  margin-top: 20px;
  &:disabled {
    cursor: default;
    background: #dadada;
    color: white;
  }
`;
export const Validation = styled.div`
  color: #ff0000;
  display: flex;
  text-indent: 15px;
  font-size: 10px;
  margin-top: 5px;
`;

export const JoinWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;
export const EtcLoginWrap = styled.div`
  padding-top: 20px;
`;

export const EtcLoginUl = styled.ul`
  display: flex;
  gap: 25px;
  padding-top: 27px;
  height: 40px;
  justify-content: center;
`;
