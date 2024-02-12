import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Header() {
  return (
    <Parents>
      <TitleDiv>
        <Link to={'/'}>Header</Link>
      </TitleDiv>
    </Parents>
  );
}

export default Header;
export const TitleDiv = styled.div`
  margin-left: 30px;
  display: flex;
  align-items: center;
  margin-left: 30px;
`;

export const Parents = styled.div`
  display: flex;
  height: 100px;
  border-bottom: 1px solid #ccc;
  background-color: lightgrey;
  font-size: 30px;
`;
