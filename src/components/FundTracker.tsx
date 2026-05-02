import React from 'react';
import { motion } from 'framer-motion';
import { BLOCKCHAIN_TRANSACTIONS, DIGITAL_IDENTITIES } from '../data/mockData';
import { Link as LinkIcon, CheckCircle2, AlertTriangle, User, ArrowRight, ShieldCheck, Database, FileKey, ShieldAlert, Target } from 'lucide-react';
import { RoleType } from '../App';

const roleColor: Record<string, string> = {
  Government: 'bg-neon-blue/20 text-neon-blue border-neon-blue/30',
  State:       'bg-purple-500/20 text-purple-300 border-purple-500/30',
  District:    'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  Vendor:      'bg-neon-green/20 text-neon-green border-neon-green/30',
  Unknown:     'bg-red-500/20 text-red-400 border-red-500/30',
};

const SMART_CONTRACT_LOGS = [
  { id: 1, title: 'Fund Flow Tracking', icon: <Database size={16} className="text-neon-blue" />, hash: '0x992b...ff11', data: '{ sender: "Govt", receiver: "Admin", amount: "₹5Cr", tx_id: "TX-0912" }', desc: 'Detects circular flow & hidden middlemen.' },
  { id: 2, title: 'Audit Module', icon: <FileKey size={16} className="text-neon-purple" />, hash: '0x3a4b...9c2d', data: '{ audit_id: "AUD-441", auditor_id: "772", approval_pct: 100, report_hash: "0x..." }', desc: 'If someone changes report → hash mismatch 🚨' },
  { id: 3, title: 'Complaint Module', icon: <User size={16} className="text-neon-green" />, hash: '0x8f71...eeb2', data: '{ complaint_id: "CMP-001", project_id: "PRJ-441", proof_hash: "0x..." }', desc: 'Complaint cannot be deleted; Proof is tamper-proof.' },
  { id: 4, title: 'Verification Module', icon: <CheckCircle2 size={16} className="text-green-400" />, hash: '0x1c8d...4f3a', data: '{ complaint_id: "CMP-001", verify_count: 12, reject_count: 2, final_status: "Verified" }', desc: 'Don’t store every vote → only final result.' },
  { id: 5, title: 'AI Fraud Alerts', icon: <ShieldAlert size={16} className="text-neon-red" />, hash: '0x7e22...aa91', data: '{ alert_id: "ALT-820", fraud_score: 96, reason: "Circular Transaction" }', desc: 'Alerts cannot be removed or altered by admins.' },
  { id: 6, title: 'Decoy Trap (Legal Proof)', icon: <Target size={16} className="text-yellow-400" />, hash: '0x5d1f...bb34', data: '{ wallet: "0x1A2B...", timestamp: "168234...", action: "Unauthorized Transfer" }', desc: 'Becomes legal-level evidence against attackers.' },
];

