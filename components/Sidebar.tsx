import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Bell, 
  Calendar, 
  Video, 
  Users, 
  CheckSquare, 
  Settings, 
  User, 
  FileText 
} from 'lucide-react';
import synthiaLogo from "@/assets/synthia-logo.png";

const Sidebar: React.FC = () => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Notification', path: '/notifications', icon: Bell },
    { name: 'Calendar', path: '/calendar', icon: Calendar },
    { name: 'Meeting', path: '/meetings', icon: Video },
    { name: 'Meeting Summary', path: '/meeting-summary', icon: FileText },
    { name: 'Collaboration', path: '/collaboration', icon: Users },
    { name: 'Task', path: '/tasks', icon: CheckSquare },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col dark:bg-slate-800 dark:border-slate-700 transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center space-x-2 p-4 h-[60px] border-b border-gray-200 dark:border-slate-700">
        <img src={synthiaLogo} alt="Synthia" className="h-12 w-12" />
        <span className="text-xl font-semibold text-gray-800 dark:text-white">Synthia</span>
      </div>

      {/* Scrollable Content */}
      <div className="flex-grow p-4 overflow-y-auto">
        
        {/* Main Menu */}
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2 dark:text-slate-400">Menu</h3>
        <nav className="flex-grow flex flex-col space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-200 dark:shadow-none'
                    : 'text-gray-600 hover:bg-violet-50 hover:text-violet-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200'
                }`
              }
            >
              {/* Icon Container with Notification Dot Logic */}
              <div className="relative">
                <item.icon className="w-5 h-5" />
                
                {/* 🔴 THE RED DOT ADDITION */}
                {item.name === 'Notification' && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border-2 border-white dark:border-slate-800"></span>
                  </span>
                )}
              </div>

              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Others Menu */}
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2 mt-6 dark:text-slate-400">Others</h3>
        <nav className="flex flex-col space-y-1">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer ${
                isActive
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-200 dark:shadow-none'
                  : 'text-gray-600 hover:bg-violet-50 hover:text-violet-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200'
              }`
            }
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </NavLink>
          
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer ${
                isActive
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-200 dark:shadow-none'
                  : 'text-gray-600 hover:bg-violet-50 hover:text-violet-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200'
              }`
            }
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </NavLink>
        </nav>
      </div>

      {/* Footer / User Profile */}
      <div className="border-t border-gray-200 p-4 dark:border-slate-700">
        <NavLink 
          to="/profile" 
          className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg transition-colors dark:hover:bg-slate-700 cursor-pointer"
        >
          <div className="flex items-center space-x-3">
            <img 
              src="https://i.pinimg.com/1200x/35/69/30/3569309bfbce2565ff6c83dff214b4c7.jpg" 
              alt="Profile" 
              className="h-10 w-10 rounded-full border border-gray-200 dark:border-slate-600" 
            />
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-slate-200">Peter Parker</p>
              <p className="text-xs text-gray-500 dark:text-slate-400">peter.park@ati.da.gov.ph</p>
            </div>
          </div>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;