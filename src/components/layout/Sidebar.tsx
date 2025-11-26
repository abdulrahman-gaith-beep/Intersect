import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Store,
  FolderOpen,
  MessageCircle,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    { path: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/app/marketplace', label: 'Service Marketplace', icon: Store },
    { path: '/app/data-room', label: 'Data Room', icon: FolderOpen },
    { path: '/app/support', label: 'Support', icon: MessageCircle },
    { path: '/app/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <Link to="/app/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">I</span>
            </div>
            <span className="text-xl font-bold text-slate-900">Intersect</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-4 space-y-1">
          {menuItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                isActive(item.path)
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
              {isActive(item.path) && (
                <ChevronRight size={16} className="ml-auto" />
              )}
            </Link>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-emerald-700 font-semibold">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {user?.company || 'Company'}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 mt-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-red-600 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 flex items-center justify-between px-4">
        <Link to="/app/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">I</span>
          </div>
          <span className="text-xl font-bold text-slate-900">Intersect</span>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-slate-600 hover:text-emerald-600"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'tween' }}
              className="lg:hidden fixed top-0 left-0 bottom-0 w-72 bg-white z-50 flex flex-col"
            >
              {/* Mobile Logo */}
              <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
                <Link to="/app/dashboard" className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">I</span>
                  </div>
                  <span className="text-xl font-bold text-slate-900">Intersect</span>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-600 hover:text-emerald-600"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 py-6 px-4 space-y-1">
                {menuItems.map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive(item.path)
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>

              {/* Mobile User Section */}
              <div className="p-4 border-t border-slate-100">
                <div className="flex items-center gap-3 px-4 py-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-700 font-semibold">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {user?.company || 'Company'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 mt-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-red-600 rounded-lg transition-colors"
                >
                  <LogOut size={20} />
                  <span>Sign Out</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 lg:ml-0 mt-16 lg:mt-0 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