export const FundTracker = ({ role }: { role: RoleType }) => {
  return (
    <div className="space-y-10">

      {/* STEP 1: Final Architecture (Where Blockchain Fits) */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
            <ShieldCheck size={24} className="text-neon-cyan" /> Final Architecture (Where Blockchain Fits)
          </h2>
          <p className="text-slate-400 text-sm border-l-2 border-neon-cyan pl-3 py-1 bg-slate-900/30">
            "We integrate blockchain as a tamper-proof evidence layer across all critical modules. Instead of storing raw images or full reports, we store cryptographic hashes and key events, ensuring transparency while keeping the system efficient."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {SMART_CONTRACT_LOGS.map(log => (
            <motion.div key={log.id} whileHover={{ y: -4 }} className="glass-panel p-5 rounded-xl border border-dark-border hover:border-slate-600 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-slate-900/50 p-1.5 rounded">{log.icon}</div>
                <h3 className="font-bold text-white text-sm">{log.title}</h3>
              </div>
              <div className="bg-black/40 rounded-lg p-3 mb-3 border border-slate-800">
                <p className="text-[10px] text-slate-500 font-mono mb-1">DATA PAYLOAD</p>
                <code className="text-xs text-neon-green font-mono break-all">{log.data}</code>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">On-Chain Hash</span>
                <span className="text-xs font-mono bg-slate-800 px-2 py-0.5 rounded text-slate-300">{log.hash}</span>
              </div>
              <p className="text-xs text-slate-400 italic">👉 {log.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STEP 2: Blockchain Ledger */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-1">Blockchain Transaction Ledger</h2>
          <p className="text-slate-400 text-sm">Immutable record of fund flow for Project PRJ-441 — Hyperledger Fabric (Channel: gov-main)</p>
        </div>

        <div className="space-y-4">
          {BLOCKCHAIN_TRANSACTIONS.map((tx, index) => {
            const isFlagged = tx.status === 'Flagged';
            return (
              <motion.div
                key={tx.txHash}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`glass-panel rounded-xl p-5 border ${isFlagged ? 'border-red-500/50 shadow-[0_0_20px_rgba(248,113,113,0.15)]' : 'border-dark-border'}`}
              >
                <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${isFlagged ? 'bg-neon-red animate-pulse' : 'bg-neon-green'}`}></span>
                    <span className="text-xs font-mono text-slate-400">Block #{tx.block}</span>
                    <span className={`text-xs px-2 py-0.5 rounded border ${isFlagged ? 'bg-red-500/10 border-red-500/40 text-red-400' : 'bg-green-500/10 border-green-500/30 text-green-400'}`}>
                      {tx.status}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">{tx.txHash}</span>
                  </div>
                  <span className="text-lg font-bold text-neon-blue">₹{(tx.amount / 100000).toFixed(2)} L</span>
                </div>

                {/* Sender → Receiver flow */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium ${roleColor[tx.sender.role] || roleColor.Unknown}`}>
                    <User size={14} />
                    <span>{tx.sender.label}</span>
                    <span className="opacity-60 text-xs">({tx.sender.id})</span>
                  </div>
                  <ArrowRight size={20} className={isFlagged ? 'text-red-400' : 'text-slate-500'} />
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium ${roleColor[tx.receiver.role] || roleColor.Unknown}`}>
                    <User size={14} />
                    <span>{tx.receiver.label}</span>
                    <span className="opacity-60 text-xs">({tx.receiver.id})</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                  <LinkIcon size={12} />
                  <span className="font-mono">{tx.timestamp}</span>
                  <span>·</span>
                  <span className="font-mono text-slate-400">Project: {tx.projectId}</span>
                </div>

                {isFlagged && (
                  <p className="mt-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded px-3 py-2">
                    ⚠️ Suspicious transfer detected — receiver is not a registered entity. Flagged for middleman analysis.
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* STEP 7: Digital Identities */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-1">Digital Identity Registry</h2>
          <p className="text-slate-400 text-sm">Every actor in the system has a unique traceable ID — who requested, who approved, who received.</p>
        </div>

        <div className="glass-panel rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dark-border text-left">
                <th className="px-5 py-3 text-slate-400 font-medium">Identity ID</th>
                <th className="px-5 py-3 text-slate-400 font-medium">Name</th>
                <th className="px-5 py-3 text-slate-400 font-medium">Role</th>
                <th className="px-5 py-3 text-slate-400 font-medium">Transactions</th>
                <th className="px-5 py-3 text-slate-400 font-medium">Risk Score</th>
              </tr>
            </thead>
            <tbody>
              {DIGITAL_IDENTITIES.map((identity, i) => (
                <tr key={identity.id} className={`border-b border-dark-border/50 hover:bg-slate-800/30 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-900/20'}`}>
                  <td className="px-5 py-3 font-mono text-slate-300 text-xs">{identity.id}</td>
                  <td className="px-5 py-3 font-medium text-white">{identity.name}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs border ${roleColor[identity.role] || roleColor.Unknown}`}>
                      {identity.role}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-300">{identity.txCount}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-800 rounded-full h-1.5 w-20">
                        <div
                          className={`h-1.5 rounded-full ${identity.riskScore > 70 ? 'bg-neon-red' : identity.riskScore > 40 ? 'bg-yellow-400' : 'bg-neon-green'}`}
                          style={{ width: `${identity.riskScore}%` }}
                        />
                      </div>
                      <span className={`text-xs font-bold ${identity.riskScore > 70 ? 'text-red-400' : identity.riskScore > 40 ? 'text-yellow-400' : 'text-green-400'}`}>
                        {identity.riskScore}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
