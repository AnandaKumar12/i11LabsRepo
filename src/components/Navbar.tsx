import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: '/companies', label: 'Companies' },
    { path: '/companies/new', label: 'New Company' },
    { path: '/drivers', label: 'Drivers' },
    { path: '/drivers/new', label: 'New Driver' },
  ];

  return (
    <nav className="flex gap-4 mb-6 bg-gray-100 p-3 rounded shadow">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`
              px-4 py-2 rounded font-medium transition-colors duration-200
              ${isActive ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}
              hover:bg-blue-500 hover:text-white
              shadow-sm
            `}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
