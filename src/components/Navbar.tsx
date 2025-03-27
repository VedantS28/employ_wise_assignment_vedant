
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!isAuthenticated) return null;

  return (
    <header className="w-full bg-white bg-opacity-80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-40 transition-all duration-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 
            onClick={() => navigate('/users')}
            className="text-xl font-medium cursor-pointer transition-colors hover:text-primary"
          >
            EmployWise
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {location.pathname.startsWith('/users') && !location.pathname.includes('/edit') && (
            <div className="flex items-center text-sm text-muted-foreground">
              <User size={16} className="mr-1" />
              <span>User Management</span>
            </div>
          )}
          
          {isAuthenticated && (
            <button 
              onClick={logout}
              className="p-2 rounded-full text-slate-500 hover:text-destructive hover:bg-slate-100 transition-colors"
              aria-label="Logout"
            >
              <LogOut size={18} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
