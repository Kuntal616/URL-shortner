import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LogOut, User, Link as LinkIcon } from 'lucide-react';
import { logout } from '../store/slice/authSlice';
import { logoutUser } from '../api/user.api';
import { useNavigate } from '@tanstack/react-router';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const Navigate = () => {
    navigate({ to: "/auth" });
  };
  const handleLogin = () => {
    // Navigate to login page or show login modal
    Navigate();
    console.log('Login clicked');
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      navigate({ to: "/auth" });
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      // Still logout from Redux even if API call fails
      dispatch(logout());
    }
  };
    
  return (
    <nav className="bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Brand */}
          <div className="flex items-center space-x-2">
            <LinkIcon className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-800">ShortLink</h1>
          </div>

          {/* Right side - Auth */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* User Info */}
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">{user?.name}</span>
                </div>
                
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              /* Login Button */
              <button
                onClick={handleLogin}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
