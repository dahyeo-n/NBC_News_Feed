import styled from 'styled-components';

export const Section = styled.section`
  width: 100%
  font-size: 16px;
`;
export const Parents = styled.div`
  width: 500px;
  margin: 0 auto;
  text-align: center;
`;
export const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  line-height: 54px;
`;
export const Form = styled.form`
  padding: 20px 0;
`;
export const BorderTop = styled.div`
  padding: 20px 0;
  border-top: 2px solid #333;
  border-bottom: 1px solid #ccc;
`;
export const UserBorder = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #ccc;
`;
export const BorderBottom = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #ccc;
  border-bottom: 2px solid #333;
`;
export const StyleP = styled.p`
  display: flex;
`;
export const Label = styled.label`
  font-size: 11px;
  width: 17%;
  text-indent: 10px;
  text-align: left;
  line-height: 40px;
  margin-right: 30px;
`;
export const LabelInput = styled.input`
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
  width: 70%;
  text-indent: 5px;
  line-height: 37px;
  margin-top: 4px;
`;
export const Block = styled.div`
  margin-top: 5px;
`;
export const EmailForm = styled.div`
  line-height: 30px;
  display: flex;
`;
export const EmailLabel = styled.div`
  font-size: 11px;
  width: 17%;
  text-align: left;
  text-indent: 10px;
  line-height: 40px;
  margin-right: 31px;
`;
export const EmailSelect = styled.select`
  width: 35%;
  text-align: left;
  text-indent: 10px;
  line-height: 40px;
  margin: 0 31px 0 5px;
`;
export const CustomInput = styled.input`
  width: 33%;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
  text-indent: 5px;
  line-height: 37px;
  margin-left: 5px;
`;
export const JoinBtn = styled.button`
  background: #0096d6;
  color: #fff;
  padding: 15px 170px;
  margin-top: 25px;
  cursor: pointer;
  &:disabled {
    cursor: default;
    background: #dadada;
    color: white;
  }
`;
export const EmailInput = styled.input`
  width: 33%;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
  text-indent: 5px;
  line-height: 37px;
  margin-right: 5px;
`;
export const ValidationJoin = styled.div`
  color: #ff0000;
  display: flex;
  text-indent: 15px;
  font-size: 10px;
  margin-top: 5px;
`;
