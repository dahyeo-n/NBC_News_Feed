import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useEffect } from 'react';
// import { auth } from '../../firesbase';
// import { onAuthStateChanged } from 'firebase/auth';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import JoinPage from '../pages/JoinPage';
import MyPage from '../pages/MyPage';
import WritePage from '../pages/WritePage';
import DetailPage from '../pages/DetailPage';

function Routers() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/joinpage" element={<JoinPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/writepage" element={<WritePage />} />
        <Route path="/writepage/:id" element={<WritePage />} />
        <Route path="/detailpage" element={<DetailPage />} />
        <Route path="/detailpage/:id" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

export default Routers;
