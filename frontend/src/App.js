import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/Login';
import SignUp from './component/SignUp';
import Chatroom from './component/Chatrooms';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Login />} />
          <Route path="/chatroom" element={<Chatroom />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
