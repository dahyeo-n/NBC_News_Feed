import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { app } from './firesbase';
import JoinPage from './components/JoinPage';
import LoginPage from './components/LoginPage';
import MainPage from './components/commons/MainPage';

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
