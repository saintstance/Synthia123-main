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
    // 🔴 CHANGE THIS LINE: from '/' to '/dashboard'
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard }, 
    { name: 'Notification', path: '/notifications', icon: Bell },
    { name: 'Calendar', path: '/calendar', icon: Calendar },
    { name: 'Meeting', path: '/meetings', icon: Video },
    { name: 'Meeting Summary', path: '/meeting-summary', icon: FileText },
    { name: 'Collaboration', path: '/collaboration', icon: Users },
    { name: 'Task', path: '/tasks', icon: CheckSquare },
  ];

  // Helper for consistent styling
  const getLinkClasses = (isActive: boolean) => 
    `flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer ${
      isActive
        ? 'bg-violet-600 text-white shadow-md shadow-violet-200 dark:shadow-none'
        : 'text-gray-600 hover:bg-violet-50 hover:text-violet-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200'
    }`;

  return (
    <aside className="w-64 h-full flex-shrink-0 bg-white border-r border-gray-200 flex flex-col dark:bg-slate-800 dark:border-slate-700 transition-colors duration-300">
      
      {/* Header */}
      <div className="flex-none flex items-center space-x-2 p-4 h-[60px] border-b border-gray-200 dark:border-slate-700">
        <img src={synthiaLogo} alt="Synthia" className="h-12 w-12" />
        <span className="text-xl font-semibold text-gray-800 dark:text-white">Synthia</span>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 min-h-0">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2 dark:text-slate-400">Menu</h3>
        <nav className="flex flex-col space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => getLinkClasses(isActive)}
            >
              <div className="relative">
                <item.icon className="w-5 h-5" />
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

        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2 mt-6 dark:text-slate-400">Others</h3>
        <nav className="flex flex-col space-y-1 pb-4">
          <NavLink
            to="/profile"
            className={({ isActive }) => getLinkClasses(isActive)}
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </NavLink>
          
          <NavLink
            to="/settings"
            className={({ isActive }) => getLinkClasses(isActive)}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </NavLink>
        </nav>
      </div>

      {/* Footer */}
      <div className="flex-none border-t border-gray-200 p-4 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50">
        <NavLink 
          to="/profile" 
          className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer group"
        >
          <div className="flex items-center space-x-3 w-full">
            <img 
              src="https://i.pinimg.com/1200x/35/69/30/3569309bfbce2565ff6c83dff214b4c7.jpg" 
              alt="Profile" 
              className="h-10 w-10 rounded-full border border-gray-200 dark:border-slate-600 object-cover flex-shrink-0" 
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-800 dark:text-slate-200 truncate">Ronhel Andrade</p>
              <p className="text-xs text-gray-500 dark:text-slate-400 truncate group-hover:text-violet-600 transition-colors">
                andrade.ronhel@qcu.edu.ph
              </p>
            </div>
          </div>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;