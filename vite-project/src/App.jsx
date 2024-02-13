import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/pages/MainPage';
import LoginPage from './components/pages/LoginPage';
import JoinPage from './components/pages/JoinPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/joinpage" element={<JoinPage />} />
      </Routes>
    </Router>
  );
}

export default App;
