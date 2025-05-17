import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

// import BlogDetails from './pages/BlogDetails';
import LoginForm from './pages/LoginForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<LoginForm/>} />
        <Route path="/dashboard" element={<Dashboard />} />
       
        {/* <Route path="/blogs/:id" element={<BlogDetails />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
