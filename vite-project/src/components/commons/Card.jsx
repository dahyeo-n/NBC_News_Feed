import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Card({ posts }) {
  const navigate = useNavigate();
  return (
    <CardSection>
      {posts.map((post) => {
        return (
          <Parents
            key={post.id}
            onClick={() => {
              navigate('/detailpage/${post.id}');
            }}
          >
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
    </CardSection>
  );
}

export default Card;
export const Parents = styled.div`
  height: 300px;
  width: width: calc(50% - 20px); 
  display: flex;
  flex-direction: column;
  border: 2px solid black;
  background-color: lightgrey;
  margin: 20px;
  cursor: pointer;
  &:hover {
    transition: all 0.2s;
    transform: scale(1.05);
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
