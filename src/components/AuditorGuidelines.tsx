import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, IndianRupee, Link as LinkIcon, Users, Brain, Database, Bell, ShieldCheck, Search } from 'lucide-react';
import { RoleType } from '../App';

export const AuditorGuidelines = ({ role }: { role: RoleType }) => {
  if (role !== 'auditor') return null;

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-10">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-neon-purple/20 rounded-xl border border-neon-purple/30">
          <ShieldCheck className="text-neon-purple w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white tracking-wide">Auditor Responsibilities & Guidelines</h2>
          <p className="text-slate-400 text-sm mt-1">🔎 What an Auditor Does (Simple Meaning) — An auditor checks whether project work and fund usage are correct or fraudulent.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        
        {/* 1. Verify Project Work */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-6 rounded-xl border border-slate-700">
          <h3 className="font-bold text-white flex items-center gap-2 mb-3"><Search className="text-neon-blue" size={20} /> 1️⃣ Verify Project Work</h3>
          <ul className="text-sm text-slate-400 mb-3 list-disc pl-5">
            <li>Check if the project is actually completed</li>
            <li>Compare real work vs reported work</li>
          </ul>
          <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800 text-sm mb-3">
            <span className="text-slate-500">👉 Example:</span> Report: <strong>100% complete</strong> | AI: <strong>40% complete</strong>
          </div>
          <p className="text-sm font-bold text-neon-red">🚨 Action: Re-check & investigate mismatch</p>
        </motion.div>

        {/* 2. Validate Fund Usage */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-6 rounded-xl border border-slate-700">
          <h3 className="font-bold text-white flex items-center gap-2 mb-3"><IndianRupee className="text-green-400" size={20} /> 2️⃣ Validate Fund Usage</h3>
          <ul className="text-sm text-slate-400 mb-3 list-disc pl-5">
            <li>Track where the money is spent</li>
            <li>Ensure proper utilization</li>
          </ul>
          <p className="text-sm text-slate-500 mb-2">👉 Detect:</p>
          <div className="flex flex-col gap-2 text-sm text-slate-300">
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-red-400" /> Missing funds</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-red-400" /> Over-spending</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-red-400" /> Fake expenses</span>
          </div>
        </motion.div>

        {/* 3. Review Fund Flow */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-6 rounded-xl border border-slate-700">
          <h3 className="font-bold text-white flex items-center gap-2 mb-3"><LinkIcon className="text-neon-purple" size={20} /> 3️⃣ Review Fund Flow (Middleman Detection)</h3>
          <p className="text-sm text-slate-400 mb-3">Analyze transaction chains.</p>
          <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800 text-sm mb-3 font-mono text-slate-300">
            👉 Example: Govt → Admin → Vendor → <span className="text-neon-red">Shell</span> → <span className="text-neon-red">Relative</span>
          </div>
          <p className="text-sm font-bold text-neon-red">🚨 Action: Identify Circular transactions & Suspicious relationships</p>
        </motion.div>

        {/* 4. Handle Citizen Complaints */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-panel p-6 rounded-xl border border-slate-700">
          <h3 className="font-bold text-white flex items-center gap-2 mb-3"><Users className="text-orange-400" size={20} /> 4️⃣ Handle Citizen Complaints</h3>
          <p className="text-sm text-slate-400 mb-2">When users raise complaints, the auditor:</p>
          <ul className="text-xs text-slate-300 mb-4 list-disc pl-5 space-y-1">
            <li>Reviews complaint details</li>
            <li>Checks proof (images/files)</li>
            <li>Compares with actual data</li>
            <li>Performs re-audit if needed</li>
          </ul>
          <p className="text-sm font-bold text-green-400">👉 If citizens verify the complaint: Auditor takes final decision.</p>
        </motion.div>

        {/* 5. Work Alongside AI */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-panel p-6 rounded-xl border border-slate-700">
          <h3 className="font-bold text-white flex items-center gap-2 mb-3"><Brain className="text-neon-cyan" size={20} /> 5️⃣ Work Alongside AI</h3>
          <ul className="text-sm text-slate-400 mb-3 list-disc pl-5">
            <li>AI gives fraud score & alerts</li>
            <li>Auditor validates and investigates</li>
          </ul>
          <div className="bg-red-900/10 p-3 rounded-lg border border-red-500/20 text-sm mb-3">
            👉 Example: <span className="font-bold text-neon-red">Fraud Score = 82 (High)</span>
          </div>
          <p className="text-sm font-bold text-neon-red">🚨 Auditor must act immediately</p>
        </motion.div>

        {/* 6. Transparency & Alerts */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-panel p-6 rounded-xl border border-slate-700">
          <h3 className="font-bold text-white flex items-center gap-2 mb-3"><Database className="text-slate-300" size={20} /> 6️⃣ Transparency & Alerts (Blockchain)</h3>
          <p className="text-sm text-slate-400 mb-3">All auditor actions are recorded and immutable.</p>
          <p className="text-sm font-bold text-slate-300 mb-2">🔔 Auditor receives alerts:</p>
          <div className="flex flex-col gap-2 text-sm text-slate-300 pl-2">
            <span className="flex items-center gap-2">• New complaints</span>
            <span className="flex items-center gap-2 text-neon-red">• Verified complaints 🚨</span>
            <span className="flex items-center gap-2 text-neon-red">• AI fraud alerts 🚨</span>
            <span className="flex items-center gap-2 text-orange-400">• Suspicious transactions</span>
          </div>
        </motion.div>

      </div>

      {/* Final Summary and Perfect Answer Box */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-8 relative p-[1px] rounded-2xl bg-gradient-to-r from-neon-purple via-neon-blue to-neon-green">
        <div className="bg-slate-900 rounded-2xl p-8">
          <h3 className="text-xl font-black text-white mb-4">🎯 Final Role Summary</h3>
          <ul className="text-slate-300 mb-6 list-none space-y-1">
            <li>✔ Verify project completion</li>
            <li>✔ Check fund usage</li>
            <li>✔ Investigate fraud alerts</li>
            <li>✔ Review citizen complaints</li>
            <li>✔ Take final decisions</li>
          </ul>
          
          <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-5 mb-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-neon-cyan"></div>
            <p className="text-xs text-neon-cyan uppercase tracking-widest font-bold mb-2">🎤 Perfect Answer (Use This in Presentation)</p>
            <p className="text-lg text-white font-medium italic">
              "The auditor is responsible for validating project execution and fund utilization. They investigate AI-generated fraud alerts, review citizen complaints, analyze transaction flows, and take final decisions on whether a case is genuine or fraudulent."
            </p>
          </div>
        </div>
      </motion.div>

    </div>
  );
};
