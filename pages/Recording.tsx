import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Mic, Pause, Square, 
  FileText, AudioLines 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Transcript {
  id: string;
  user: string;
  avatar: string;
  time: string;
  text: string;
}

const Recording: React.FC = () => {
  const navigate = useNavigate();
  const [duration, setDuration] = useState(134); // 00:02:14 in seconds
  const [isPaused, setIsPaused] = useState(false);

  // Format seconds into HH:MM:SS
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Simple timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isPaused) {
      interval = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused]);

  // Mock Transcription Data
  const transcripts: Transcript[] = [
    {
      id: '1',
      user: 'Peter Parker',
      avatar: 'https://i.pravatar.cc/150?u=peter',
      time: '10:00 AM',
      text: 'Alright, let\'s get started. Thanks everyone for joining. Today we need to finalize the Q4 roadmap.'
    },
    {
      id: '2',
      user: 'Sarah Chen',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
      time: '10:01 AM',
      text: 'I have the user research data ready to present. It strongly suggests we focus on mobile improvements first.'
    },
    {
      id: '3',
      user: 'Mike Ross',
      avatar: 'https://i.pravatar.cc/150?u=mike',
      time: '10:02 AM',
      text: 'That aligns with the tech team\'s capacity as well. We\'ve cleared the backlog.'
    }
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-slate-900 p-6 md:p-8">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)} // Go back
            className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-full transition-colors text-gray-600 dark:text-gray-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Recording Meeting</h2>
        </div>
        
        {/* Timer Badge */}
        <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-full">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-red-600 dark:text-red-400 font-mono">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)]">
        
        {/* Left Panel: Recording Status */}
        <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col items-center justify-center relative overflow-hidden p-8">
            
            {/* Visualizer Circles (Decorative Background) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                <div className="w-64 h-64 border border-violet-200 dark:border-violet-900 rounded-full animate-[ping_3s_ease-in-out_infinite]" />
                <div className="w-96 h-96 border border-violet-100 dark:border-violet-900/50 rounded-full absolute animate-[ping_4s_ease-in-out_infinite]" />
            </div>

            {/* Central Mic Visual */}
            <div className="relative z-10 text-center">
                <div className="w-24 h-24 bg-gradient-to-tr from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center shadow-lg shadow-violet-200 dark:shadow-violet-900/50 mx-auto mb-6">
                    <Mic className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Weekly Design Sync</h3>
                <p className="text-gray-500 dark:text-slate-400 font-medium animate-pulse">Recording in progress...</p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6 mt-12 z-10">
                <button 
                  onClick={() => setIsPaused(!isPaused)}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-white shadow-sm hover:bg-gray-50 dark:hover:bg-slate-600 transition-all"
                  title={isPaused ? "Resume" : "Pause"}
                >
                    {isPaused ? <Mic className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                </button>

                <button 
                  onClick={() => navigate('/meeting-history')} // End meeting -> Go to history
                  className="w-16 h-16 flex items-center justify-center rounded-full bg-red-500 text-white shadow-lg shadow-red-200 dark:shadow-none hover:bg-red-600 hover:scale-105 transition-all"
                  title="Stop Recording"
                >
                    <Square className="w-6 h-6 fill-current" />
                </button>

                <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-white shadow-sm hover:bg-gray-50 dark:hover:bg-slate-600 transition-all">
                    <AudioLines className="w-5 h-5" />
                </button>
            </div>
        </div>

        {/* Right Panel: Transcription */}
        <div className="w-full lg:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col h-full">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
                <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm">Live Transcription</span>
                </div>
                <span className="text-[10px] font-bold text-gray-400 tracking-wider">AUTO-SCROLLING</span>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {transcripts.map((t) => (
                    <div key={t.id} className="flex gap-3 items-start group">
                        <img 
                            src={t.avatar} 
                            alt={t.user} 
                            className="w-8 h-8 rounded-full flex-shrink-0 border border-gray-100 dark:border-slate-600" 
                        />
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold text-gray-900 dark:text-white">{t.user}</span>
                                <span className="text-[10px] text-gray-400">{t.time}</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                                {t.text}
                            </p>
                        </div>
                    </div>
                ))}
                
                {/* Typing Indicator */}
                <div className="flex gap-3 items-start opacity-50">
                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-gray-500">MR</div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-gray-900 dark:text-white">Mike Ross</span>
                            <span className="text-[10px] text-gray-400">10:02 AM</span>
                        </div>
                        <div className="flex gap-1 items-center h-5">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Recording;