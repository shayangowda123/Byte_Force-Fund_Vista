import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, CheckCircle2, AlertTriangle, Hash, Calendar, MapPin, FileText, IndianRupee, Layers } from 'lucide-react';
import { RoleType } from '../App';
import { AdminGuidelines } from './AdminGuidelines';

type Project = {
  id: string;
  name: string;
  type: string;
  location: string;
  description: string;
  budget: number;
  duration: string;
  createdAt: string;
  fraudScore: number;
  status: 'Pending AI Review' | 'Approved' | 'Flagged';
};

const PROJECT_TYPES = ['Road', 'Hospital', 'School', 'Bridge', 'Water Supply', 'Sanitation', 'Housing', 'Other'];

const generateProjectId = () => `PRJ-${Math.floor(Math.random() * 900 + 100)}-${Date.now().toString().slice(-4)}`;
const computeFraudScore = (budget: number, type: string) => {
  // Simple heuristic for demo
  const base = Math.random() * 40 + 10;
  const budgetFactor = budget > 5000000 ? 30 : budget > 1000000 ? 15 : 5;
  return Math.min(Math.round(base + budgetFactor), 100);
};

export const AdminProjects = ({ role }: { role: RoleType }) => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 'PRJ-441-9781',
      name: 'NH-44 Road Repair',
      type: 'Road',
      location: 'Ward 12, Hyderabad',
      description: '10km road resurfacing along NH-44 corridor.',
      budget: 45000000,
      duration: '6 months',
      createdAt: '2026-04-10',
      fraudScore: 87,
      status: 'Flagged',
    },
    {
      id: 'PRJ-502-2214',
      name: 'Primary School Block B',
      type: 'School',
      location: 'Warangal District',
      description: 'New classroom block construction for 200 students.',
      budget: 12000000,
      duration: '8 months',
      createdAt: '2026-04-18',
      fraudScore: 14,
      status: 'Approved',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', type: 'Road', location: '', description: '', budget: '', duration: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const budget = parseFloat(form.budget) * 100000;
    const fraudScore = computeFraudScore(budget, form.type);
    const status: Project['status'] = fraudScore > 70 ? 'Flagged' : fraudScore > 40 ? 'Pending AI Review' : 'Approved';
    const newProject: Project = {
      id: generateProjectId(),
      name: form.name,
      type: form.type,
      location: form.location,
      description: form.description,
      budget,
      duration: form.duration,
      createdAt: new Date().toISOString().slice(0, 10),
      fraudScore,
      status,
    };
    setProjects(prev => [newProject, ...prev]);
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setShowForm(false); setForm({ name: '', type: 'Road', location: '', description: '', budget: '', duration: '' }); }, 2000);
  };

  const scoreColor = (s: number) => s > 70 ? 'text-red-400' : s > 40 ? 'text-yellow-400' : 'text-green-400';
  const scoreBar   = (s: number) => s > 70 ? 'bg-gradient-to-r from-orange-500 to-red-500' : s > 40 ? 'bg-yellow-400' : 'bg-green-500';
  const badgeColor = (st: Project['status']) =>
    st === 'Flagged' ? 'bg-red-500/20 border-red-500/40 text-red-400' :
    st === 'Approved' ? 'bg-green-500/20 border-green-500/40 text-green-400' :
    'bg-yellow-500/20 border-yellow-500/40 text-yellow-400';

  return (
    <div className="space-y-6">
      <AdminGuidelines role={role} />
      
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold mb-1">Admin — Project Management</h2>
          <p className="text-slate-400 text-sm">Create projects, trigger blockchain entries, and automatically run AI fraud checks on submitted budgets.</p>
        </div>
        {role === 'admin' && (
          <button onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-neon-blue/20 hover:bg-neon-blue/30 text-neon-blue border border-neon-blue/40 rounded-lg font-medium text-sm transition-colors">
            <PlusCircle size={18} />
            {showForm ? 'Cancel' : 'Create New Project'}
          </button>
        )}
      </div>

      {/* CREATE PROJECT FORM */}
      <AnimatePresence>
        {showForm && role === 'admin' && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="glass-panel rounded-xl p-6 border border-neon-blue/30">
            <h3 className="font-bold text-white mb-5 flex items-center gap-2">
              <PlusCircle size={18} className="text-neon-blue" /> New Project Registration
            </h3>

            {submitted ? (
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="flex flex-col items-center py-10 gap-3">
                <CheckCircle2 size={48} className="text-neon-green" />
                <p className="text-lg font-bold text-white">Project Created & Blockchain Entry Recorded!</p>
                <p className="text-sm text-slate-400">AI fraud analysis complete. Redirecting...</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Project Name *</label>
                  <input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    placeholder="e.g. NH-44 Road Repair"
                    className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-neon-blue transition-colors" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Project Type *</label>
                  <select required value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
                    className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-neon-blue transition-colors">
                    {PROJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Location *</label>
                  <input required value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))}
                    placeholder="e.g. Ward 12, Hyderabad"
                    className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-neon-blue transition-colors" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Budget (in Lakhs ₹) *</label>
                  <input required type="number" min="1" value={form.budget} onChange={e => setForm(p => ({ ...p, budget: e.target.value }))}
                    placeholder="e.g. 450 (for ₹4.5 Cr)"
                    className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-neon-blue transition-colors" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Duration *</label>
                  <input required value={form.duration} onChange={e => setForm(p => ({ ...p, duration: e.target.value }))}
                    placeholder="e.g. 6 months"
                    className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-neon-blue transition-colors" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Description *</label>
                  <textarea required value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                    placeholder="Describe the project scope and objectives..."
                    rows={3}
                    className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-neon-blue transition-colors resize-none" />
                </div>
                <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                  <button type="submit"
                    className="px-6 py-2.5 bg-neon-blue/20 hover:bg-neon-blue/30 text-neon-blue border border-neon-blue/40 rounded-lg font-medium text-sm transition-colors">
                    Submit & Run AI Check →
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* PROJECT LIST */}
      <div className="space-y-4">
        {projects.map((project, index) => (
          <motion.div key={project.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}
            className="glass-panel rounded-xl p-5 border border-dark-border hover:border-slate-600 transition-colors">
            <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-white text-lg">{project.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-bold ${badgeColor(project.status)}`}>{project.status}</span>
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><Hash size={11} />{project.id}</span>
                  <span className="flex items-center gap-1"><Layers size={11} />{project.type}</span>
                  <span className="flex items-center gap-1"><MapPin size={11} />{project.location}</span>
                  <span className="flex items-center gap-1"><Calendar size={11} />{project.createdAt}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 mb-1">Total Budget</p>
                <p className="text-xl font-black text-neon-blue">₹{(project.budget / 100000).toFixed(1)}L</p>
              </div>
            </div>

            <p className="text-sm text-slate-400 mb-4">{project.description}</p>

            <div>
              <div className="flex justify-between mb-1.5">
                <span className="text-xs text-slate-400 flex items-center gap-1"><AlertTriangle size={11} /> AI Fraud Score</span>
                <span className={`text-sm font-black ${scoreColor(project.fraudScore)}`}>{project.fraudScore}/100</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <motion.div initial={{ width: 0 }} animate={{ width: `${project.fraudScore}%` }} transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`h-2 rounded-full ${scoreBar(project.fraudScore)}`} />
              </div>
              {project.fraudScore > 70 && (
                <p className="text-xs text-red-400 mt-1.5">⚠️ High fraud risk detected — project flagged for shadow audit and admin investigation.</p>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-dark-border/50 flex flex-wrap gap-2 justify-between items-center">
              <div className="flex gap-2 items-center text-xs text-slate-500">
                <span className="w-2 h-2 rounded-full bg-neon-green"></span>Blockchain entry recorded
                <span className="w-2 h-2 rounded-full bg-neon-blue ml-2"></span>AI analysis complete
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 transition-colors">View Transactions</button>
                {role === 'admin' && project.status === 'Flagged' && (
                  <button className="px-3 py-1.5 text-xs bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 rounded-lg text-red-400 transition-colors">Investigate</button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
