import styled from 'styled-components';

export const Parents = styled.div`
  height: 300px;
  width: 300px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid #8977ad;
  margin: 20px;
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
  font-size: 30px;
  margin: 5px 0 5px 10px;
`;
export const CardSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding-left: 120px;
`;
