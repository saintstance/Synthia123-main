import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, MessageSquare, Hash, Users, X, 
  Search, Bell, MoreHorizontal, Clock, ArrowRight,
  Check, Shield
} from 'lucide-react';

// Mock Data for UI visualization
const mockTeams = [
  {
    id: 1,
    name: "SBIT-3K SIA101",
    description: "Capstone project development team.",
    members: [
      "https://i.pravatar.cc/150?u=1",
      "https://i.pravatar.cc/150?u=2",
      "https://i.pravatar.cc/150?u=3"
    ],
    totalMembers: 8,
    role: "Admin",
    lastActive: "2 hours ago",
    category: "Academic"
  },
  {
    id: 2,
    name: "Synthia Core Devs",
    description: "Main repository maintenance.",
    members: [
      "https://i.pravatar.cc/150?u=4",
      "https://i.pravatar.cc/150?u=5",
      "https://i.pravatar.cc/150?u=6",
      "https://i.pravatar.cc/150?u=7"
    ],
    totalMembers: 12,
    role: "Member",
    lastActive: "5 mins ago",
    category: "Development"
  },
  {
    id: 3,
    name: "Marketing & QA",
    description: "Weekly syncs and quality testing.",
    members: [
      "https://i.pravatar.cc/150?u=8",
      "https://i.pravatar.cc/150?u=9"
    ],
    totalMembers: 5,
    role: "Member",
    lastActive: "1 day ago",
    category: "General"
  }
];

const mockInvites = [
  { id: 1, team: "Design System Team", inviter: "Sarah Chen" }
];

