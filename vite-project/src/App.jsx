import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Login from './components/Login';
import JoinMemberShip from './components/JoinMemberShip';
import { app } from './firesbase';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<JoinMemberShip />} />
      </Routes>
    </Router>
  );
}

export default App;
