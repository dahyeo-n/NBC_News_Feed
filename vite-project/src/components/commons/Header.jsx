import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Header() {
  const navigate = useNavigate();
  // Main Page로 이동
  const navigateToMain = () => {
    navigate('/');
  };
  return (
    <StHeader>
      <StLogoImage
        src="https://blog.kakaocdn.net/dn/bgSwWu/btsELplChCq/FRtBQfF9CrG8UHd6tnzoK0/img.jpg"
        alt="Logo"
        onClick={navigateToMain}
      />
    </StHeader>
  );
}

export default Header;

export const StHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 40px;
`;
const StLogoImage = styled.img`
  width: 100px;
  cursor: pointer;
`;
