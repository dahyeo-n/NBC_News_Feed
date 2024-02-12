import React, { useState } from 'react';
import styled from 'styled-components';

function Card({ posts }) {
  return (
    <>
      {posts.map((post) => {
        return (
          <Parents key={post.id}>
            <CardTitle>
              <h2>{post.title}</h2>
            </CardTitle>
            <div>
              {post.nickName} ㅣ {post.createdAt}
            </div>
            <div>이미지</div>
            <div>{post.content}</div>
          </Parents>
        );
      })}
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
