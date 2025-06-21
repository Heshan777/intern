import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { logout } from '../../services/authService';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
  const { currentUser, userRole } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      isActive ? 'bg-primary text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
    }`;

  return (
    <nav className="bg-white dark:bg-dark-bg-secondary shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">InternLink</Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <NavLink to="/find-internships" className={navLinkClass}>Find Internships</NavLink>
                {userRole === 'student' && <NavLink to="/student-dashboard" className={navLinkClass}>Dashboard</NavLink>}
                {userRole === 'company' && <NavLink to="/company-dashboard" className={navLinkClass}>Dashboard</NavLink>}
                {userRole === 'admin' && <NavLink to="/admin-dashboard" className={navLinkClass}>Admin Panel</NavLink>}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <button onClick={toggleTheme} className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
              {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
            </button>
            <div className="ml-4">
              {currentUser ? (
                <button onClick={logout} className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700">
                  Logout
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/login" className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700">Login</Link>
                  <Link to="/signup" className="px-4 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-primary-light">Sign Up</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;