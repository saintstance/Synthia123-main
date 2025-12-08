import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';

// --- COMPONENTS ---
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// --- PAGES ---
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Meetings from './pages/Meetings';
import Tasks from './pages/Tasks';
import Collaboration from './pages/Collaboration';
import Workspace from './pages/Workspace';
import MeetingRoom from './pages/MeetingRoom';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import Recording from './pages/Recording'; 
import MeetingSummaryDetail from './pages/MeetingSummaryDetail';
import Space from './pages/Space';
import Video from './pages/Video';
import MeetingSummary from './pages/Meeting-Summary'; 
import MeetingHistory from './pages/MeetingHistory';

// --- LAYOUT WRAPPER ---
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  // Define paths that require a Full Screen layout (No Sidebar/Header)
  const isMeetingRoom = location.pathname === '/meeting-room';
  const isVideo = location.pathname === '/video';
  const isRecording = location.pathname === '/recording'; 
  
  // Workspaces and Spaces usually have their own internal navigation
  const isWorkspace = location.pathname.startsWith('/workspace');
  const isSpace = location.pathname.startsWith('/space');

  // If on a full-screen page, render children directly without the main layout
  if (isMeetingRoom || isVideo || isRecording || isWorkspace || isSpace) {
    return <>{children}</>;
  }

  // Otherwise, render the Main Dashboard Layout
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header title={getPageTitle(location.pathname)} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

// --- TITLE HELPER ---
const getPageTitle = (path: string): string => {
  if (path.startsWith('/meeting-summary/')) return 'Meeting Details';
  
  switch (path) {
    case '/': return 'Dashboard';
    case '/calendar': return 'Calendar';
    case '/meetings': return 'Meetings';
    case '/meeting-summary': return 'Meeting Summary';
    case '/meeting-history': return 'Meeting History';
    case '/tasks': return 'Tasks';
    case '/collaboration': return 'Collaboration';
    case '/notifications': return 'Notifications';
    case '/profile': return 'Profile';
    case '/recording': return 'Recording';
    default: return 'Synthia';
  }
};

// --- MAIN APP COMPONENT ---
const App: React.FC = () => {
  // Initialize dark mode based on system preference or local storage
  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <HashRouter>
      <Layout>
        <Routes>
          {/* Main Dashboard Pages */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/meetings" element={<Meetings />} />
          
          {/* Meeting Summary Flow */}
          <Route path="/meeting-summary" element={<MeetingSummary />} />
          <Route path="/meeting-summary/:id" element={<MeetingSummaryDetail />} />
          <Route path="/meeting-history" element={<MeetingHistory />} />
          
          {/* Productivity Pages */}
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/collaboration" element={<Collaboration />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* Full Screen / Feature Pages */}
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/space" element={<Space />} />
          <Route path="/video" element={<Video />} />
          <Route path="/meeting-room" element={<MeetingRoom />} />
          <Route path="/recording" element={<Recording />} />
          
          {/* 404 Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;