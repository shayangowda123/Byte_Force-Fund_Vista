import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CITIZEN_REPORTS, addNotification } from '../data/mockData';
import { MapPin, Camera, BrainCircuit, Upload, Check, MessageSquarePlus, Clock, Hash, AlertCircle, ThumbsUp, ThumbsDown, ShieldCheck, Flag } from 'lucide-react';
import { RoleType } from '../App';

type Complaint = {
  id: string;
  projectId: string;
  issueType: string;
  title: string;
  description: string;
  location?: string;
  mediaName: string | null;
  timestamp: string;
  status: 'Pending' | 'Under Review' | 'Verified' | 'Rejected' | 'Action Taken';
  verifyCount: number;
  rejectCount: number;
  score: number;
  aiFlags?: string[];
  userVoted?: 'verify' | 'reject' | null;
};

const KNOWN_PROJECTS = ['PRJ-441', 'PRJ-502', 'PRJ-309', 'PRJ-101', 'Other'];
const ISSUE_TYPES = ['Incomplete Work', 'Financial Fraud', 'Severe Delay', 'Quality Issue', 'Ghost Project'];

export const CitizenVerification = ({ role }: { role: RoleType }) => {
  const [actedItems, setActedItems] = useState<Record<string, string>>({});
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [complaintSubmitted, setComplaintSubmitted] = useState(false);
  const [complaints, setComplaints] = useState<Complaint[]>([
    {
      id: 'CMP-001',
      projectId: 'PRJ-441',
      issueType: 'Financial Fraud',
      title: 'Road not constructed despite full payment',
      description: 'The contractor claimed 100% road completion but the road in Ward 12 is still unpaved mud. No work has been done for the past 3 months. Locals are suffering.',
      location: 'Ward 12, Main Road',
      mediaName: 'road_ward12_photo.jpg',
      timestamp: '2026-05-01 18:30',
      status: 'Under Review',
      verifyCount: 12,
      rejectCount: 2,
      score: 18,
      aiFlags: []
    },
    {
      id: 'CMP-002',
      projectId: 'PRJ-309',
      issueType: 'Quality Issue',
      title: 'Cracks in school building within 1 month',
      description: 'The new primary school building has developed severe cracks on the ceiling and water leaks during minor rain.',
      location: 'Govt School, Block B',
      mediaName: null,
      timestamp: '2026-05-02 09:15',
      status: 'Pending',
      verifyCount: 2,
      rejectCount: 0,
      score: 2,
      aiFlags: ['🚩 AI: Same user reported 3 complaints today', '🚩 AI: Image metadata missing GPS coordinates']
    }
  ]);

  const [form, setForm] = useState({ 
    uploadType: 'Complaint', projectId: 'PRJ-441', issueType: 'Incomplete Work', 
    title: '', description: '', location: '', mediaName: '', citizenName: '', citizenId: '' 
  });
  const [activeTab, setActiveTab] = useState<'evidence' | 'complaint'>('complaint');

  const handleAction = (id: string, actionName: string) => setActedItems(prev => ({ ...prev, [id]: actionName }));

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `CMP-${String(complaints.length + 1).padStart(3, '0')}`;
    const newComplaint: Complaint = {
      id: newId,
      projectId: form.projectId,
      issueType: form.uploadType === 'Verification Proof' ? 'Verification' : form.issueType,
      title: `[${form.uploadType}] ${form.title}`,
      description: form.description,
      location: form.location || 'Not provided',
      mediaName: form.mediaName || null,
      timestamp: new Date().toLocaleString(),
      status: 'Pending',
      verifyCount: 0,
      rejectCount: 0,
      score: 0,
    };
    setComplaints(prev => [newComplaint, ...prev]);
    setComplaintSubmitted(true);
    
    // 🧠 Smart Upgrade (AI-Based Filtering)
    // Simulate AI evaluating the complaint based on description length, keywords, image quality, etc.
    const aiComplaintScore = Math.random(); 

    if (aiComplaintScore > 0.7) {
      addNotification('auditor', 'High', `URGENT: New high-confidence complaint raised for ${form.projectId}`);
    } else if (aiComplaintScore >= 0.3) {
      addNotification('auditor', 'Low', `New complaint raised for ${form.projectId}`);
    } else {
      // ignore_or_delay() -> Too low score (likely spam/fake), no notification sent to auditor.
    }

    setTimeout(() => { 
      setComplaintSubmitted(false); 
      setShowComplaintForm(false); 
      setForm({ 
        uploadType: 'Complaint', projectId: 'PRJ-441', issueType: 'Incomplete Work', 
        title: '', description: '', location: '', mediaName: '', citizenName: '', citizenId: '' 
      });  
    }, 2500);
  };

  const userWeight = 2; // Simulating a "Verified Citizen" weight

  const handleVote = (id: string, voteType: 'verify' | 'reject') => {
    if (role !== 'user') return; // Only users vote
    setComplaints(prev => prev.map(c => {
      if (c.id === id) {
        if (c.userVoted) return c; // Already voted
        const newVerifyCount = voteType === 'verify' ? c.verifyCount + 1 : c.verifyCount;
        const newRejectCount = voteType === 'reject' ? c.rejectCount + 1 : c.rejectCount;
        const newScore = voteType === 'verify' ? c.score + userWeight : c.score - userWeight;
        
        let newStatus = c.status;
        
        // Threshold Reached (IMPORTANT) -> VERIFIED
        if (newVerifyCount >= 5) {
          newStatus = 'Verified';
          if (c.status !== 'Verified') {
            addNotification('auditor', 'High', `Complaint VERIFIED by citizens – Re-audit required for ${c.id}`);
          }
        }
        
        // Threshold Reached -> REJECTED
        if (newRejectCount >= 5) {
          newStatus = 'Rejected';
          if (c.status !== 'Rejected') {
            addNotification('auditor', 'Low', `Complaint rejected by citizens for ${c.id}`);
          }
        }

        return { ...c, verifyCount: newVerifyCount, rejectCount: newRejectCount, score: newScore, status: newStatus, userVoted: voteType };
      }
      return c;
    }));
  };

  const handleReview = (id: string, action: Complaint['status']) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: action } : c));
  };

  const badgeColor = (status: Complaint['status']) =>
    status === 'Pending' ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-400' :
    status === 'Under Review' ? 'bg-blue-500/20 border-blue-500/40 text-blue-400' :
    status === 'Verified' ? 'bg-green-500/20 border-green-500/40 text-green-400' :
    status === 'Action Taken' ? 'bg-purple-500/20 border-purple-500/40 text-purple-400' :
    'bg-red-500/20 border-red-500/40 text-red-400'; // Rejected

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold mb-1">Citizen Complaint & Verification System</h2>
          <p className="text-slate-400 text-sm">Transparent public verification. Weighted voting and AI-based trust scoring ensure genuine escalation.</p>
        </div>
        {role === 'user' && (
          <button onClick={() => setShowComplaintForm(!showComplaintForm)}
            className="flex items-center gap-2 px-4 py-2 bg-neon-green/20 hover:bg-neon-green/30 text-green-400 border border-green-500/50 rounded-lg font-medium text-sm transition-colors">
            <MessageSquarePlus size={18} />
            {showComplaintForm ? 'Cancel' : 'Raise Complaint'}
          </button>
        )}
      </div>

      {/* COMPLAINT FORM for User */}
      <AnimatePresence>
        {showComplaintForm && role === 'user' && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="glass-panel rounded-xl p-6 border border-neon-green/30">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <AlertCircle size={18} className="text-neon-green" /> Raise a New Complaint
            </h3>
            {complaintSubmitted ? (
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="flex flex-col items-center py-8 gap-3">
                <Check size={48} className="text-neon-green" />
                <p className="text-lg font-bold text-white">Submission Successful!</p>
                <p className="text-sm text-slate-400">Your upload is now visible for public verification. Auditor notified.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleComplaintSubmit} className="space-y-4">
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Upload Type *</label>
                    <select required value={form.uploadType} onChange={e => setForm(p => ({ ...p, uploadType: e.target.value }))}
                      className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-neon-green transition-colors font-bold text-neon-green">
                      <option value="Complaint">Complaint</option>
                      <option value="Verification Proof">Verification Proof</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Project ID *</label>
                    <select required value={form.projectId} onChange={e => setForm(p => ({ ...p, projectId: e.target.value }))}
                      className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-neon-green transition-colors">
                      {KNOWN_PROJECTS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  {form.uploadType === 'Complaint' && (
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Issue Type *</label>
                      <select required value={form.issueType} onChange={e => setForm(p => ({ ...p, issueType: e.target.value }))}
                        className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-neon-green transition-colors">
                        {ISSUE_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                      </select>
                    </div>
                  )}
                  <div className={form.uploadType === 'Verification Proof' ? 'md:col-span-2' : ''}>
                    <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Location (Optional)</label>
                    <input value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))}
                      placeholder="e.g. Ward 12, Main Road"
                      className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-neon-green transition-colors" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 border border-slate-700/50 bg-slate-900/30 p-4 rounded-lg">
                  <div className="md:col-span-2 flex items-center gap-2 mb-1">
                    <ShieldCheck size={16} className="text-neon-cyan" />
                    <span className="text-xs font-bold text-neon-cyan uppercase tracking-wider">Private Personal Details (Hidden from Public)</span>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Full Name *</label>
                    <input required value={form.citizenName} onChange={e => setForm(p => ({ ...p, citizenName: e.target.value }))}
                      placeholder="Enter your name"
                      className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-neon-cyan transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Citizen ID / Aadhar *</label>
                    <input required value={form.citizenId} onChange={e => setForm(p => ({ ...p, citizenId: e.target.value }))}
                      placeholder="e.g. XXXX-XXXX-1234"
                      className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-neon-cyan transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Summary *</label>
                  <input required value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                    placeholder="Short summary of the issue or proof"
                    className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-neon-green transition-colors" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Detailed Description *</label>
                  <textarea required value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                    placeholder="Explain the issue clearly — what was promised, what actually happened, how long has this been a problem..."
                    rows={4}
                    className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-neon-green transition-colors resize-none" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Upload Proof / Image (Optional)</label>
                  <div className="border-2 border-dashed border-slate-700 hover:border-neon-green/50 rounded-lg p-4 transition-colors">
                    <input type="file" accept="image/*,video/*" id="evidence-upload"
                      onChange={e => setForm(p => ({ ...p, mediaName: e.target.files?.[0]?.name || '' }))}
                      className="hidden" />
                    <label htmlFor="evidence-upload" className="flex flex-col items-center gap-2 cursor-pointer">
                      <Upload size={24} className="text-slate-500" />
                      <span className="text-sm text-slate-400">{form.mediaName || 'Click to select photo or video'}</span>
                      <span className="text-xs text-slate-600">Geo-tagged photos carry higher trust scores.</span>
                    </label>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="px-6 py-2.5 bg-neon-green/20 hover:bg-neon-green/30 text-green-400 border border-green-500/50 rounded-lg font-medium text-sm transition-colors">
                    Submit {form.uploadType} →
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-dark-border">
        {[{ id: 'complaint', label: `Public Feed & Complaints (${complaints.length})` }, { id: 'evidence', label: 'AI Citizen Reports' }].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 -mb-px transition-colors ${activeTab === tab.id ? 'border-neon-blue text-neon-blue bg-neon-blue/5' : 'border-transparent text-slate-400 hover:text-white'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB: Complaints (Public Feed / Auditing) */}
      {activeTab === 'complaint' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900/60 p-4 rounded-xl border border-slate-700">
            <p className="text-slate-400 text-sm">
              {role === 'user' ? 'Verify complaints raised by others using weighted voting (Your weight: 2x Verified Citizen)' : 'Monitor citizen-verified complaints. Complaints exceeding threshold score automatically trigger audit review.'}
            </p>
            {role === 'user' && (
              <span className="mt-2 sm:mt-0 flex items-center text-xs bg-slate-800 text-slate-300 px-3 py-1.5 rounded-full border border-slate-700">
                <ShieldCheck size={14} className="text-neon-cyan mr-1.5" /> Identity Hidden
              </span>
            )}
          </div>

          {complaints.map((c, index) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
              className="glass-panel rounded-xl p-5 border border-dark-border hover:border-slate-600 transition-colors">
              <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-white">{c.title}</h3>
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border font-bold ${badgeColor(c.status)}`}>{c.status}</span>
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">{c.issueType}</span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-500 font-mono">
                    <span className="flex items-center gap-1"><Hash size={12} className="text-slate-400"/>{c.id}</span>
                    <span className="flex items-center gap-1 text-neon-blue">Project: {c.projectId}</span>
                    {c.location && <span className="flex items-center gap-1"><MapPin size={12} className="text-slate-400"/>{c.location}</span>}
                    <span className="flex items-center gap-1"><Clock size={12} className="text-slate-400"/>{c.timestamp}</span>
                  </div>
                </div>

                {/* AI Flags */}
                {c.aiFlags && c.aiFlags.length > 0 && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2.5 max-w-xs w-full lg:w-auto">
                    <p className="text-[10px] text-red-400 font-bold uppercase tracking-wider flex items-center mb-1"><BrainCircuit size={12} className="mr-1"/> AI Trust Analysis</p>
                    {c.aiFlags.map((flag, i) => (
                      <div key={i} className="text-xs text-red-300">{flag}</div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 mb-4">
                <p className="text-sm text-slate-300 leading-relaxed">{c.description}</p>
              </div>

              {c.mediaName && (
                <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/40 rounded px-3 py-2 mb-4 w-fit border border-slate-800">
                  <Camera size={14} className="text-neon-cyan" /> Proof Attached: <span className="text-white font-mono">{c.mediaName}</span>
                </div>
              )}

              {/* Voting and Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-center pt-3 border-t border-dark-border/50 gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Trust Score</span>
                    <span className={`text-lg font-black ${c.score > 10 ? 'text-green-400' : c.score < 0 ? 'text-red-400' : 'text-yellow-400'}`}>{c.score}</span>
                  </div>
                  
                  {role === 'user' ? (
                    <div className="flex items-center gap-2 bg-slate-900/50 rounded-lg p-1 border border-slate-700">
                      <button 
                        onClick={() => handleVote(c.id, 'verify')}
                        disabled={!!c.userVoted}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors ${c.userVoted === 'verify' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                      >
                        <ThumbsUp size={16} /> {c.verifyCount} Verify
                      </button>
                      <button 
                        onClick={() => handleVote(c.id, 'reject')}
                        disabled={!!c.userVoted}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors ${c.userVoted === 'reject' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                      >
                        <ThumbsDown size={16} /> {c.rejectCount} Disagree
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-4 text-sm text-slate-400">
                      <span className="flex items-center gap-1"><ThumbsUp size={14} className="text-green-400"/> {c.verifyCount} Verified</span>
                      <span className="flex items-center gap-1"><ThumbsDown size={14} className="text-red-400"/> {c.rejectCount} Rejected</span>
                    </div>
                  )}
                </div>

                {(role === 'admin' || role === 'auditor') && (
                  <div className="flex gap-2">
                    <button onClick={() => handleReview(c.id, 'Under Review')} className="px-4 py-1.5 text-xs bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 transition-colors font-medium">Under Review</button>
                    <button onClick={() => handleReview(c.id, 'Action Taken')} className="px-4 py-1.5 text-xs bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 transition-colors font-medium">Action Taken</button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* TAB: AI Evidence (Legacy Reports) */}
      {activeTab === 'evidence' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {CITIZEN_REPORTS.map((report, index) => {
            const isFlagged = report.status.includes('Flagged');
            return (
              <motion.div key={report.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.2 }}
                className={`glass-panel p-6 rounded-xl border-t-4 ${isFlagged ? 'border-t-red-500' : 'border-t-neon-green'}`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">Project {report.projectId}</h3>
                    <p className="text-sm text-slate-400 flex items-center mt-1"><MapPin size={14} className="mr-1" />{report.location}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold border ${isFlagged ? 'bg-red-500/10 border-red-500/50 text-red-400' : 'bg-green-500/10 border-green-500/50 text-green-400'}`}>
                    {report.status}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <p className="text-xs text-slate-400 mb-1 uppercase tracking-wider">Vendor Claim</p>
                    <p className="font-medium text-white">{report.claimedProgress}</p>
                  </div>
                  <div className={`p-4 rounded-lg border ${isFlagged ? 'bg-red-900/20 border-red-500/30' : 'bg-green-900/20 border-green-500/30'}`}>
                    <p className="text-xs text-slate-400 mb-1 uppercase tracking-wider flex items-center"><BrainCircuit size={12} className="mr-1" />AI Assessment</p>
                    <p className={`font-medium ${isFlagged ? 'text-red-400' : 'text-green-400'}`}>{report.aiAnalysis}</p>
                  </div>
                </div>
                <div className="relative rounded-lg overflow-hidden border border-slate-700 group">
                  <img src={report.citizenPhoto} alt="Citizen uploaded evidence" className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur text-white text-xs px-2 py-1 rounded flex items-center"><Camera size={12} className="mr-1" />Citizen Upload (Verified GPS)</div>
                  <div className={`absolute inset-0 ${isFlagged ? 'bg-red-500/10' : 'bg-green-500/10'} pointer-events-none`} />
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};
