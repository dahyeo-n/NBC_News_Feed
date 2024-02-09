import Main from './components/Main';
import Mypage from './components/Mypage';
import Writepage from './components/Writepage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

const StFontColor = styled.div`
  color: white;
  font-weight: 200;
`;

function App() {
  return (
    <StFontColor>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/writepage" element={<Writepage />} />
        </Routes>
      </Router>
    </StFontColor>
  );
}

export default App;
