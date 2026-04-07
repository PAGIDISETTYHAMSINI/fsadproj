import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, User, LogOut, Layout } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <Leaf size={24} />
        SustainEd
      </Link>
      
      <div className="nav-links">
        <Link to="/lessons" className={`nav-link ${isActive('/lessons')}`}>Lessons</Link>
        <Link to="/projects" className={`nav-link ${isActive('/projects')}`}>Projects</Link>
        
        {user ? (
          <>
            {user.role === 'ADMIN' ? (
              <Link to="/admin-dashboard" className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', gap: '0.25rem' }}>
                <Layout size={16} /> Admin Panel
              </Link>
            ) : (
              <Link to="/dashboard" className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', gap: '0.25rem' }}>
                <User size={16} /> My Progress
              </Link>
            )}
            <button onClick={logout} className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', gap: '0.25rem', border: 'none' }}>
              <LogOut size={16} /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="btn btn-primary" style={{ padding: '0.4rem 0.8rem' }}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
