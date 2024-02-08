import Main from './components/Main';
import Mypage from './components/Mypage';
import Writepage from './components/Writepage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/writepage" element={<Writepage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
