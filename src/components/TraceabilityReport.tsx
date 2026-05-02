import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BLOCKCHAIN_TRANSACTIONS, FRAUD_ALERTS, CITIZEN_REPORTS, MIDDLEMAN_NETWORK, DIGITAL_IDENTITIES } from '../data/mockData';
import { FileText, User, CheckCircle2, ArrowRight, Link as LinkIcon, AlertTriangle, Camera, Network, Download, Search } from 'lucide-react';
import { RoleType } from '../App';
import { AuditorGuidelines } from './AuditorGuidelines';

const TRACE_REPORT = {
  projectId: 'PRJ-441',
  projectName: 'NH-44 Road Repair — Ward 12, Hyderabad',
  totalFunds: 50000000,
  overallFraudScore: 91,
  requestedBy: { id: 'DA-HYD-12', name: 'Dist. Admin (Hyderabad)', role: 'Admin' },
  approvedBy:  { id: 'AUD-772',   name: 'Auditor Ramesh K.',       role: 'Auditor' },
  vendor:      { id: 'VND-LT-07', name: 'L&T Construction',        role: 'Vendor'  },
};

export const TraceabilityReport = ({ role }: { role: RoleType }) => {
  const [exported, setExported] = useState(false);

  const alert = FRAUD_ALERTS.find(a => a.entities.includes('Auditor_ID_772') || a.type.includes('Circular'));
  const citizenReport = CITIZEN_REPORTS[0];
  const identity = (id: string) => DIGITAL_IDENTITIES.find(d => d.id === id);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {role === 'auditor' && <AuditorGuidelines role={role} />}

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <FileText className="text-neon-blue" size={28} />
            <h2 className="text-2xl font-bold">Full Traceability Report</h2>
          </div>
          <p className="text-slate-400 text-sm">Project: <span className="text-white font-medium">{TRACE_REPORT.projectName}</span></p>
          <p className="text-slate-500 text-xs font-mono mt-1">ID: {TRACE_REPORT.projectId} · Generated: 2026-05-02 04:07 UTC</p>
        </div>
        <div className="flex flex-col items-end gap-3">
          {/* Overall fraud score */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-5 py-3 text-center">
            <p className="text-xs text-slate-400 mb-1">Overall Fraud Score</p>
            <p className="text-3xl font-black text-neon-red">{TRACE_REPORT.overallFraudScore}<span className="text-lg text-slate-400">/100</span></p>
          </div>
          {(role === 'admin' || role === 'auditor') && (
            <button onClick={() => setExported(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${exported ? 'bg-green-500 text-white' : 'bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white'}`}>
              <Download size={16} />
              {exported ? 'Report Exported' : 'Export PDF Report'}
            </button>
          )}
        </div>
      </div>

      {/* SECTION 1: WHO DID WHAT */}
      <section className="glass-panel rounded-xl p-6">
        <h3 className="font-bold text-white mb-5 flex items-center gap-2 text-lg">
          <User size={18} className="text-neon-blue" /> Accountability Chain — Who Did What
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          {[
            { label: 'Requested By', actor: TRACE_REPORT.requestedBy, color: 'border-yellow-500/40 bg-yellow-500/5' },
            null,
            { label: 'Approved By', actor: TRACE_REPORT.approvedBy, color: 'border-red-500/40 bg-red-500/10' },
            null,
            { label: 'Received By', actor: TRACE_REPORT.vendor, color: 'border-neon-green/40 bg-neon-green/5' },
          ].map((item, i) => {
            if (!item) return <ArrowRight key={i} size={24} className="text-slate-500 shrink-0" />;
            const risk = identity(item.actor.id)?.riskScore ?? 0;
            return (
              <div key={i} className={`flex-1 min-w-[170px] rounded-xl border p-4 ${item.color}`}>
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">{item.label}</p>
                <p className="font-bold text-white text-sm">{item.actor.name}</p>
                <p className="text-xs text-slate-500 font-mono mt-1">{item.actor.id}</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 bg-slate-800 rounded-full h-1">
                    <div className={`h-1 rounded-full ${risk > 70 ? 'bg-red-500' : risk > 40 ? 'bg-yellow-400' : 'bg-green-500'}`} style={{ width: `${risk}%` }} />
                  </div>
                  <span className={`text-xs font-bold ${risk > 70 ? 'text-red-400' : risk > 40 ? 'text-yellow-400' : 'text-green-400'}`}>Risk {risk}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: BLOCKCHAIN TRANSACTION HISTORY */}
      <section className="glass-panel rounded-xl p-6">
        <h3 className="font-bold text-white mb-5 flex items-center gap-2 text-lg">
          <LinkIcon size={18} className="text-neon-blue" /> Blockchain Transaction History
        </h3>
        <div className="space-y-3">
          {BLOCKCHAIN_TRANSACTIONS.map((tx, i) => {
            const isFlagged = tx.status === 'Flagged';
            return (
              <motion.div key={tx.txHash} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                className={`flex flex-wrap items-center gap-3 p-3 rounded-lg border text-sm ${isFlagged ? 'bg-red-900/20 border-red-500/30' : 'bg-slate-900/40 border-slate-700/50'}`}>
                <span className={`w-2 h-2 rounded-full shrink-0 ${isFlagged ? 'bg-neon-red animate-pulse' : 'bg-neon-green'}`} />
                <span className="font-mono text-xs text-slate-400 shrink-0">#{tx.block}</span>
                <span className="text-slate-300 font-medium shrink-0">{tx.sender.label}</span>
                <ArrowRight size={14} className={isFlagged ? 'text-red-400' : 'text-slate-500'} />
                <span className={`font-medium shrink-0 ${isFlagged ? 'text-red-300' : 'text-slate-300'}`}>{tx.receiver.label}</span>
                <span className="ml-auto font-bold text-neon-blue shrink-0">₹{(tx.amount / 100000).toFixed(1)}L</span>
                <span className="text-xs text-slate-500 font-mono shrink-0">{tx.timestamp}</span>
                {isFlagged && <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded">⚠️ SUSPICIOUS</span>}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: AI FRAUD EVIDENCE */}
      <section className="glass-panel rounded-xl p-6">
        <h3 className="font-bold text-white mb-5 flex items-center gap-2 text-lg">
          <AlertTriangle size={18} className="text-neon-red" /> AI Fraud Evidence
        </h3>
        {FRAUD_ALERTS.slice(0, 2).map((a, i) => (
          <div key={a.id} className={`mb-4 p-4 rounded-lg border border-red-500/20 bg-red-900/10`}>
            <div className="flex justify-between items-start mb-2">
              <span className="font-bold text-red-300 text-sm">{a.type}</span>
              <span className="text-lg font-black text-neon-red">{a.fraudScore}/100</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{a.description}</p>
            <div className="mt-2 w-full bg-slate-800 rounded-full h-1.5">
              <motion.div initial={{ width: 0 }} animate={{ width: `${a.fraudScore}%` }} transition={{ duration: 0.8, delay: i * 0.1 }}
                className="h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500" />
            </div>
          </div>
        ))}
      </section>

      {/* SECTION 4: CITIZEN PROOF */}
      <section className="glass-panel rounded-xl p-6">
        <h3 className="font-bold text-white mb-5 flex items-center gap-2 text-lg">
          <Camera size={18} className="text-neon-green" /> Citizen Ground-Truth Evidence
        </h3>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Vendor Claim</p>
            <p className="font-bold text-white">{citizenReport.claimedProgress}</p>
            <p className="text-xs text-slate-500 mt-1">Project: {citizenReport.projectId} · {citizenReport.location}</p>
          </div>
          <div className="bg-red-900/20 rounded-lg p-4 border border-red-500/20">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">AI Image Analysis</p>
            <p className="font-bold text-red-300">{citizenReport.aiAnalysis}</p>
            <p className="text-xs text-slate-500 mt-1">Status: <span className="text-red-400">{citizenReport.status}</span></p>
          </div>
        </div>
        <div className="mt-4 rounded-lg overflow-hidden border border-slate-700">
          <img src={citizenReport.citizenPhoto} alt="Citizen uploaded evidence" className="w-full h-40 object-cover" />
          <div className="bg-slate-900/80 px-3 py-2 text-xs text-slate-400">📸 Citizen upload · GPS-verified · Uploaded via Citizen Complaint #CMP-001</div>
        </div>
      </section>

      {/* SECTION 5: MIDDLEMAN LINKS */}
      <section className="glass-panel rounded-xl p-6">
        <h3 className="font-bold text-white mb-5 flex items-center gap-2 text-lg">
          <Network size={18} className="text-neon-purple" /> Middleman Links Detected
        </h3>
        <div className="space-y-3">
          {MIDDLEMAN_NETWORK.links.filter(l => l.suspicious).map((link, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-red-900/20 border border-red-500/20 text-sm">
              <span className="text-neon-red shrink-0">⚠️</span>
              <span className="text-slate-300">{MIDDLEMAN_NETWORK.nodes.find(n => n.id === link.source)?.label}</span>
              <ArrowRight size={14} className="text-red-400 shrink-0" />
              <span className="text-red-300 font-medium">{MIDDLEMAN_NETWORK.nodes.find(n => n.id === link.target)?.label}</span>
              <span className="ml-auto text-xs font-bold text-red-400">{link.label}</span>
            </div>
          ))}
          <div className="mt-3 space-y-2">
            {MIDDLEMAN_NETWORK.sharedIdentifiers.map((item, i) => (
              <div key={i} className="text-xs bg-slate-900/50 rounded px-3 py-2 border border-slate-700 text-slate-400">
                🔗 Shared {item.field}: <span className="font-mono text-white">{item.value}</span> — links <span className="text-red-400">{item.linkedTo.join(' & ')}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
