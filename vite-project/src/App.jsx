import MainPage from './components/MainPage';
import MyPage from './components/MyPage';
import WritePage from './components/WritePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Auth from './components/Auth';
import Todo from './components/Todo';
import FileUpload from './components/FileUpload';

const StFontColor = styled.div`
  color: black;
  font-weight: 200;
`;

const App = () => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user); // 사용자 인증 정보가 변경될 때마다 해당 이벤트를 받아 처리합니다.
    });
  }, []);

  return (
    <Router>
      <StFontColor>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/fileupload" element={<FileUpload />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/writepage" element={<WritePage />} />
        </Routes>
      </StFontColor>
    </Router>
  );
};

export default App;
