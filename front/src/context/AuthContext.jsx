import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize from localStorage if available
    const savedUser = localStorage.getItem('sustain_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [goals, setGoals] = useState([]);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [ecoPoints, setEcoPoints] = useState(0);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Login failed');
      }

      const data = await response.json();
      const userData = {
        email,
        token: data.jwt,
        role: data.role,
        name: email.split('@')[0]
      };

      setUser(userData);
      localStorage.setItem('sustain_user', JSON.stringify(userData));
      return { success: true, role: data.role };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: error.message };
    }
  };

  const signup = async (name, email, password, isAdmin = false) => {
    try {
      const endpoint = isAdmin ? '/signup-admin' : '/signup';
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Signup failed');
      }

      // Automatically login after successful signup
      return await login(email, password);
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sustain_user');
  };

  const addGoal = (title) => {
    if (!user) return alert('Please login to add goals!');
    if (!goals.find(g => g.title === title)) {
      setGoals([...goals, { id: Date.now(), title, status: 'Not Started' }]);
    }
  };

  const completeLesson = (lessonId) => {
    if (!user) return alert('Please login to complete lessons!');
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
      setEcoPoints(ecoPoints + 20);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, login, signup, logout, 
      goals, addGoal, 
      completedLessons, completeLesson, 
      ecoPoints 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