const Collaboration: React.FC = () => {
  const navigate = useNavigate();
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [showJoinLinkDialog, setShowJoinLinkDialog] = useState(false);
  const [showJoinCodeDialog, setShowJoinCodeDialog] = useState(false);
  const [showCreateTeamDialog, setShowCreateTeamDialog] = useState(false);
  
  // Input States
  const [inviteLink, setInviteLink] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [teamLogo, setTeamLogo] = useState<File | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter teams based on search
  const filteredTeams = mockTeams.filter(team => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 bg-gray-50 dark:bg-slate-900 h-full overflow-y-auto">
      
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Collaboration</h1>
            <p className="text-gray-500 dark:text-slate-400 mt-1">Manage your teams, projects, and pending invitations.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search teams..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-white"
                />
            </div>
            <button 
                onClick={() => setShowJoinDialog(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700 transition-colors shadow-md shadow-violet-200 dark:shadow-none whitespace-nowrap"
            >
                <Plus className="w-5 h-5" />
                <span>New Team</span>
            </button>
        </div>
      </div>

      {/* Pending Invites Section (Only shows if there are invites) */}
      {mockInvites.length > 0 && (
        <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Bell className="w-4 h-4" /> Pending Invitations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockInvites.map(invite => (
                    <div key={invite.id} className="bg-white dark:bg-slate-800 border border-violet-200 dark:border-violet-900/50 p-4 rounded-xl flex items-center justify-between shadow-sm relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-violet-500"></div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{invite.team}</h3>
                            <p className="text-sm text-gray-500 dark:text-slate-400">Invited by <span className="text-violet-600 font-medium">{invite.inviter}</span></p>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors">Decline</button>
                            <button className="px-3 py-1.5 text-sm font-medium bg-violet-600 text-white hover:bg-violet-700 rounded-lg transition-colors flex items-center gap-1">
                                <Check className="w-4 h-4" /> Accept
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}

      {/* Teams Grid */}
      <h2 className="text-sm font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <MessageSquare className="w-4 h-4" /> Your Teams
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Create New Card (Moved to start for better visibility) */}
        <button 
            onClick={() => { setShowJoinDialog(false); setShowCreateTeamDialog(true); }}
            className="group border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-violet-500 hover:bg-violet-50 dark:hover:bg-slate-800/50 transition-all min-h-[220px]"
        >
            <div className="w-12 h-12 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-3 group-hover:bg-violet-100 group-hover:text-violet-600 transition-colors">
                <Plus className="w-6 h-6 text-gray-400 group-hover:text-violet-600" />
            </div>
            <p className="font-bold text-gray-800 dark:text-white mb-1">Create a Workspace</p>
            <p className="text-xs text-gray-500 dark:text-slate-400">Start a new project with your team</p>
        </button>

        {/* Mapped Team Cards */}
        {filteredTeams.map((team) => (
            <div 
                key={team.id}
                onClick={() => navigate('/workspace')}
                className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-5 hover:shadow-lg transition-all cursor-pointer group relative flex flex-col justify-between min-h-[220px]"
            >
                {/* Header */}
                <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-3 items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
                            {team.name.charAt(0)}
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-violet-600 transition-colors">{team.name}</h3>
                            <span className="text-xs font-medium bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 px-2 py-0.5 rounded-full">
                                {team.category}
                            </span>
                        </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 dark:text-slate-400 mb-4 line-clamp-2">
                    {team.description}
                </p>

                {/* Footer Info */}
                <div className="mt-auto">
                    <div className="flex items-center justify-between border-t border-gray-100 dark:border-slate-700 pt-4">
                        
                        {/* Avatar Pile */}
                        <div className="flex -space-x-2 overflow-hidden">
                            {team.members.map((src, i) => (
                                <img key={i} className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-800" src={src} alt="member" />
                            ))}
                            <div className="flex items-center justify-center h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-800 bg-gray-100 dark:bg-slate-700 text-[10px] font-bold text-gray-500">
                                +{team.totalMembers - team.members.length}
                            </div>
                        </div>

                        {/* Last Active / Role */}
                        <div className="text-right">
                            <p className="text-[10px] text-gray-400 flex items-center justify-end gap-1">
                                <Clock className="w-3 h-3" /> {team.lastActive}
                            </p>
                            {team.role === 'Admin' && (
                                <span className="text-[10px] font-bold text-violet-600 flex items-center justify-end gap-1 mt-0.5">
                                    <Shield className="w-3 h-3" /> Admin
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        ))}
      </div>

      {/* --- MODALS (Kept Functional but styled) --- */}

      {/* Main Join or Create Dialog */}
      {showJoinDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-md w-full overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Start Collaborating</h2>
              <button
                onClick={() => setShowJoinDialog(false)}
                className="text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-3">
              {/* Option 1: Create */}
              <button
                onClick={() => {
                  setShowJoinDialog(false);
                  setShowCreateTeamDialog(true);
                }}
                className="w-full p-4 border border-gray-200 dark:border-slate-600 rounded-xl flex items-center gap-4 hover:border-violet-500 hover:bg-violet-50 dark:hover:bg-violet-900/20 dark:hover:border-violet-500 transition-all group text-left"
              >
                <div className="p-3 bg-violet-100 dark:bg-violet-900/50 rounded-lg text-violet-600 dark:text-violet-400 group-hover:scale-110 transition-transform">
                    <Plus className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Create a new team</h3>
                    <p className="text-sm text-gray-500 dark:text-slate-400">Set up a workspace for your project.</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-violet-500 ml-auto" />
              </button>

              {/* Option 2: Join via Link */}
              <button
                onClick={() => {
                  setShowJoinDialog(false);
                  setShowJoinLinkDialog(true);
                }}
                className="w-full p-4 border border-gray-200 dark:border-slate-600 rounded-xl flex items-center gap-4 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 dark:hover:border-blue-500 transition-all group text-left"
              >
                <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Join via Invite Link</h3>
                    <p className="text-sm text-gray-500 dark:text-slate-400">Have a link? Paste it to join instantly.</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 ml-auto" />
              </button>

              {/* Option 3: Join via Code */}
              <button
                onClick={() => {
                  setShowJoinDialog(false);
                  setShowJoinCodeDialog(true);
                }}
                className="w-full p-4 border border-gray-200 dark:border-slate-600 rounded-xl flex items-center gap-4 hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20 dark:hover:border-pink-500 transition-all group text-left"
              >
                <div className="p-3 bg-pink-100 dark:bg-pink-900/50 rounded-lg text-pink-600 dark:text-pink-400 group-hover:scale-110 transition-transform">
                    <Hash className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Join via Code</h3>
                    <p className="text-sm text-gray-500 dark:text-slate-400">Enter a 6-digit code from your admin.</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-pink-500 ml-auto" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Join Team via Link Dialog */}
      {showJoinLinkDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Join Team via Link</h2>
              <button
                onClick={() => setShowJoinLinkDialog(false)}
                className="text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 dark:text-white">Invite Link</label>
                <input
                  type="text"
                  placeholder="https://synthia.app/invite/..."
                  value={inviteLink}
                  onChange={(e) => setInviteLink(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-slate-700">
                <button
                  onClick={() => setShowJoinLinkDialog(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    setShowJoinLinkDialog(false);
                    setInviteLink('');
                  }}
                  className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
                >
                  Join Team
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Join Team via Code Dialog */}
      {showJoinCodeDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Join Team via Code</h2>
              <button
                onClick={() => setShowJoinCodeDialog(false)}
                className="text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 dark:text-white">Invite Code</label>
                <input
                  type="text"
                  placeholder="e.g. 883-992"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 text-center tracking-widest text-lg font-mono"
                />
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-slate-700">
                <button
                  onClick={() => setShowJoinCodeDialog(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    setShowJoinCodeDialog(false);
                    setInviteCode('');
                  }}
                  className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
                >
                  Join Team
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Team Dialog */}
      {showCreateTeamDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Create New Team</h2>
              <button
                onClick={() => setShowCreateTeamDialog(false)}
                className="text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Team Logo */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 dark:text-white">Team Logo</label>
                <div className="flex gap-4">
                  <div className="w-24 h-24 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-50 dark:bg-slate-700/50">
                    <Users className="w-8 h-8 text-gray-400 dark:text-slate-500" />
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={(e) => setTeamLogo(e.target.files?.[0] || null)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white cursor-pointer text-sm"
                    />
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">
                      Upload a logo (PNG, JPG, or WEBP). Max 2MB.
                    </p>
                  </div>
                </div>
              </div>

              {/* Team Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 dark:text-white">Team Name</label>
                <input
                  type="text"
                  placeholder="e.g. Q4 Marketing Sprint"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              {/* Team Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 dark:text-white">Team Description</label>
                <textarea
                  placeholder="Describe your team's purpose..."
                  value={teamDescription}
                  onChange={(e) => setTeamDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 min-h-[100px]"
                />
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-slate-700">
                <button
                  onClick={() => setShowCreateTeamDialog(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowCreateTeamDialog(false);
                    setTeamName('');
                    setTeamDescription('');
                    setTeamLogo(null);
                  }}
                  className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors shadow-lg shadow-violet-200 dark:shadow-none"
                >
                  Create Team
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collaboration;