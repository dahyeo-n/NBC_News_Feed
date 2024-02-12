import React from 'react';
import styled from 'styled-components';

function Header() {
  return (
    <Parents>
      <LogoTitle>Header</LogoTitle>
    </Parents>
  );
}

export default Header;

export const Parents = styled.div`
  display: flex;
  height: 100px;
  border-bottom: 1px solid #ccc;
  background-color: lightgrey;
`;
export const LogoTitle = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px;
  font-size: 30px;
`;
