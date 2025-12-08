import React, { useState } from 'react';
import { Hash, Search, Plus, MessageSquare, ChevronDown, Smile, Paperclip } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Workspace: React.FC = () => {
  const navigate = useNavigate();
  const [activeChannel, setActiveChannel] = useState('general');

  return (
    <div className="flex h-screen bg-white dark:bg-slate-900 overflow-hidden">
      {/* Workspace Sidebar */}
      <aside className="w-64 bg-gray-50 dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 flex flex-col">
        <div className="p-3 border-b border-gray-200 dark:border-slate-700">
          <div onClick={() => navigate('/collaboration')} className="flex items-center justify-between p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded cursor-pointer">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-400 rounded flex items-center justify-center text-xs font-bold text-white">S</div>
              <span className="font-bold text-gray-800 dark:text-white truncate">SBIT-3K</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        </div>

      

        <div className="p-3 flex-1 overflow-y-auto">
          <div 
            onClick={() => navigate('/space')}
            className="flex items-center space-x-2 px-4 py-1.5 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-colors pb-2"
          >
            <svg className="w-4 h-4 text-gray-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className="text-sm font-medium text-gray-800 dark:text-slate-200">Space</span>
          </div>

          <div className="mb-6 pt-4">
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-xs font-semibold text-gray-500 uppercase">Channels</span>
              <Plus className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700" />
            </div>
            {['general', 'announcements', 'projects', 'random'].map(channel => (
              <div 
                key={channel}
                onClick={() => setActiveChannel(channel)}
                className={`flex items-center space-x-2 px-2 py-1.5 rounded cursor-pointer ${activeChannel === channel ? 'bg-gray-200 dark:bg-slate-700' : 'hover:bg-gray-100 dark:hover:bg-slate-700/50'}`}
              >
                <Hash className="w-4 h-4 text-gray-500" />
                <span className={`text-sm ${activeChannel === channel ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-600 dark:text-slate-300'}`}>{channel}</span>
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-xs font-semibold text-gray-500 uppercase">Direct Messages</span>
              <Plus className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700" />
            </div>
            <div className="flex items-center space-x-2 px-2 py-1.5 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700/50">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-600 dark:text-slate-300">Alex Smith</span>
            </div>
            <div className="flex items-center space-x-2 px-2 py-1.5 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700/50">
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              <span className="text-sm text-gray-600 dark:text-slate-300">Jane Doe</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full bg-white dark:bg-slate-900">
        <header className="flex-shrink-0 h-[60px] border-b border-gray-200 dark:border-slate-700 flex items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <Hash className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">{activeChannel}</h2>
          </div>
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white dark:border-slate-800"></div>
            <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white dark:border-slate-800"></div>
            <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white dark:border-slate-800 flex items-center justify-center text-xs text-gray-600 font-bold">+5</div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-700 font-bold">AS</div>
            <div>
              <div className="flex items-baseline space-x-2">
                <span className="font-bold text-gray-900 dark:text-white">Alex Smith</span>
                <span className="text-xs text-gray-500">12:30 PM</span>
              </div>
              <p className="text-gray-700 dark:text-slate-300 mt-1">Has anyone reviewed the latest design specs for the dashboard?</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded bg-purple-100 flex items-center justify-center flex-shrink-0 text-purple-700 font-bold">PP</div>
            <div>
              <div className="flex items-baseline space-x-2">
                <span className="font-bold text-gray-900 dark:text-white">Peter Parker</span>
                <span className="text-xs text-gray-500">12:32 PM</span>
              </div>
              <p className="text-gray-700 dark:text-slate-300 mt-1">Yes, I added some comments on the Figma file. <span className="text-blue-500 hover:underline cursor-pointer">@Alex Smith</span></p>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-slate-700">
          <div className="border border-gray-300 dark:border-slate-600 rounded-lg p-2 bg-white dark:bg-slate-800">
            <input 
              type="text" 
              placeholder={`Message #${activeChannel}`} 
              className="w-full bg-transparent outline-none text-gray-700 dark:text-white placeholder-gray-400 mb-2"
            />
            <div className="flex items-center justify-between">
              <div className="flex space-x-2 text-gray-400">
                <Plus className="w-5 h-5 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300" />
                <div className="w-px h-5 bg-gray-300 dark:bg-slate-600"></div>
                <Smile className="w-5 h-5 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300" />
                <Paperclip className="w-5 h-5 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300" />
              </div>
              <button className="bg-violet-600 text-white p-1.5 rounded hover:bg-violet-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;