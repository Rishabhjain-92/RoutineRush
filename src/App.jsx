// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';

import LandingPage from './components/LandingPage';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import ContactPage from './components/ContactPage';
import AboutPage from './components/AboutPage';
import DashboardPage from './pages/DashboardPage';
import RoutinePage from './pages/RoutinePage';
import CheckProgressPage from './pages/CheckProgressPage';
import GroupTrackingPage from './pages/GroupTrackingPage';
import ProfilePage from './pages/ProfilePage';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1e293b',
                color: '#f1f5f9',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                fontSize: '14px',
              },
              success: {
                iconTheme: { primary: '#10b981', secondary: '#f1f5f9' },
              },
              error: {
                iconTheme: { primary: '#ef4444', secondary: '#f1f5f9' },
              },
            }}
          />
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />

              {/* Protected Routes */}
              <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
              <Route path="/routine" element={<ProtectedRoute><RoutinePage /></ProtectedRoute>} />
              <Route path="/progress" element={<ProtectedRoute><CheckProgressPage /></ProtectedRoute>} />
              <Route path="/group-tracking" element={<ProtectedRoute><GroupTrackingPage /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

              {/* 404 */}
              <Route path="*" element={
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
                  <div className="text-center">
                    <h1 className="text-8xl font-black bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent mb-4">404</h1>
                    <p className="text-xl text-slate-300 mb-8">Page not found</p>
                    <a href="/" className="px-8 py-3 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-xl font-bold hover:scale-105 transition-all duration-300 inline-block">Go Home</a>
                  </div>
                </div>
              } />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;