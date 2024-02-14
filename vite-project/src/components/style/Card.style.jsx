import styled from 'styled-components';

export const Parents = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 3px solid #8977ad;
  font-size: 20px;
  line-height: 120%;
  margin-top: 50px;
  cursor: pointer;
  padding: 30px 40px;
  &:hover {
    transition: all 0.2s;
    transform: scale(1.05);
  }
  & > div {
    line-height: 24px;
    margin: 10px 0;
  }
`;

export const CardTitle = styled.div`
  color: #8977ad;
  font-size: 25px;
  font-weight: bold;
  margin: 5px 0 5px 10px;
  line-height: 150%;
`;

export const CardNicknameCreatedAt = styled.div`
  color: #cfcfcf;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const CardContent = styled.div`
  color: #cfcfcf;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const CardSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding-left: 100px;
`;
