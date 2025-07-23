// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import ContactPage from './components/ContactPage';
import AboutPage from './components/AboutPage';
import DashboardPage from "./pages/DashboardPage";
import RoutinePage from './pages/RoutinePage';

import './App.css';
import CheckprogressPage from './pages/CheckProgressPage';
import GroupTrackingPage from './pages/GroupTrackingPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/routine" element={<RoutinePage />} />
            <Route path="/progress" element={<CheckprogressPage />} />
            <Route path="/group-tracking" element={<GroupTrackingPage />} />
            <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;