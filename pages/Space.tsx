import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, MessageCircle, Search, MoreVertical, ChevronLeft } from 'lucide-react';

interface Discussion {
  id: number;
  author: string;
  title: string;
  type: string;
  date: string;
  avatar: string;
  replies: number;
  attendees: number;
  files: number;
  description: string;
}

const Space: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('discussions');
  const [activeDiscussionTab, setActiveDiscussionTab] = useState('summary');
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);
  const [showDiscussionView, setShowDiscussionView] = useState(false);
  const [selectedSidebarSpace, setSelectedSidebarSpace] = useState('general');

  const discussions: Discussion[] = [
    {
      id: 1,
      author: 'Sarah Johnson',
      title: 'Q1 Planning Meeting - Action Items',
      type: 'Meeting',
      date: 'Today 2:30 PM',
      avatar: 'https://i.pravatar.cc/100?img=1',
      replies: 12,
      attendees: 5,
      files: 3,
      description: 'Discussed Q1 roadmap and assigned action items for product development. Team agreed on timeline and deliverables.'
    },
    {
      id: 2,
      author: 'Michael Chen',
      title: 'Design System Updates & Component Library',
      type: 'BREAKOUT ROOM: Design Team',
      date: 'Yesterday 4:15 PM',
      avatar: 'https://i.pravatar.cc/100?img=2',
      replies: 8,
      attendees: 3,
      files: 6,
      description: 'Breakout room discussion on design system improvements. Team shared new component designs and gathered feedback.'
    },
    {
      id: 3,
      author: 'Emma Davis',
      title: 'Best Practices for Code Review Process',
      type: 'Discussion',
      date: '2 days ago',
      avatar: 'https://i.pravatar.cc/100?img=3',
      replies: 15,
      attendees: 7,
      files: 2,
      description: 'Let\'s discuss and share best practices for our code review process. How can we improve turnaround time and feedback quality?'
    },
    {
      id: 4,
      author: 'Alex Rodriguez',
      title: 'How do we manage API versioning?',
      type: 'Question',
      date: '3 days ago',
      avatar: 'https://i.pravatar.cc/100?img=4',
      replies: 9,
      attendees: 4,
      files: 4,
      description: 'Question about best practices for API versioning in our microservices architecture. Looking for team\'s feedback and recommendations.'
    }
  ];

  const handleOpenDiscussion = (discussion: Discussion) => {
    setSelectedDiscussion(discussion);
    setShowDiscussionView(true);
    setActiveDiscussionTab('summary');
  };

  const handleBackToDiscussions = () => {
    setShowDiscussionView(false);
    setSelectedDiscussion(null);
  };

  const getBadgeColor = (type: string) => {
    if (type.includes('Meeting')) return 'bg-blue-100 text-blue-700';
    if (type.includes('BREAKOUT')) return 'bg-purple-100 text-purple-700';
    if (type.includes('Discussion')) return 'bg-green-100 text-green-700';
    if (type.includes('Question')) return 'bg-orange-100 text-orange-700';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="flex h-screen bg-white dark:bg-slate-900">
      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-sm">S</div>
              <span className="font-semibold text-gray-800 dark:text-white">SBIT-3K</span>
            </div>
            <button className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-2">
          <button
            onClick={() => navigate('/workspace')}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm">Back to Workspace</span>
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        {!showDiscussionView && (
          <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 p-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-500 text-lg">⭐</span>
                <span className="font-semibold text-gray-800 dark:text-white">#{selectedSidebarSpace}</span>
              </div>
              <p className="text-gray-500 dark:text-slate-400 text-sm">Community Guidelines: https://promtops.notion.site/Community-Guidelines</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600 dark:text-slate-300 text-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span>202</span>
              </div>
              <button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </header>
        )}

        {!showDiscussionView && (
          <>
            {/* Tabs */}
            <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-4 flex items-center space-x-6 overflow-x-auto flex-shrink-0">
              {['discussions', 'questions', 'polls', 'reports'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 px-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab
                      ? 'text-gray-800 dark:text-white border-gray-800 dark:border-white'
                      : 'text-gray-600 dark:text-slate-400 border-transparent hover:text-gray-800 dark:hover:text-white'
                  }`}
                >
                  {tab === 'discussions' && 'Discussions'}
                  {tab === 'questions' && 'Questions & Answers'}
                  {tab === 'polls' && 'Polls'}
                  {tab === 'reports' && 'Meeting Reports'}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-hidden bg-white dark:bg-slate-900">
          {!showDiscussionView ? (
            // Threads List View
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {discussions.map((discussion) => (
                <div
                  key={discussion.id}
                  className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4 hover:shadow-md dark:hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start space-x-3">
                    <img
                      src={discussion.avatar}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 flex-wrap">
                        <span className="font-semibold text-gray-800 dark:text-white">{discussion.author}</span>
                        <span className={`text-xs px-2 py-1 rounded font-medium ${getBadgeColor(discussion.type)}`}>
                          {discussion.type}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-slate-400">{discussion.date}</span>
                      </div>
                      <h3 className="text-sm font-semibold text-gray-700 dark:text-slate-200 mt-1">
                        {discussion.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-slate-400 mt-2 line-clamp-2">
                        {discussion.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-3 flex-wrap gap-2">
                        <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-slate-400">
                          <MessageCircle className="w-4 h-4" />
                          <span>{discussion.replies} replies</span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-slate-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span>{discussion.attendees} attendees</span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-slate-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                          </svg>
                          <span>{discussion.files} files</span>
                        </div>
                        <button
                          onClick={() => handleOpenDiscussion(discussion)}
                          className="ml-auto px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                          View Summary
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Discussion View
            selectedDiscussion && (
              <div className="flex flex-col h-full overflow-hidden">
                {/* Back Button */}
                <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 p-4 flex-shrink-0">
                  <button
                    onClick={handleBackToDiscussions}
                    className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    <span>Back to Discussions</span>
                  </button>
                </div>

                {/* Discussion Header */}
                <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 p-6 flex-shrink-0">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {selectedDiscussion.title}
                      </h2>
                      <div className="flex items-center space-x-3 mt-2 text-sm text-gray-600 dark:text-slate-400 flex-wrap gap-2">
                        <span className="font-medium">{selectedDiscussion.author}</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getBadgeColor(selectedDiscussion.type)}`}>
                          {selectedDiscussion.type}
                        </span>
                        <span>{selectedDiscussion.date}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Discussion Tabs */}
                <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-6 flex items-center space-x-6 overflow-x-auto flex-shrink-0">
                  {['summary', 'actions', 'transcript', 'chat', 'shared', 'attendance'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveDiscussionTab(tab)}
                      className={`py-3 px-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                        activeDiscussionTab === tab
                          ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400'
                          : 'text-gray-600 dark:text-slate-400 border-transparent hover:text-gray-800 dark:hover:text-white'
                      }`}
                    >
                      {tab === 'summary' && 'Meeting Summary'}
                      {tab === 'actions' && 'Action Items'}
                      {tab === 'transcript' && 'Transcript'}
                      {tab === 'chat' && 'Chat'}
                      {tab === 'shared' && 'Shared Files'}
                      {tab === 'attendance' && 'Attendance'}
                    </button>
                  ))}
                </div>

                {/* Discussion Content */}
                <div className="flex-1 overflow-y-auto bg-white dark:bg-slate-900">
                  {activeDiscussionTab === 'summary' && (
                    <div className="p-6 space-y-4">
                      <div className="flex items-start space-x-3 text-gray-700 dark:text-slate-300">
                        <svg className="w-5 h-5 text-gray-400 dark:text-slate-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <p className="text-sm">Meeting started and participants joined.</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700 mt-8">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {selectedDiscussion.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
                              Wednesday, November 12, 2025 9:15 PM - 9:22 PM
                            </p>
                          </div>
                          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium">
                            View recap
                          </button>
                        </div>
                        <div className="mt-6">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Content</h4>
                          <div className="flex items-start space-x-3 p-3 bg-white dark:bg-slate-700 rounded border border-gray-200 dark:border-slate-600">
                            <svg className="w-5 h-5 text-gray-400 dark:text-slate-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">Transcript</p>
                              <p className="text-xs text-gray-600 dark:text-slate-400 mt-1">6m 31s</p>
                              <p className="text-xs text-gray-500 dark:text-slate-500 mt-2">Expires in 105 days</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeDiscussionTab === 'actions' && (
                    <div className="p-6 space-y-3">
                      {[
                        { task: 'Finalize feature requirements document', assigned: 'Sarah Johnson', due: '2024-02-15' },
                        { task: 'Schedule follow-up with design team', assigned: 'Michael Chen', due: '2024-02-10' },
                        { task: 'Update project timeline in management tool', assigned: 'Emma Davis', due: '2024-02-12' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-slate-800 rounded border border-gray-200 dark:border-slate-700">
                          <input type="checkbox" className="w-4 h-4 rounded mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{item.task}</p>
                            <p className="text-xs text-gray-600 dark:text-slate-400 mt-1">
                              Assigned to: {item.assigned} • Due: {item.due}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeDiscussionTab === 'transcript' && (
                    <div className="p-6">
                      <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700 max-h-96 overflow-y-auto">
                        <div className="space-y-4 text-sm">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Sarah Johnson <span className="text-gray-600 dark:text-slate-400 font-normal">(00:15)</span></p>
                            <p className="text-gray-700 dark:text-slate-300 mt-1">Let's start by reviewing the Q1 roadmap and our key deliverables...</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Michael Chen <span className="text-gray-600 dark:text-slate-400 font-normal">(02:30)</span></p>
                            <p className="text-gray-700 dark:text-slate-300 mt-1">I think we should prioritize the API redesign first since it impacts all other features...</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeDiscussionTab === 'chat' && (
                    <div className="p-6 space-y-4">
                      {[
                        { author: 'Sarah Johnson', time: '10:30 AM', message: 'Great discussion! Let\'s finalize the timeline by EOW.', img: 1 },
                        { author: 'Michael Chen', time: '10:35 AM', message: 'I\'ll prepare the detailed breakdown for next meeting.', img: 2 }
                      ].map((msg, idx) => (
                        <div key={idx} className="flex space-x-3">
                          <img src={`https://i.pravatar.cc/100?img=${msg.img}`} alt="Avatar" className="w-8 h-8 rounded-full flex-shrink-0" />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{msg.author}</p>
                              <p className="text-xs text-gray-500 dark:text-slate-400">{msg.time}</p>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-slate-300 mt-1 bg-gray-50 dark:bg-slate-800 p-3 rounded border border-gray-200 dark:border-slate-700">
                              {msg.message}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeDiscussionTab === 'shared' && (
                    <div className="p-6 space-y-3">
                      {[
                        { name: 'Q1-Roadmap.pdf', size: '2.4 MB', icon: 'text-red-500' },
                        { name: 'Action-Items.xlsx', size: '1.8 MB', icon: 'text-green-500' }
                      ].map((file, idx) => (
                        <div key={idx} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-slate-800 rounded border border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer transition-colors">
                          <svg className={`w-5 h-5 flex-shrink-0 ${file.icon}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"></path>
                          </svg>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{file.name}</p>
                            <p className="text-xs text-gray-600 dark:text-slate-400">{file.size}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeDiscussionTab === 'attendance' && (
                    <div className="p-6">
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {[
                          { num: '5', label: 'Attendees' },
                          { num: '12', label: 'Replies' },
                          { num: '3', label: 'Files' }
                        ].map((stat, idx) => (
                          <div key={idx} className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded p-4">
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.num}</p>
                            <p className="text-xs text-gray-600 dark:text-slate-400 mt-1">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        {[
                          { name: 'Sarah Johnson', role: 'Organizer', img: 1 },
                          { name: 'Michael Chen', role: 'Presenter', img: 2 },
                          { name: 'Emma Davis', role: 'Attendee', img: 3 }
                        ].map((person, idx) => (
                          <div key={idx} className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-slate-800 rounded border border-gray-200 dark:border-slate-700">
                            <img src={`https://i.pravatar.cc/100?img=${person.img}`} alt="Avatar" className="w-6 h-6 rounded-full" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{person.name}</span>
                            <span className="text-xs text-gray-600 dark:text-slate-400 ml-auto">{person.role}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Space;
