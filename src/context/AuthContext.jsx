import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('routinerush_token');
    const savedUser = localStorage.getItem('routinerush_user');

    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('routinerush_token');
        localStorage.removeItem('routinerush_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await API.post('/auth/login', { email, password });
    localStorage.setItem('routinerush_token', data.token);
    localStorage.setItem('routinerush_user', JSON.stringify(data));
    setUser(data);
    return data;
  };

  const register = async (firstName, lastName, email, password) => {
    const { data } = await API.post('/auth/register', { firstName, lastName, email, password });
    localStorage.setItem('routinerush_token', data.token);
    localStorage.setItem('routinerush_user', JSON.stringify(data));
    setUser(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('routinerush_token');
    localStorage.removeItem('routinerush_user');
    setUser(null);
  };

  const updateUser = (updatedData) => {
    const newUser = { ...user, ...updatedData };
    localStorage.setItem('routinerush_user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const refreshUser = async () => {
    try {
      if (user) {
        const { data } = await API.get('/users/profile');
        updateUser(data);
      }
    } catch (error) {
      console.error('Failed to refresh user profile:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
