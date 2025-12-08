export interface MeetingFile {
  id: number;
  name: string;
  subtext: string;
  modified: string;
  owner: string;
  activity: string;
  isShared: boolean;
  isFavorite: boolean;
  activityIcon: boolean;
  workspace: string;
}

export const initialFiles: MeetingFile[] = [
  { 
    id: 1, 
    name: 'Capstone Project Proposal Defense', 
    subtext: "Meeting Summary • 45m duration", 
    modified: '10m ago', 
    owner: 'Klariz Habla', 
    activity: 'You recently opened this', 
    isShared: true,
    isFavorite: false,
    activityIcon: true,
    workspace: 'Capstone 101'
  },
  { 
    id: 2, 
    name: 'SIA 101 - Requirements Analysis', 
    subtext: "Transcript & Action Items", 
    modified: '2h ago', 
    owner: 'Klariz Habla', 
    activity: 'You edited this file', 
    isShared: true,
    isFavorite: true,
    activityIcon: true,
    workspace: 'Capstone 101'
  },
  { 
    id: 3, 
    name: 'UI/UX Design Review - Sprint 4', 
    subtext: "Recording & Notes", 
    modified: 'Yesterday', 
    owner: 'Peter Parker', 
    activity: 'Shared with team', 
    isShared: true,
    isFavorite: false,
    activityIcon: true,
    workspace: 'Internal Tools'
  },
  { 
    id: 4, 
    name: 'Database Schema Finalization', 
    subtext: "Technical Documentation", 
    modified: 'Nov 15, 2025', 
    owner: 'Klariz Habla', 
    activity: '', 
    isShared: false,
    isFavorite: false,
    activityIcon: false,
    workspace: 'Capstone 101'
  },
  { 
    id: 5, 
    name: 'Weekly Team Sync', 
    subtext: "Meeting Recap", 
    modified: 'Nov 10, 2025', 
    owner: 'Sarah Chen', 
    activity: '', 
    isShared: true,
    isFavorite: true,
    activityIcon: false,
    workspace: 'Internal Tools'
  },
  { 
    id: 6, 
    name: 'Client Kickoff - Project Alpha', 
    subtext: "Presentation & Feedback", 
    modified: 'Oct 28, 2025', 
    owner: 'Klariz Habla', 
    activity: '', 
    isShared: true,
    isFavorite: false,
    activityIcon: false,
    workspace: 'Client Projects'
  },
];