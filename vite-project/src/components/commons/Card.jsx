import React from 'react';
import styled from 'styled-components';

function Card() {
  return (
    <>
      <Parents>
        <CardTitle>
          <h2>Ttile</h2>
        </CardTitle>
        <div>닉네임 ㅣ 작성일</div>
        <div>이미지</div>
        <div>Content ...</div>
      </Parents>
      <Parents>
        <CardTitle>
          <h2>Ttile</h2>
        </CardTitle>
        <div>닉네임 ㅣ 작성일</div>
        <div>이미지</div>
        <div>Content ...</div>
      </Parents>
      <Parents>
        <CardTitle>
          <h2>Ttile</h2>
        </CardTitle>
        <div>닉네임 ㅣ 작성일</div>
        <div>이미지</div>
        <div>Content ...</div>
      </Parents>
      <Parents>
        <CardTitle>
          <h2>Ttile</h2>
        </CardTitle>
        <div>닉네임 ㅣ 작성일</div>
        <div>이미지</div>
        <div>Content ...</div>
      </Parents>
    </>
  );
}

export default Card;
export const Parents = styled.div`
  height: 300px;
  width: 300px;
  display: flex;
  flex-direction: column;
  border: 2px solid black;
  background-color: lightgrey;
  margin: 20px;
`;
export const CardTitle = styled.div`
  font-size: 30px;
  margin: 5px 0 5px 10px;
`;
