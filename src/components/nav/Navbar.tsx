import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

import Avatar from '../avatar/Avatar';
import useProfile from '../../hooks/useProfile';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { profile } = useProfile();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-indigo-500 text-white py-3 flex justify-between items-center shadow-md px-16 h-16">
      {/* Navbar Title */}
      <Link to="/">
        <div className="text-4xl font-bold flex font-serif">
          <p className="font-mono">Policies</p>&nbsp;for the&nbsp;
          <p className="font-mono">Students</p>
        </div>
      </Link>

      {/* Buttons/Avatar Section */}
      <div className="flex items-center space-x-4">
        {!isAuthenticated ? (
          <>
            {/* Login and Signup Buttons */}
            <Link to="/login">
              <button
                // onClick={handleLogin}
                className="bg-white text-indigo-600 px-4 py-2 rounded shadow hover:bg-indigo-100"
              >
                Login
              </button>
            </Link>
            <Link to="/register">
              <button
                // onClick={handleLogin}
                className="bg-white text-indigo-600 px-4 py-2 rounded shadow hover:bg-indigo-100"
              >
                Signup
              </button>
            </Link>
          </>
        ) : (
          <div className="relative" ref={dropdownRef}>
            {/* Avatar */}
            <div
              className="box-border hover:cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Avatar name={profile?.name || 'User'} />
            </div>

            {/* Dropdown */}
            {isOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg overflow-hidden z-20">
                <button
                  onClick={() => logout()}
                  className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
