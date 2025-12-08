import React, { useState, useEffect } from "react";
import { 
  User, Briefcase, Calendar as CalendarIcon, ChevronRight, 
  Filter, CheckCircle, Plus, Menu, MoreHorizontal, X, 
  Flag, Bot, Shield, Trash2, Edit2, Check, ChevronDown
} from "lucide-react";

// --- Types ---
interface Assignee {
  name: string;
  avatar: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  category: "personal" | "workspace";
  status: "pending_approval" | "todo" | "ongoing" | "completed";
  project: string;
  priority: "High" | "Medium" | "Low" | "None"; 
  overdue?: boolean; 
  isAiGenerated?: boolean;
  assignees: Assignee[];
}

// --- Sub-Components ---

interface TaskItemProps {
  task: Task;
  onClick: (task: Task) => void;
}

const BoardTaskCard: React.FC<TaskItemProps> = ({ task, onClick }) => (
  <div onClick={() => onClick(task)} className={`bg-white dark:bg-slate-800 border ${task.isAiGenerated ? 'border-violet-300 dark:border-violet-700 ring-1 ring-violet-100 dark:ring-violet-900' : 'border-gray-200 dark:border-slate-700'} rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer group relative flex flex-col gap-3`}>
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold px-2 py-1 rounded bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-gray-300 uppercase tracking-wider">{task.project}</span>
          {task.isAiGenerated && (
              <span className="flex items-center gap-1 text-[10px] font-bold bg-violet-100 text-violet-600 px-2 py-1 rounded-full border border-violet-200">
                  <Bot className="w-3 h-3" /> AI
              </span>
          )}
      </div>
      {task.status === 'pending_approval' ? (
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
          </span>
      ) : (
          <MoreHorizontal className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </div>
    
    <div>
        <h3 className="font-bold text-gray-800 dark:text-white leading-tight mb-1">{task.title}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{task.description}</p>
    </div>

    <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-slate-700 mt-auto">
       <div className="flex items-center gap-2">
           <div className="flex -space-x-1.5">
               {task.assignees.map((u, i) => (
                   <img key={i} src={u.avatar} alt={u.name} className="w-5 h-5 rounded-full border border-white dark:border-slate-800" title={u.name} />
               ))}
           </div>
           {task.assignees.length === 0 && <span className="text-[10px] text-gray-400 italic">Unassigned</span>}
       </div>
       
       <div className="flex items-center gap-2">
          {/* Priority Flag for Board Card */}
          <Flag className={`w-3 h-3 ${
              task.priority === 'High' ? 'text-red-600 fill-red-600' : 
              task.priority === 'Medium' ? 'text-orange-500 fill-orange-500' : 
              task.priority === 'Low' ? 'text-blue-600 fill-blue-600' : 'text-gray-300'
          }`} />
          <span className={`text-xs flex items-center gap-1 font-medium ${task.overdue ? 'text-red-500' : 'text-gray-400'}`}>
              <CalendarIcon className="w-3 h-3" /> {task.dueDate}
          </span>
       </div>
    </div>
  </div>
);

const ListTaskItem: React.FC<TaskItemProps> = ({ task, onClick }) => (
  <div onClick={() => onClick(task)} className={`flex items-center gap-4 p-4 bg-white dark:bg-slate-800 border-b ${task.status === 'pending_approval' ? 'border-orange-100 bg-orange-50/10' : 'border-gray-100 dark:border-slate-700'} last:border-0 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer group`}>
    <div className="pt-0.5">
        {task.status === 'pending_approval' ? (
            <Bot className="w-5 h-5 text-violet-500" />
        ) : (
            <input type="checkbox" aria-label="Mark as complete" className="rounded border-gray-300 text-violet-600 focus:ring-violet-500 h-4 w-4 cursor-pointer" />
        )}
    </div>
    
    <div className="flex-1 min-w-0 grid grid-cols-12 gap-4 items-center">
        <div className="col-span-5">
            <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 dark:text-white text-sm truncate">{task.title}</span>
                {task.isAiGenerated && <span className="text-[10px] px-1.5 py-0.5 rounded bg-violet-100 text-violet-600 font-bold">AI</span>}
                {task.status === 'pending_approval' && <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-100 text-orange-600 font-bold">Review</span>}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{task.description}</p>
        </div>

        <div className="col-span-3 flex items-center gap-1">
             <div className="flex -space-x-2">
               {task.assignees.map((u, i) => (
                   <img key={i} src={u.avatar} alt={u.name} className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-800" title={u.name} />
               ))}
             </div>
             {task.assignees.length === 0 && <span className="text-xs text-gray-400">--</span>}
        </div>

        <div className="col-span-2 text-xs text-gray-500 flex items-center gap-1">
            <Flag className={`w-3 h-3 ${
                task.priority === 'High' ? 'text-red-600 fill-red-600' : 
                task.priority === 'Medium' ? 'text-orange-500 fill-orange-500' : 
                task.priority === 'Low' ? 'text-blue-600 fill-blue-600' : 'text-gray-400'
            }`} />
            <span>{task.priority}</span>
        </div>

        <div className="col-span-2 text-right">
             <span className={`text-xs font-medium ${task.overdue ? 'text-red-500' : 'text-gray-500'}`}>{task.dueDate}</span>
        </div>
    </div>
  </div>
);

// --- MAIN COMPONENT ---

const Tasks = () => {
  const [activeView, setActiveView] = useState<"personal" | "workspace">("workspace");
  const [activeTab, setActiveTab] = useState<"board" | "list">("list");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sidebarView, setSidebarView] = useState<"categories" | "today" | "upcoming" | "filters" | "completed">("categories");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [showLeftSidebar, setShowLeftSidebar] = useState(false);

  useEffect(() => {
    if (selectedTask || showCreateTaskModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedTask, showCreateTaskModal]);

  const tasks: Task[] = [
    { 
        id: "1", title: "Wireframe Homepage", description: "Plan the homepage layout.", dueDate: "Yesterday", category: "personal", status: "todo", project: "Capstone 101", priority: "High", overdue: true, 
        assignees: [{ name: "Peter Parker", avatar: "https://i.pravatar.cc/150?u=peter" }] 
    },
    { 
        id: "2", title: "High-Fidelity Homepage Design", description: "Create high-fi designs.", dueDate: "Yesterday", category: "personal", status: "todo", project: "Capstone 101", priority: "Medium", overdue: true, 
        assignees: [{ name: "Peter Parker", avatar: "https://i.pravatar.cc/150?u=peter" }] 
    },
    { 
        id: "5", title: "API Integration", description: "Connect frontend to backend.", dueDate: "Tomorrow", category: "workspace", status: "todo", project: "Internal Tools", priority: "High", 
        assignees: [
            { name: "Sarah Chen", avatar: "https://i.pravatar.cc/150?u=sarah" },
            { name: "Mike Ross", avatar: "https://i.pravatar.cc/150?u=mike" }
        ] 
    },
    { 
        id: "ai-1", title: "Draft User Research Report", description: "Synthia detected a requirement to compile the Q3 user interviews into a PDF report based on the 'Design Sync' meeting.", dueDate: "Nov 25, 2025", category: "workspace", status: "pending_approval", project: "Capstone 101", priority: "Medium", isAiGenerated: true,
        assignees: [{ name: "Klariz Habla", avatar: "https://i.pravatar.cc/150?u=klariz" }] 
    },
    { 
        id: "ai-2", title: "Update Schema Documentation", description: "Based on the transcript from 'Database Finalization', update the ERD diagrams in the shared drive.", dueDate: "Nov 22, 2025", category: "workspace", status: "pending_approval", project: "Internal Tools", priority: "High", isAiGenerated: true,
        assignees: []
    },
  ];

  const filterByStatus = (status: Task["status"]) => {
    return tasks.filter(t => t.status === status && t.category === activeView);
  };

  const pendingTasks = tasks.filter(t => t.status === 'pending_approval' && t.category === 'workspace');

  // --- TASK DETAIL MODAL ---
  const TaskDetailModal = () => {
      const [isEditing, setIsEditing] = useState(false);
      const [editTitle, setEditTitle] = useState(selectedTask?.title || "");
      const [editDesc, setEditDesc] = useState(selectedTask?.description || "");

      if (!selectedTask) return null;
      const isPending = selectedTask.status === 'pending_approval';

      const handleApprove = () => {
          alert(`Task "${editTitle}" Approved and Distributed!`);
          setSelectedTask(null);
      };

      const handleReject = () => {
          if(window.confirm("Are you sure you want to reject this task?")) {
             setSelectedTask(null);
          }
      };

      return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-black/60 transition-opacity backdrop-blur-sm" onClick={() => setSelectedTask(null)}></div>
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-lg w-full relative overflow-hidden border border-gray-100 dark:border-slate-700 flex flex-col">
                      {isPending ? (
                          <div className="bg-orange-50 dark:bg-orange-900/20 px-6 py-4 border-b border-orange-100 dark:border-orange-800 flex items-start gap-4">
                              <div className="p-2 bg-white dark:bg-orange-900/40 rounded-full shadow-sm">
                                <Shield className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                              </div>
                              <div className="flex-1">
                                  <h3 className="text-base font-bold text-gray-900 dark:text-white">Admin Approval Required</h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">Synthia generated this task. Please review before distributing.</p>
                              </div>
                              <button onClick={() => setSelectedTask(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                          </div>
                      ) : (
                          <div className="px-6 py-4 flex justify-between items-center border-b border-gray-100 dark:border-slate-700">
                              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">{selectedTask.project}</span>
                              <button onClick={() => setSelectedTask(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                          </div>
                      )}
                      
                      <div className="p-6 overflow-y-auto max-h-[70vh]">
                          {/* Title */}
                          {isEditing ? (
                              <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full text-xl font-bold mb-4 border-b-2 border-violet-500 focus:outline-none bg-transparent dark:text-white" />
                          ) : (
                              <div className="flex items-start gap-3 mb-6">
                                  <div className={`mt-1 p-2 rounded-lg ${selectedTask.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'} dark:bg-slate-700`}>
                                      {selectedTask.status === 'completed' ? <CheckCircle className="w-5 h-5" /> : <Briefcase className="w-5 h-5" />}
                                  </div>
                                  <div>
                                      <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                          {selectedTask.title} 
                                      </h2>
                                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">Created via {selectedTask.isAiGenerated ? <span className="flex items-center gap-1 text-violet-600 font-semibold"><Bot className="w-3 h-3"/> Synthia AI</span> : "Manual Entry"}</p>
                                  </div>
                              </div>
                          )}

                          {/* Description */}
                          <div className="mb-6">
                              <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Description</h4>
                              {isEditing ? (
                                  <textarea value={editDesc} onChange={(e) => setEditDesc(e.target.value)} className="w-full text-sm text-gray-600 dark:text-gray-300 border rounded-lg p-3 focus:outline-none focus:border-violet-500 bg-gray-50 dark:bg-slate-700" rows={4} />
                              ) : (
                                  <div className="p-4 bg-gray-50 dark:bg-slate-700/30 rounded-xl border border-gray-100 dark:border-slate-700">
                                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{selectedTask.description}</p>
                                  </div>
                              )}
                          </div>

                          {/* Details Grid */}
                          <div className="grid grid-cols-2 gap-6 mb-6">
                              <div>
                                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Due Date</h4>
                                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200"><CalendarIcon className="w-4 h-4 text-gray-400" />{selectedTask.dueDate}</div>
                              </div>
                              <div>
                                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Priority</h4>
                                  <div className="flex items-center gap-2 text-sm font-medium">
                                      <Flag className={`w-4 h-4 ${selectedTask.priority === 'High' ? 'text-red-500 fill-red-500' : selectedTask.priority === 'Medium' ? 'text-orange-500 fill-orange-500' : selectedTask.priority === 'Low' ? 'text-blue-500 fill-blue-500' : 'text-gray-400'}`} />
                                      <span>{selectedTask.priority} Priority</span>
                                  </div>
                              </div>
                          </div>

                          {/* Assignees */}
                          <div>
                              <div className="flex justify-between items-center mb-2">
                                  <h4 className="text-xs font-bold text-gray-400 uppercase">Assigned Members</h4>
                                  {isEditing && <button className="text-xs text-violet-600 font-medium hover:underline">+ Add Member</button>}
                              </div>
                              <div className="flex items-center gap-3">
                                  {selectedTask.assignees.length > 0 ? (
                                      selectedTask.assignees.map((assignee, idx) => (
                                          <div key={idx} className="flex items-center gap-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-full pl-1 pr-3 py-1 shadow-sm">
                                              <img src={assignee.avatar} alt={assignee.name} className="w-6 h-6 rounded-full" />
                                              <span className="text-xs font-medium text-gray-700 dark:text-gray-200">{assignee.name}</span>
                                              {isEditing && <button className="ml-1 text-gray-400 hover:text-red-500"><X className="w-3 h-3" /></button>}
                                          </div>
                                      ))
                                  ) : (
                                      <span className="text-sm text-gray-400 italic flex items-center gap-2">
                                          <Users className="w-4 h-4" /> No members assigned
                                      </span>
                                  )}
                              </div>
                          </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-slate-700/50 px-6 py-4 border-t border-gray-100 dark:border-slate-700 flex justify-between items-center">
                          <button onClick={handleReject} className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 text-sm font-medium flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                              <Trash2 className="w-4 h-4" /> {isPending ? 'Reject Task' : 'Delete'}
                          </button>
                          <div className="flex gap-3">
                              {isEditing ? (
                                  <>
                                    <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">Cancel</button>
                                    <button onClick={() => setIsEditing(false)} className="px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-medium shadow-md transition-colors">Save Changes</button>
                                  </>
                              ) : (
                                  <>
                                    <button onClick={() => setIsEditing(true)} className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-slate-600 border border-transparent hover:border-gray-200 dark:hover:border-slate-500 rounded-lg text-sm font-medium flex items-center gap-2 transition-all">
                                        <Edit2 className="w-4 h-4" /> Edit
                                    </button>
                                    {isPending && (
                                        <button onClick={handleApprove} className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg shadow-green-200 dark:shadow-none transition-all transform hover:-translate-y-0.5">
                                            <Check className="w-4 h-4" /> Approve & Distribute
                                        </button>
                                    )}
                                  </>
                              )}
                          </div>
                      </div>
                </div>
            </div>
        </div>
      );
  }

  // --- CREATE TASK MODAL (TODOIST STYLE w/ DROPDOWN PRIORITY) ---
  const CreateTaskModal = () => {
    const [selectedPriority, setSelectedPriority] = useState<string>('P4');
    const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
    const [date, setDate] = useState<string>('');

    // Updated Priority Options (Explicit High/Medium/Low)
    const priorities = [
      { id: 'P1', label: 'High Priority', color: 'text-red-600', iconColor: 'fill-red-600 text-red-600' },
      { id: 'P2', label: 'Medium Priority', color: 'text-orange-500', iconColor: 'fill-orange-500 text-orange-500' },
      { id: 'P3', label: 'Low Priority', color: 'text-blue-600', iconColor: 'fill-blue-600 text-blue-600' },
      { id: 'P4', label: 'No Priority', color: 'text-gray-500', iconColor: 'text-gray-500' },
    ];

    const currentPriority = priorities.find(p => p.id === selectedPriority) || priorities[3];

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowCreateTaskModal(false)}></div>
          <div className="flex min-h-full items-start justify-center p-4 pt-24"> 
             <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-xl relative border border-gray-100 dark:border-slate-700 overflow-visible">
                 
                 <div className="p-4">
                     <div className="flex items-start gap-4">
                         <div className="flex-1">
                             <input 
                                  type="text" 
                                  placeholder="Task name" 
                                  autoFocus
                                  className="w-full text-lg font-semibold placeholder:text-gray-400 border-none outline-none bg-transparent dark:text-white p-0 m-0"
                             />
                             <textarea 
                                  placeholder="Description" 
                                  className="w-full text-sm text-gray-600 dark:text-gray-300 placeholder:text-gray-400 border-none outline-none bg-transparent resize-none mt-2 p-0 m-0"
                                  rows={2}
                             />
                         </div>
                     </div>
  
                     {/* Quick Action Row */}
                     <div className="flex items-center gap-2 mt-4 relative">
                         {/* DUE DATE WITH NATIVE PICKER */}
                         <div className="relative">
                            <button className="flex items-center gap-1.5 px-2 py-1 rounded border border-gray-200 dark:border-slate-600 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors pointer-events-none">
                                <CalendarIcon className={`w-3.5 h-3.5 ${date ? 'text-green-600' : 'text-green-500'}`} /> 
                                {date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Due Date'}
                            </button>
                            <input 
                                type="date" 
                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" 
                                onChange={(e) => setDate(e.target.value)}
                            />
                         </div>
                         
                         {/* PRIORITY DROPDOWN */}
                         <div className="relative">
                             <button 
                                onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
                                className={`flex items-center gap-1.5 px-2 py-1 rounded border border-gray-200 dark:border-slate-600 text-xs font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors ${currentPriority.color}`}
                             >
                                 <Flag className={`w-3.5 h-3.5 ${currentPriority.iconColor}`} /> {currentPriority.label}
                             </button>

                             {showPriorityDropdown && (
                                <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden py-1">
                                    {priorities.map((p) => (
                                        <button
                                            key={p.id}
                                            onClick={() => { setSelectedPriority(p.id); setShowPriorityDropdown(false); }}
                                            className="w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                                        >
                                            <Flag className={`w-4 h-4 ${p.iconColor}`} />
                                            <span className={`text-sm ${p.id === selectedPriority ? 'font-bold' : ''} text-gray-700 dark:text-gray-200`}>{p.label}</span>
                                            {p.id === selectedPriority && <Check className="w-3 h-3 text-violet-600 ml-auto" />}
                                        </button>
                                    ))}
                                </div>
                             )}
                         </div>
                     </div>
                 </div>
  
                 {/* Footer Action Bar - NO INBOX */}
                 <div className="bg-gray-50 dark:bg-slate-700/50 px-4 py-3 border-t border-gray-100 dark:border-slate-700 flex justify-end items-center gap-3">
                     <button 
                          onClick={() => setShowCreateTaskModal(false)} 
                          className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 rounded transition-colors"
                     >
                         Cancel
                     </button>
                     <button className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-semibold hover:bg-violet-700 shadow-md transition-colors opacity-50 cursor-not-allowed">
                         Add task
                     </button>
                 </div>
  
             </div>
          </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white dark:bg-slate-900 overflow-hidden font-sans">
      {/* SIDEBAR */}
      <aside className="hidden lg:flex w-64 border-r border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex-col pt-6">
        <div className="px-6 mb-6">
           <h3 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">Categories</h3>
           <div className="space-y-1">
              <button onClick={() => { setActiveView("personal"); setSidebarView("categories"); }} className={`w-full flex items-center justify-between px-2 py-2 rounded-md text-sm transition-colors ${activeView === "personal" ? "text-violet-600 font-medium" : "text-gray-600 hover:bg-gray-50 dark:text-gray-400"}`}>
                 <div className="flex items-center gap-3"><User className="w-4 h-4" /> Personal Tasks</div>
                 <span className="text-gray-400 text-xs">{tasks.filter(t => t.category === "personal").length}</span>
              </button>
              <button onClick={() => { setActiveView("workspace"); setSidebarView("categories"); }} className={`w-full flex items-center justify-between px-2 py-2 rounded-md text-sm transition-colors ${activeView === "workspace" ? "bg-blue-50 text-blue-600 font-medium dark:bg-blue-900/20" : "text-gray-600 hover:bg-gray-50 dark:text-gray-400"}`}>
                 <div className="flex items-center gap-3"><Briefcase className="w-4 h-4" /> Workspace Tasks</div>
                 <span className="text-gray-400 text-xs">{tasks.filter(t => t.category === "workspace").length}</span>
              </button>
           </div>
        </div>
        <div className="px-6 border-t border-gray-100 dark:border-slate-700 pt-6">
            <h3 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">Views</h3>
            <div className="space-y-1">
               <button onClick={() => setSidebarView("today")} className="w-full flex items-center justify-between px-2 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-slate-800"><div className="flex items-center gap-3"><CalendarIcon className="w-4 h-4" /> Today</div></button>
               <button onClick={() => setSidebarView("upcoming")} className="w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-slate-800"><ChevronRight className="w-4 h-4" /> Upcoming</button>
               <button onClick={() => setSidebarView("filters")} className="w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-slate-800"><Filter className="w-4 h-4" /> Filters</button>
               <button onClick={() => setSidebarView("completed")} className="w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-slate-800"><CheckCircle className="w-4 h-4" /> Completed</button>
            </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 bg-white dark:bg-slate-900">
         <div className="lg:hidden p-4 border-b border-gray-200 dark:border-slate-700 flex items-center gap-3">
             <button onClick={() => setShowLeftSidebar(!showLeftSidebar)} className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-md"><Menu className="w-5 h-5" /></button>
             <h2 className="text-lg font-bold">Tasks</h2>
         </div>

         <div className="flex-1 flex flex-col h-full">
             <div className="p-6 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{activeView === "personal" ? "Personal Tasks" : "Workspace Tasks"}</h1>
                    <div className="flex bg-gray-100 dark:bg-slate-800 rounded-lg p-1">
                        <button onClick={() => setActiveTab('board')} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${activeTab === 'board' ? 'bg-white shadow-sm text-gray-800 dark:bg-slate-600 dark:text-white' : 'text-gray-500'}`}>Board</button>
                        <button onClick={() => setActiveTab('list')} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${activeTab === 'list' ? 'bg-white shadow-sm text-gray-800 dark:bg-slate-600 dark:text-white' : 'text-gray-500'}`}>List</button>
                    </div>
                 </div>
                 {activeView === 'personal' && (
                    <button onClick={() => setShowCreateTaskModal(true)} className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors">
                        <Plus className="w-4 h-4" /> New Task
                    </button>
                 )}
             </div>

             <div className="flex-1 overflow-y-auto px-6 pb-6">
                {activeView === 'workspace' && pendingTasks.length > 0 && (
                    <div className="mb-8 p-4 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/50 rounded-xl flex items-center justify-between shadow-sm">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-orange-100 dark:bg-orange-800/30 rounded-lg text-orange-600 dark:text-orange-400"><Bot className="w-6 h-6" /></div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white">AI Generated Tasks Pending Approval</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Synthia created {pendingTasks.length} tasks from recent meetings.</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeView === 'workspace' && activeTab === 'list' && pendingTasks.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-2"><Shield className="w-3 h-3" /> Needs Review</h3>
                        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden">
                            {pendingTasks.map(task => <ListTaskItem key={task.id} task={task} onClick={setSelectedTask} />)}
                        </div>
                    </div>
                )}

                {activeView === 'workspace' && activeTab === 'list' && <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">Active Tasks</h3>}

                {activeTab === 'board' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activeView === 'workspace' && pendingTasks.length > 0 && (
                            <div className="bg-orange-50/50 dark:bg-orange-900/5 rounded-xl p-4 border border-orange-100 dark:border-orange-900/20">
                                <div className="flex items-center gap-2 mb-4">
                                    <Shield className="w-4 h-4 text-orange-500" />
                                    <h3 className="font-semibold text-orange-700 dark:text-orange-400">Pending Review</h3>
                                </div>
                                <div className="space-y-3">{pendingTasks.map(task => <BoardTaskCard key={task.id} task={task} onClick={setSelectedTask} />)}</div>
                            </div>
                        )}
                        <div>
                            <div className="flex items-center gap-2 mb-4"><div className="w-2.5 h-2.5 rounded-full bg-violet-500"></div><h3 className="font-semibold text-gray-700 dark:text-gray-200">To Do</h3></div>
                            <div className="space-y-3">{filterByStatus("todo").map(task => <BoardTaskCard key={task.id} task={task} onClick={setSelectedTask} />)}</div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-4"><div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div><h3 className="font-semibold text-gray-700 dark:text-gray-200">On Going</h3></div>
                            <div className="space-y-3">{filterByStatus("ongoing").map(task => <BoardTaskCard key={task.id} task={task} onClick={setSelectedTask} />)}</div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-4"><CheckCircle className="w-4 h-4 text-emerald-500" /><h3 className="font-semibold text-gray-700 dark:text-gray-200">Completed</h3></div>
                            <div className="space-y-3 opacity-70">{filterByStatus("completed").map(task => <BoardTaskCard key={task.id} task={task} onClick={setSelectedTask} />)}</div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden">
                         {filterByStatus("todo").concat(filterByStatus("ongoing")).concat(filterByStatus("completed")).length > 0 ? 
                            filterByStatus("todo").concat(filterByStatus("ongoing")).concat(filterByStatus("completed")).map(task => <ListTaskItem key={task.id} task={task} onClick={setSelectedTask} />) 
                            : <div className="p-8 text-center text-gray-400">No active tasks found.</div>
                         }
                    </div>
                )}
             </div>
         </div>
      </main>
      {selectedTask && <TaskDetailModal />}
      {showCreateTaskModal && <CreateTaskModal />}
    </div>
  );
};

export default Tasks;