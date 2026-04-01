import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, Home, Key } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed w-full z-50 glass border-b border-white/5 h-16">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-midnight-light to-midnight-neon bg-clip-text text-transparent">
          <Home className="text-midnight-neon" size={24}/>
          <span>Midnight Room</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/search" className="text-gray-300 hover:text-white transition-colors">Search</Link>
          
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/bookings/my" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">My Bookings</Link>
              
              { (user.role === 'owner' || user.role === 'admin') && (
                <Link to="/owner/dashboard" className="text-midnight-neon hover:text-midnight-purple transition-colors text-sm font-semibold flex items-center gap-1">
                  <Key size={16}/> Dashboard
                </Link>
              )}

              <button onClick={handleLogout} className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors ml-4 border-l border-white/10 pl-4">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Log in</Link>
              <Link to="/register" className="btn-primary py-2 px-4 shadow-none">List Property</Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
