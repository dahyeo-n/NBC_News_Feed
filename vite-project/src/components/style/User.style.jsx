import styled from 'styled-components';

export const UserSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Parents = styled.div`
  height: 300px;
  width: 250px;
  display: flex;
  justify-content: center;
  border: 1px solid #8977ad;
  margin: 10px 0 10px 10px;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
`;
export const NotJoin = styled.div`
  height: 300px;
  width: 250px;
  display: flex;
  border: 1px solid #8977ad;
  border-radius: 10px;
  margin: 10px 0 10px 10px;
  flex-direction: column;
  align-items: center;
  align-items: center;
  justify-content: center;
  gap: 30px;
  font-size: 25px;
`;

export const LogoTitle = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px;
  font-size: 30px;
`;
export const WriteBtn = styled.button`
  margin-bottom: 5px;
  background-color: #8977ad;
  color: white;
  padding: 8px 10px;
  border-radius: 5px;
  margin-top: 5px;
  cursor: pointer;
  &:hover {
    transition: all 0.2s;
    transform: scale(1.05);
  }
`;

export const ImgSection = styled.div`
  height: 200px;
  width: 200px;
  margin-top: 20px;
  border: 2px solid black;
`;
export const UserNickName = styled.p`
  margin-top: 20px;
`;
export const UserBtnSection = styled.div`
  display: flex;
  margin-top: 30px;
  align-items: center;
  gap: 5px;
  & > *:hover {
    color: #8977ad;
  }
  & > button {
    font-size: 16px;
  }
`;
export const NickNameSpan = styled.span`
  color: #8977ad;
  font-weight: 700;
  font-size: 18px;
`;
