import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, Calendar, Clock, 
  PlayCircle, FileText, Download, ChevronRight, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock Data
const historyData = [
  {
    id: 1,
    title: "Q4 Marketing Strategy Kickoff",
    date: "Oct 24, 2025",
    time: "10:00 AM - 11:30 AM",
    duration: "1h 30m",
    attendees: [
      { name: "Sarah", img: "https://i.pravatar.cc/150?u=1" },
      { name: "Mike", img: "https://i.pravatar.cc/150?u=2" },
      { name: "Anna", img: "https://i.pravatar.cc/150?u=3" },
    ],
    category: "Strategy",
    summarySnippet: "Defined core KPIs for Q4. Agreed to focus on social media expansion...",
    hasRecording: true,
    hasTranscript: true,
  },
  {
    id: 2,
    title: "Client Check-in: Alpha Corp",
    date: "Oct 22, 2025",
    time: "02:00 PM - 02:45 PM",
    duration: "45m",
    attendees: [
      { name: "John", img: "https://i.pravatar.cc/150?u=4" },
      { name: "Client", img: "https://i.pravatar.cc/150?u=5" },
    ],
    category: "Client",
    summarySnippet: "Client requested changes to the homepage layout. Deadline extended by 2 days.",
    hasRecording: true,
    hasTranscript: true,
  },
  {
    id: 3,
    title: "Weekly Design Sync",
    date: "Oct 20, 2025",
    time: "09:00 AM - 09:30 AM",
    duration: "30m",
    attendees: [
      { name: "Peter", img: "https://i.pravatar.cc/150?u=peter" },
      { name: "Sarah", img: "https://i.pravatar.cc/150?u=1" },
    ],
    category: "Team Sync",
    summarySnippet: "Reviewed new icon set. Approved distinct color palette for dark mode.",
    hasRecording: false, 
    hasTranscript: true,
  }
];

