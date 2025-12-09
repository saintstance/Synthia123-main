import React, { useState } from 'react';
import { 
  Hash, Search, Plus, MessageSquare, ChevronDown, Smile, 
  Paperclip, Video, Phone, Settings, Bell
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Workspace: React.FC = () => {
  const navigate = useNavigate();
  const [activeChannel, setActiveChannel] = useState('general');
  const [message, setMessage] = useState('');

  return (
    <div className="flex h-screen bg-white dark:bg-slate-900 overflow-hidden font-sans">
      
      {/* Workspace Sidebar */}
      <aside className="w-72 bg-gray-50 dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 flex flex-col">
        
        {/* Workspace Header Switcher */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors cursor-pointer group">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm">
                S
             </div>
             <div>
                <h2 className="text-sm font-bold text-gray-800 dark:text-white group-hover:text-violet-600 transition-colors">SBIT-3K</h2>
                <p className="text-[10px] text-gray-500 dark:text-slate-400">8 members</p>
             </div>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
           
           {/* Primary Nav */}
           <div className="space-y-1">
              {/* GO BACK TO COLLABORATION (TEAMS LIST) */}
              <div 
                onClick={() => navigate('/collaboration')}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer transition-colors"
              >
                  <Search className="w-4 h-4" />
                  <span className="text-sm font-medium">Browse Teams</span>
              </div>
              
              {/* GO TO SPACE (DISCUSSION) - CONNECTED HERE */}
              <div 
                onClick={() => navigate('/space')} 
                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300 font-medium cursor-pointer"
              >
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm">Space</span>
              </div>
           </div>

           {/* Channels */}
           <div>
              <div className="flex items-center justify-between px-2 mb-2 group">
                 <span className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-gray-600 dark:group-hover:text-slate-300 transition-colors">Channels</span>
                 <Plus className="w-3 h-3 text-gray-400 cursor-pointer hover:text-violet-600" />
              </div>
              <div className="space-y-0.5">
                  {['general', 'announcements', 'projects', 'random'].map(channel => (
                    <div 
                        key={channel}
                        onClick={() => setActiveChannel(channel)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer transition-colors ${activeChannel === channel ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-600 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700/50'}`}
                    >
                        <Hash className={`w-3.5 h-3.5 ${activeChannel === channel ? 'text-gray-800 dark:text-white' : 'text-gray-400'}`} />
                        <span className="text-sm">{channel}</span>
                    </div>
                  ))}
              </div>
           </div>

           {/* Direct Messages */}
           <div>
              <div className="flex items-center justify-between px-2 mb-2 group">
                 <span className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-gray-600 dark:group-hover:text-slate-300 transition-colors">Direct Messages</span>
                 <Plus className="w-3 h-3 text-gray-400 cursor-pointer hover:text-violet-600" />
              </div>
              <div className="space-y-0.5">
                  <div className="flex items-center gap-3 px-3 py-1.5 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-700/50 text-gray-700 dark:text-slate-300">
                      <div className="relative">
                        <img src="https://i.pravatar.cc/150?u=a" className="w-5 h-5 rounded-full" alt="Alex" />
                        <span className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-green-500 border border-white dark:border-slate-800 rounded-full"></span>
                      </div>
                      <span className="text-sm">Alex Smith</span>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-1.5 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-700/50 text-gray-700 dark:text-slate-300">
                      <div className="relative">
                         <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center text-[9px] font-bold">JD</div>
                         <span className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-gray-400 border border-white dark:border-slate-800 rounded-full"></span>
                      </div>
                      <span className="text-sm">Jane Doe</span>
                  </div>
              </div>
           </div>

        </div>

        {/* User Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white text-xs font-bold">PP</div>
                <div className="text-xs">
                    <p className="font-bold text-gray-900 dark:text-white">Peter Parker</p>
                    <p className="text-green-600">Online</p>
                </div>
            </div>
            <Settings className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full bg-white dark:bg-slate-900 relative">
        
        {/* Header */}
        <header className="h-16 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between px-6 bg-white dark:bg-slate-900/95 backdrop-blur z-10">
          <div className="flex flex-col">
             <div className="flex items-center gap-2 text-gray-800 dark:text-white">
                <Hash className="w-5 h-5 text-gray-400" />
                <h1 className="text-lg font-bold capitalize">{activeChannel}</h1>
             </div>
             <p className="text-xs text-gray-500 pl-7">General discussion for SBIT-3K projects</p>
          </div>

          <div className="flex items-center gap-4">
             {/* New Video Call Button */}
             <div className="flex items-center gap-1 bg-gray-100 dark:bg-slate-800 p-1 rounded-lg">
                 <button className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-md text-gray-500 hover:text-violet-600 transition-all shadow-sm" title="Start Voice Call">
                    <Phone className="w-4 h-4" />
                 </button>
                 <div className="w-px h-4 bg-gray-300 dark:bg-slate-700"></div>
                 <button 
                    onClick={() => navigate('/video')} 
                    className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-md text-gray-500 hover:text-violet-600 transition-all shadow-sm"
                    title="Start Video Call"
                 >
                    <Video className="w-4 h-4" />
                 </button>
             </div>

             <div className="h-6 w-px bg-gray-200 dark:bg-slate-700"></div>

             <div className="flex items-center gap-3">
                 <div className="flex -space-x-2">
                    <img className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900" src="https://i.pravatar.cc/150?u=a" alt="" />
                    <img className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900" src="https://i.pravatar.cc/150?u=b" alt="" />
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 border-2 border-white dark:border-slate-900 flex items-center justify-center text-xs font-bold text-gray-500">+3</div>
                 </div>
                 <button className="text-gray-400 hover:text-gray-600"><Bell className="w-5 h-5" /></button>
             </div>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
           {/* Date Divider */}
           <div className="flex items-center justify-center relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100 dark:border-slate-800"></div></div>
              <div className="relative bg-white dark:bg-slate-900 px-4 text-xs font-medium text-gray-400 uppercase">Today, Nov 18</div>
           </div>

           {/* Message 1 */}
           <div className="flex gap-4 group">
              <div className="flex-shrink-0 mt-1">
                 <img className="w-10 h-10 rounded-lg" src="https://i.pravatar.cc/150?u=a" alt="Alex" />
              </div>
              <div className="flex-1">
                 <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">Alex Smith</span>
                    <span className="text-[10px] text-gray-400">12:30 PM</span>
                 </div>
                 <div className="text-sm text-gray-700 dark:text-slate-300 leading-relaxed bg-gray-50 dark:bg-slate-800/50 p-3 rounded-r-xl rounded-bl-xl inline-block max-w-[80%]">
                    Has anyone reviewed the latest design specs for the dashboard? I pushed the updates to Figma.
                 </div>
              </div>
           </div>

           {/* Message 2 (Self) */}
           <div className="flex gap-4 flex-row-reverse group">
              <div className="flex-shrink-0 mt-1">
                 <div className="w-10 h-10 rounded-lg bg-violet-600 flex items-center justify-center text-white font-bold">PP</div>
              </div>
              <div className="flex-1 text-right">
                 <div className="flex items-baseline gap-2 mb-1 justify-end">
                    <span className="text-[10px] text-gray-400">12:32 PM</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">Peter Parker</span>
                 </div>
                 <div className="text-sm text-white leading-relaxed bg-violet-600 p-3 rounded-l-xl rounded-br-xl inline-block max-w-[80%] text-left shadow-md shadow-violet-200 dark:shadow-none">
                    Yes! I left some comments on the layout. Looks great overall, just fixed some spacing issues. <span className="underline decoration-violet-300 cursor-pointer">@Alex Smith</span>
                 </div>
              </div>
           </div>

           {/* Message 3 */}
           <div className="flex gap-4 group">
              <div className="flex-shrink-0 mt-1">
                 <div className="w-10 h-10 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center font-bold">JD</div>
              </div>
              <div className="flex-1">
                 <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">Jane Doe</span>
                    <span className="text-[10px] text-gray-400">12:45 PM</span>
                 </div>
                 <div className="text-sm text-gray-700 dark:text-slate-300 leading-relaxed bg-gray-50 dark:bg-slate-800/50 p-3 rounded-r-xl rounded-bl-xl inline-block max-w-[80%]">
                    I'll check the Figma file after my meeting. Also, are we still on for the 2 PM sync?
                 </div>
                 {/* Reaction */}
                 <div className="flex mt-1">
                    <span className="bg-gray-100 dark:bg-slate-700 px-1.5 py-0.5 rounded-full text-xs cursor-pointer hover:bg-gray-200">👍 2</span>
                 </div>
              </div>
           </div>

        </div>

        {/* Input Area */}
        <div className="p-4 bg-white dark:bg-slate-900">
           <div className="border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800/50 focus-within:ring-2 focus-within:ring-violet-500/20 focus-within:border-violet-500 transition-all">
              <textarea
                 value={message}
                 onChange={(e) => setMessage(e.target.value)}
                 placeholder={`Message #${activeChannel}`}
                 className="w-full bg-transparent border-none focus:ring-0 p-3 min-h-[50px] max-h-[150px] resize-none text-sm text-gray-800 dark:text-white placeholder-gray-400"
                 rows={1}
              />
              <div className="flex items-center justify-between px-2 pb-2">
                 <div className="flex items-center gap-1">
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-full transition-colors"><Plus className="w-4 h-4" /></button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-full transition-colors"><Smile className="w-4 h-4" /></button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-full transition-colors"><Paperclip className="w-4 h-4" /></button>
                 </div>
                 <button className={`p-2 rounded-lg transition-all ${message.trim() ? 'bg-violet-600 text-white shadow-md' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                    <svg className="w-4 h-4 transform rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                 </button>
              </div>
           </div>
           <p className="text-center text-[10px] text-gray-400 mt-2">
              <strong>Tip:</strong> Press Enter to send, Shift + Enter for new line
           </p>
        </div>

      </div>
    </div>
  );
};

export default Workspace;