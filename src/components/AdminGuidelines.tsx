import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, IndianRupee, Layers, Eye, ShieldAlert, FileText, Users, Database, Bell, LayoutDashboard } from 'lucide-react';
import { RoleType } from '../App';

export const AdminGuidelines = ({ role }: { role: RoleType }) => {
  if (role !== 'admin') return null;

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-10">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-neon-blue/20 rounded-xl border border-neon-blue/30">
          <LayoutDashboard className="text-neon-blue w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white tracking-wide">Admin Responsibilities & Guidelines</h2>
          <p className="text-slate-400 text-sm mt-1">🔎 What an Admin Does (Simple Meaning) — Manages funds, assigns projects, and ensures proper execution of government work.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        
        {/* 1. Fund Allocation & Release */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-6 rounded-xl border border-slate-700">
          <h3 className="font-bold text-white flex items-center gap-2 mb-3"><IndianRupee className="text-neon-green" size={20} /> 1️⃣ Fund Allocation & Release</h3>
          <ul className="text-sm text-slate-400 mb-3 list-disc pl-5">
            <li>Allocate budget to projects</li>
            <li>Release funds to departments/vendors</li>
          </ul>
          <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800 text-sm mb-3 text-slate-300">
            <span className="text-slate-500 font-bold">👉 Ensure:</span> Correct amount is issued & No over-allocation
          </div>
        </motion.div>

        {/* 2. Project Management */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-6 rounded-xl border border-slate-700">
          <h3 className="font-bold text-white flex items-center gap-2 mb-3"><Layers className="text-blue-400" size={20} /> 2️⃣ Project Management</h3>
          <ul className="text-sm text-slate-400 mb-3 list-disc pl-5">
            <li>Create and manage projects</li>
            <li>Assign vendors/contractors</li>
            <li>Track project progress</li>
          </ul>
          <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800 text-sm font-mono text-slate-400">
            👉 Example: Road construction → assign vendor → monitor status
          </div>
        </motion.div>

        {/* 3. Monitor Fund Flow */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-6 rounded-xl border border-slate-700">
          <h3 className="font-bold text-white flex items-center gap-2 mb-3"><Eye className="text-neon-purple" size={20} /> 3️⃣ Monitor Fund Flow</h3>
          <p className="text-sm text-slate-400 mb-3">Track how money moves.</p>
          <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800 text-sm mb-3 font-mono text-slate-400">
            👉 Govt → Admin → Vendor → Work
          </div>
          <p className="text-sm font-bold text-neon-red">🚨 Detect: Unusual transfers & Delays in fund usage</p>
        </motion.div>

        {/* 4. Respond to AI Fraud Alerts */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-panel p-6 rounded-xl border border-slate-700">
          <h3 className="font-bold text-white flex items-center gap-2 mb-3"><ShieldAlert className="text-red-400" size={20} /> 4️⃣ Respond to AI Fraud Alerts</h3>
          <p className="text-sm text-slate-400 mb-2">Receive alerts from AI system.</p>
          <div className="bg-red-900/10 p-3 rounded-lg border border-red-500/20 text-sm mb-3">
            👉 Example: <span className="font-bold text-neon-red">Fraud Score = 96 (Critical)</span>
          </div>
          <p className="text-sm font-bold text-neon-red">🚨 Admin must: Pause/stop fund flow & Escalate to auditor</p>
        </motion.div>

        {/* 5. Handle Auditor Reports */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-panel p-6 rounded-xl border border-slate-700">
          <h3 className="font-bold text-white flex items-center gap-2 mb-3"><FileText className="text-yellow-400" size={20} /> 5️⃣ Handle Auditor Reports</h3>
          <ul className="text-sm text-slate-400 mb-3 list-disc pl-5">
            <li>Review audit results</li>
            <li>Take action based on auditor decision</li>
          </ul>
          <p className="text-sm text-slate-500 mb-2">👉 Actions:</p>
          <div className="flex flex-col gap-2 text-sm text-slate-300">
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-neon-green" /> Continue project</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-orange-400" /> Suspend project</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-neon-red" /> Take legal action</span>
          </div>
        </motion.div>

        {/* 6. Manage Citizen Complaints */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-panel p-6 rounded-xl border border-slate-700">
          <h3 className="font-bold text-white flex items-center gap-2 mb-3"><Users className="text-orange-400" size={20} /> 6️⃣ Manage Citizen Complaints</h3>
          <ul className="text-sm text-slate-400 mb-3 list-disc pl-5">
            <li>Monitor complaints raised by users</li>
            <li>Support auditor in resolution</li>
          </ul>
          <p className="text-sm font-bold text-green-400">👉 If complaint is verified: Take corrective action.</p>
        </motion.div>

        {/* 7. Transparency & Notifications */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="glass-panel p-6 rounded-xl border border-slate-700 md:col-span-2">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-white flex items-center gap-2 mb-3"><Database className="text-slate-300" size={20} /> 7️⃣ Ensure Transparency (Blockchain)</h3>
              <p className="text-sm text-slate-400 mb-3">All admin actions are recorded. Cannot modify past data.</p>
              <p className="text-sm font-bold text-slate-300">👉 Ensures: Accountability & Trust</p>
            </div>
            <div>
              <h3 className="font-bold text-white flex items-center gap-2 mb-3"><Bell className="text-neon-blue" size={20} /> 🔔 Admin Receives Notifications:</h3>
              <div className="flex flex-col gap-2 text-sm text-slate-300 pl-2">
                <span className="flex items-center gap-2">• Auditor approvals/rejections</span>
                <span className="flex items-center gap-2 text-neon-red">• AI fraud alerts 🚨</span>
                <span className="flex items-center gap-2 text-neon-red">• Verified complaints 🚨</span>
                <span className="flex items-center gap-2 text-orange-400">• Suspicious transactions</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Final Summary Box */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-8 relative p-[1px] rounded-2xl bg-gradient-to-r from-neon-blue via-blue-500 to-neon-cyan">
        <div className="bg-slate-900 rounded-2xl p-8">
          <h3 className="text-xl font-black text-white mb-4">🎯 Final Role Summary</h3>
          <ul className="text-slate-300 list-none space-y-2 font-medium">
            <li className="flex items-center gap-2"><CheckCircle2 className="text-neon-blue" size={18}/> Manage funds</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="text-neon-blue" size={18}/> Control projects</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="text-neon-blue" size={18}/> Respond to fraud alerts</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="text-neon-blue" size={18}/> Act on audit decisions</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="text-neon-blue" size={18}/> Ensure transparency</li>
          </ul>
        </div>
      </motion.div>

    </div>
  );
};