const MeetingHistory: React.FC = () => {
  const navigate = useNavigate();
  
  // --- STATE ---
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter Visibility State
  const [showDateFilter, setShowDateFilter] = useState(false);

  // Filter Values State
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Refs for closing dropdowns when clicking outside
  const dateMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dateMenuRef.current && !dateMenuRef.current.contains(event.target as Node)) {
        setShowDateFilter(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- FILTERING LOGIC ---
  const filteredHistory = historyData.filter(meeting => {
    // 1. Search Term (Checks Title AND Category text)
    const matchesSearch = 
      meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.category.toLowerCase().includes(searchTerm.toLowerCase());

    // 2. Date Range Filter
    let matchesDate = true;
    if (startDate || endDate) {
      const meetingDate = new Date(meeting.date);
      if (startDate) {
        matchesDate = matchesDate && meetingDate >= new Date(startDate);
      }
      if (endDate) {
        matchesDate = matchesDate && meetingDate <= new Date(endDate);
      }
    }

    return matchesSearch && matchesDate;
  });

  // Clear functions
  const clearDateFilter = () => { setStartDate(''); setEndDate(''); setShowDateFilter(false); };

  return (
    <div className="p-6 md:p-8 bg-gray-50 dark:bg-slate-900 h-full overflow-y-auto min-h-screen">
      
      {/* Page Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Meeting History</h2>
        <p className="text-gray-500 dark:text-slate-400 mt-1">
          Archive of your past sessions, recordings, and generated insights.
        </p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-violet-100 dark:bg-violet-900/30 rounded-lg text-violet-600 dark:text-violet-400">
                <Clock className="w-6 h-6" />
            </div>
            <div>
                <p className="text-xs text-gray-500 dark:text-slate-400 uppercase font-semibold">Total Time</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">12h 45m</p>
            </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                <Calendar className="w-6 h-6" />
            </div>
            <div>
                <p className="text-xs text-gray-500 dark:text-slate-400 uppercase font-semibold">Meetings Held</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{historyData.length}</p>
            </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                <FileText className="w-6 h-6" />
            </div>
            <div>
                <p className="text-xs text-gray-500 dark:text-slate-400 uppercase font-semibold">Transcripts</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{historyData.filter(m => m.hasTranscript).length}</p>
            </div>
        </div>
      </div>

      {/* Toolbar / Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 relative z-20">
        
        {/* Search Bar */}
        <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input 
                type="text" 
                placeholder="Search by title, team, or keyword..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-white transition-all"
            />
        </div>

        <div className="flex gap-2 relative">
            
            {/* --- DATE RANGE FILTER --- */}
            <div className="relative" ref={dateMenuRef}>
                <button 
                  onClick={() => setShowDateFilter(!showDateFilter)}
                  className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm transition-colors ${
                    (startDate || endDate) 
                    ? 'bg-violet-50 border-violet-200 text-violet-700 dark:bg-violet-900/20 dark:border-violet-700 dark:text-violet-300' 
                    : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                  }`}
                >
                    <Calendar className="w-4 h-4" />
                    <span>{(startDate || endDate) ? 'Date Applied' : 'Date Range'}</span>
                </button>

                {/* Date Dropdown */}
                {showDateFilter && (
                    <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-200 dark:border-slate-700 p-4 z-50">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Filter by Date</h4>
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs text-gray-500 dark:text-slate-400 block mb-1">Start Date</label>
                                <input 
                                    type="date" 
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full p-2 text-sm border border-gray-200 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 dark:text-slate-400 block mb-1">End Date</label>
                                <input 
                                    type="date" 
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full p-2 text-sm border border-gray-200 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 dark:text-white"
                                />
                            </div>
                            <div className="flex justify-between pt-2">
                                <button onClick={clearDateFilter} className="text-xs text-gray-500 hover:text-gray-700 dark:text-slate-400">Clear</button>
                                <button onClick={() => setShowDateFilter(false)} className="px-3 py-1 bg-violet-600 text-white text-xs rounded-md hover:bg-violet-700">Apply</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
      </div>

      {/* Active Filters Display */}
      {(startDate || endDate) && (
        <div className="flex gap-2 mb-4 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                Date: {startDate || '...'} to {endDate || '...'} <X className="w-3 h-3 cursor-pointer" onClick={clearDateFilter} />
            </span>
        </div>
      )}

      {/* History List */}
      <div className="space-y-4">
        {filteredHistory.length > 0 ? (
            filteredHistory.map((meeting) => (
                <div 
                    key={meeting.id}
                    className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 hover:shadow-md transition-all group"
                >
                    <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
                        
                        {/* Left: Date & Info */}
                        <div className="flex items-start gap-4">
                            {/* Date Badge */}
                            <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-700 rounded-lg p-3 min-w-[70px] border border-gray-100 dark:border-slate-600">
                                <span className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase">{meeting.date.split(' ')[0]}</span>
                                <span className="text-xl font-bold text-gray-800 dark:text-white">{meeting.date.split(' ')[1].replace(',', '')}</span>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-violet-600 transition-colors cursor-pointer" onClick={() => navigate(`/meeting-summary/${meeting.id}`)}>
                                    {meeting.title}
                                </h3>
                                
                                <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-slate-400">
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {meeting.time}</span>
                                    <span>•</span>
                                    <span>{meeting.duration}</span>
                                    <span>•</span>
                                    <span className="bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300 px-2 py-0.5 rounded-full font-medium">
                                        {meeting.category}
                                    </span>
                                </div>

                                <p className="mt-2 text-sm text-gray-600 dark:text-slate-300 line-clamp-1">
                                    <span className="font-semibold">Summary:</span> {meeting.summarySnippet}
                                </p>
                            </div>
                        </div>

                        {/* Right: Attendees & Actions */}
                        <div className="flex flex-row sm:flex-col lg:flex-row items-center gap-4 lg:gap-8 border-t lg:border-t-0 border-gray-100 dark:border-slate-700 pt-4 lg:pt-0">
                            {/* Attendees Stack */}
                            <div className="flex -space-x-2">
                                {meeting.attendees.map((att, i) => (
                                    <img 
                                        key={i} 
                                        src={att.img} 
                                        alt={att.name} 
                                        className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800" 
                                        title={att.name}
                                    />
                                ))}
                                {meeting.attendees.length > 3 && (
                                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 border-2 border-white dark:border-slate-800 flex items-center justify-center text-[10px] font-bold text-gray-500">
                                        +2
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2">
                                {meeting.hasRecording && (
                                    <button className="p-2 text-gray-500 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-slate-700 rounded-full transition-colors" title="Play Recording">
                                        <PlayCircle className="w-5 h-5" />
                                    </button>
                                )}
                                {meeting.hasTranscript && (
                                    <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-full transition-colors" title="View Transcript">
                                        <FileText className="w-5 h-5" />
                                    </button>
                                )}
                                <button className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors">
                                    <Download className="w-5 h-5" />
                                </button>
                                <div className="w-px h-6 bg-gray-200 dark:bg-slate-700 mx-1"></div>
                                <button 
                                    onClick={() => navigate(`/meeting-summary/${meeting.id}`)}
                                    className="px-3 py-1.5 text-sm font-medium text-violet-600 hover:bg-violet-50 dark:text-violet-400 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1"
                                >
                                    Details <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            ))
        ) : (
            <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 border-dashed">
                <p className="text-gray-500 dark:text-slate-400">No meetings found matching your filters.</p>
                <button 
                    onClick={() => { clearDateFilter(); setSearchTerm(''); }}
                    className="mt-2 text-violet-600 hover:underline text-sm font-medium"
                >
                    Clear all filters
                </button>
            </div>
        )}
      </div>

    </div>
  );
};

export default MeetingHistory;