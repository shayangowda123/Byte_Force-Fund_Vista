import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FRAUD_ALERTS, BUDGET_REQUESTS, MIDDLEMAN_NETWORK, DECOY_TRAPS, SHADOW_AUDIT_CONFLICTS, BEHAVIORAL_PROFILES } from '../data/mockData';
import { AlertTriangle, ShieldOff, Search, Network, Check, Crosshair, GitBranch, Link as LinkIcon, Brain, Eye, TrendingUp, User, Activity, Clock, Target } from 'lucide-react';
import { RoleType } from '../App';

export const FraudAlerts = ({ role }: { role: RoleType }) => {
  const [actedAlerts, setActedAlerts] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'alerts' | 'shadow' | 'budget' | 'middleman' | 'decoy' | 'behavioral'>('alerts');

  const handleAction = (id: string, actionName: string) => {
    setActedAlerts(prev => ({ ...prev, [id]: actionName }));
  };

  const tabs = [
    { id: 'alerts',     label: 'AI Fraud Alerts',    count: FRAUD_ALERTS.length },
    { id: 'shadow',     label: 'Shadow Audit',        count: SHADOW_AUDIT_CONFLICTS.filter(s => s.status.includes('Conflict')).length },
    { id: 'budget',     label: 'Budget Intelligence', count: BUDGET_REQUESTS.filter(b => b.status !== 'Approved').length },
    { id: 'middleman',  label: 'Middleman Network',   count: null },
    { id: 'decoy',      label: 'Decoy Traps',         count: DECOY_TRAPS.filter(d => d.status === 'Caught').length },
    { id: 'behavioral', label: 'Role-Based AI',       count: BEHAVIORAL_PROFILES.filter(b => b.riskScore > 70).length },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-1">AI Intelligence & Fraud Detection</h2>
          <p className="text-slate-400 text-sm">Real-time fraud scoring, shadow audits, budget validation, middleman detection, decoy traps & behavioral profiling.</p>
        </div>
        <div className="bg-neon-red/10 text-neon-red px-4 py-2 rounded-lg border border-neon-red/20 flex items-center text-sm font-bold">
          <AlertTriangle className="mr-2" size={18} />3 Critical · 4 High
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-dark-border">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors -mb-px flex items-center gap-1.5 ${activeTab === tab.id ? 'border-neon-blue text-neon-blue bg-neon-blue/5' : 'border-transparent text-slate-400 hover:text-white'}`}>
            {tab.label}
            {tab.count != null && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-neon-blue/20 text-neon-blue' : 'bg-slate-700 text-slate-400'}`}>{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* TAB: AI Fraud Alerts */}
      {activeTab === 'alerts' && (
        <div className="space-y-5">
          {FRAUD_ALERTS.map((alert, index) => (
            <motion.div key={alert.id} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }}
              className="glass-panel p-6 rounded-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row gap-6">
                <div className="shrink-0 pt-1">
                  <div className={`p-3 rounded-xl inline-flex ${alert.severity === 'Critical' ? 'bg-red-500/20 text-neon-red border border-red-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}`}>
                    {alert.type.includes('Shadow') ? <Search size={28} /> : alert.type.includes('Circular') ? <Network size={28} /> : <ShieldOff size={28} />}
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-bold text-white">{alert.type}</h3>
                    <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-slate-400">{alert.id}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${alert.severity === 'Critical' ? 'bg-red-500/10 border-red-500/40 text-red-400' : 'bg-yellow-500/10 border-yellow-500/40 text-yellow-400'}`}>{alert.severity}</span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{alert.description}</p>
                  <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">AI Fraud Score</span>
                      <span className={`text-xl font-black ${alert.fraudScore >= 90 ? 'text-neon-red' : 'text-yellow-400'}`}>{alert.fraudScore}/100</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${alert.fraudScore}%` }} transition={{ duration: 1, delay: index * 0.2 }}
                        className={`h-2 rounded-full ${alert.fraudScore >= 90 ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gradient-to-r from-yellow-400 to-orange-500'}`} />
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Reason: {alert.scoreReason}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-xs text-slate-500">Entities:</span>
                    {alert.entities.map(e => <span key={e} className="text-xs bg-slate-800 border border-slate-700 px-2 py-0.5 rounded font-mono text-slate-300">{e}</span>)}
                  </div>
                </div>
                <div className="shrink-0 flex flex-col justify-between items-end gap-2">
                  <span className="text-xs text-slate-500">{alert.date}</span>
                  {role === 'admin' && (
                    <button onClick={() => handleAction(alert.id, 'Halted')} disabled={!!actedAlerts[alert.id]}
                      className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-colors ${actedAlerts[alert.id] === 'Halted' ? 'bg-red-500 text-white' : 'bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white'}`}>
                      {actedAlerts[alert.id] === 'Halted' ? <><Check size={14} className="mr-1" />Halted & Logged</> : 'Investigate & Halt'}
                    </button>
                  )}
                  {role === 'auditor' && (
                    <button onClick={() => handleAction(alert.id, 'Reviewed')} disabled={!!actedAlerts[alert.id]}
                      className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-colors ${actedAlerts[alert.id] === 'Reviewed' ? 'bg-yellow-500 text-white' : 'bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white'}`}>
                      {actedAlerts[alert.id] === 'Reviewed' ? <><Check size={14} className="mr-1" />Under Review</> : 'Review Audit Log'}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* TAB: Shadow Audit */}
      {activeTab === 'shadow' && (
        <div className="space-y-5">
          <p className="text-slate-400 text-sm">AI runs a parallel audit alongside every human auditor decision. Conflicts are permanently logged and trigger higher-level review.</p>
          {SHADOW_AUDIT_CONFLICTS.map((sac, index) => {
            const isConflict = sac.status.includes('Conflict');
            return (
              <motion.div key={sac.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.12 }}
                className={`glass-panel rounded-xl p-6 border ${isConflict ? 'border-red-500/40' : 'border-green-500/30'}`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-white flex items-center gap-2">
                      <Eye size={18} className={isConflict ? 'text-neon-red' : 'text-neon-green'} />
                      Shadow Audit — Project {sac.projectId}
                    </h3>
                    <span className="text-xs text-slate-500 font-mono">{sac.id} · Auditor: {sac.auditorName} ({sac.auditorId}) · {sac.date}</span>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full border font-bold ${isConflict ? 'bg-red-500/15 border-red-500/40 text-red-400' : 'bg-green-500/15 border-green-500/40 text-green-400'}`}>
                    {sac.status}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-700">
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1"><Check size={12} className="text-slate-500" /> Human Auditor Decision</p>
                    <p className="text-sm font-medium text-white">{sac.auditorDecision}</p>
                  </div>
                  <div className={`rounded-lg p-4 border ${isConflict ? 'bg-red-900/20 border-red-500/30' : 'bg-green-900/20 border-green-500/30'}`}>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1"><Brain size={12} className="text-neon-blue" /> AI Shadow Decision</p>
                    <p className={`text-sm font-medium ${isConflict ? 'text-red-300' : 'text-green-300'}`}>{sac.aiDecision}</p>
                  </div>
                </div>

                {isConflict && (
                  <div className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-slate-400">Conflict Severity</span>
                      <span className="text-xs font-bold text-red-400">{sac.conflictScore}/100</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${sac.conflictScore}%` }} transition={{ duration: 0.8 }}
                        className="h-1.5 rounded-full bg-gradient-to-r from-yellow-500 to-red-500" />
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-900/50 rounded px-3 py-2 text-slate-400">📸 Citizen Evidence: <span className="text-slate-300">{sac.citizenEvidence}</span></div>
                  <div className="bg-slate-900/50 rounded px-3 py-2 text-slate-400">🛰️ Satellite Note: <span className="text-slate-300">{sac.satelliteNote}</span></div>
                </div>

                {isConflict && role === 'admin' && (
                  <div className="mt-4 flex gap-2 justify-end">
                    <button onClick={() => handleAction(sac.id, 'AuditorFlagged')} disabled={!!actedAlerts[sac.id]}
                      className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-colors ${actedAlerts[sac.id] ? 'bg-red-500 text-white' : 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40'}`}>
                      {actedAlerts[sac.id] ? <><Check size={14} className="mr-1" />Auditor Flagged</> : 'Flag Auditor'}
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* TAB: Budget Intelligence */}
      {activeTab === 'budget' && (
        <div className="space-y-4">
          <p className="text-slate-400 text-sm">AI compares submitted budgets against historical data, market rates, and regional pricing. Outputs a Budget Risk Score and suggested realistic amount.</p>
          {BUDGET_REQUESTS.map((req, index) => {
            const statusColor = req.status === 'Approved' ? 'border-green-500/40 bg-green-500/5' : req.status === 'Blocked' ? 'border-red-500/40 bg-red-500/5' : 'border-yellow-500/40 bg-yellow-500/5';
            const badgeColor = req.status === 'Approved' ? 'bg-green-500/20 text-green-400 border-green-500/30' : req.status === 'Blocked' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            const riskScore = req.status === 'Approved' ? 8 : req.status === 'Blocked' ? 87 : 64;
            return (
              <motion.div key={req.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
                className={`glass-panel rounded-xl p-5 border ${statusColor}`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-white">{req.projectName}</h3>
                    <span className="text-xs text-slate-500 font-mono">{req.id} · Admin: {req.adminId}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full border font-bold ${badgeColor}`}>{req.status}</span>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                  <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                    <p className="text-slate-500 text-xs mb-1">Admin Request</p>
                    <p className="font-bold text-white">₹{(req.requestedAmount / 100000).toFixed(1)}L</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                    <p className="text-slate-500 text-xs mb-1">AI Suggested</p>
                    <p className="font-bold text-neon-blue">₹{(req.aiEstimate / 100000).toFixed(1)}L</p>
                  </div>
                  <div className={`rounded-lg p-3 text-center ${req.status === 'Approved' ? 'bg-green-900/20' : 'bg-red-900/20'}`}>
                    <p className="text-slate-500 text-xs mb-1">Variance</p>
                    <p className={`font-black text-lg ${req.status === 'Approved' ? 'text-green-400' : 'text-red-400'}`}>{req.variance}</p>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-slate-400">Budget Risk Score</span>
                    <span className={`text-xs font-bold ${riskScore > 70 ? 'text-red-400' : riskScore > 40 ? 'text-yellow-400' : 'text-green-400'}`}>{riskScore}/100</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${riskScore}%` }} transition={{ duration: 0.8 }}
                      className={`h-1.5 rounded-full ${riskScore > 70 ? 'bg-gradient-to-r from-orange-500 to-red-500' : riskScore > 40 ? 'bg-yellow-400' : 'bg-green-500'}`} />
                  </div>
                </div>
                <p className="text-xs text-slate-400 bg-slate-900/40 rounded px-3 py-2">🔍 AI Reason: {req.reason}</p>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* TAB: Middleman Network */}
      {activeTab === 'middleman' && (
        <div className="space-y-6">
          <p className="text-slate-400 text-sm">Graph/network analysis mapping all financial transactions to expose circular flows, indirect transfers, and hidden entity relationships.</p>
          <div className="glass-panel rounded-xl p-6 border border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
            <h3 className="font-bold text-white mb-6 flex items-center gap-2"><GitBranch size={18} className="text-neon-red" /> Middleman Links Detected</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex flex-wrap items-center gap-3 bg-slate-900/50 p-4 rounded-xl border border-red-500/20">
                <span className="text-xl">⚠️</span>
                <span className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded border border-slate-700">Vendor ABC</span>
                <span className="text-slate-500 font-bold">→</span>
                <span className="px-3 py-1.5 bg-red-500/10 text-red-400 rounded border border-red-500/30 font-bold">Shell Co. (Ghost)</span>
                <span className="text-slate-500 font-bold">→</span>
                <span className="text-red-400 font-black">₹6.6L (15%)</span>
              </div>
              
              <div className="flex flex-wrap items-center gap-3 bg-slate-900/50 p-4 rounded-xl border border-red-500/20">
                <span className="text-xl">⚠️</span>
                <span className="px-3 py-1.5 bg-red-500/10 text-red-400 rounded border border-red-500/30 font-bold">Shell Co. (Ghost)</span>
                <span className="text-slate-500 font-bold">→</span>
                <span className="px-3 py-1.5 bg-orange-500/10 text-orange-400 rounded border border-orange-500/30">Admin Relative</span>
                <span className="text-slate-500 font-bold">→</span>
                <span className="text-red-400 font-black">₹6L</span>
              </div>
            </div>

            <h3 className="font-bold text-white mb-4 flex items-center gap-2"><LinkIcon size={18} className="text-neon-purple" /> Shared Identifiers — Hidden Links</h3>
            
            <div className="space-y-3">
              <div className="bg-slate-900/80 border border-slate-700 rounded-lg p-4 flex items-center gap-3">
                <span className="text-xl">🔗</span>
                <div>
                  <p className="text-sm text-slate-300">
                    <span className="font-bold text-white">Shared Phone: +91-9876543210</span> — links <span className="text-neon-blue">Admin_ID_109</span> & <span className="text-neon-red">Shell Co. Reg.</span>
                  </p>
                </div>
              </div>
              
              <div className="bg-slate-900/80 border border-slate-700 rounded-lg p-4 flex items-center gap-3">
                <span className="text-xl">🔗</span>
                <div>
                  <p className="text-sm text-slate-300">
                    <span className="font-bold text-white">Shared Bank IFSC: SBIN0001234</span> — links <span className="text-slate-400">Vendor ABC</span> & <span className="text-orange-400">Admin Relative Account</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: Decoy Traps */}
      {activeTab === 'decoy' && (
        <div className="space-y-4">
          <p className="text-slate-400 text-sm">Government secretly releases controlled fake funds. Any entity that accesses or diverts them is immediately caught, traced, and marked as high-risk.</p>
          {DECOY_TRAPS.map((trap, index) => {
            const isCaught = trap.status === 'Caught';
            return (
              <motion.div key={trap.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
                className={`glass-panel rounded-xl p-6 border ${isCaught ? 'border-red-500/40' : 'border-neon-blue/30'}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isCaught ? 'bg-red-500/20 text-red-400' : 'bg-neon-blue/20 text-neon-blue'}`}><Crosshair size={22} /></div>
                    <div>
                      <h3 className="font-bold text-white">{trap.projectName}</h3>
                      <span className="text-xs text-slate-500 font-mono">{trap.id} · Released: {trap.releaseDate}</span>
                    </div>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full border font-bold ${isCaught ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-neon-blue/10 border-neon-blue/30 text-neon-blue'}`}>{trap.status}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-slate-900/50 rounded-lg p-3">
                    <p className="text-slate-500 text-xs mb-1">Decoy Fund Amount</p>
                    <p className="font-bold text-white">₹{(trap.fundsReleased / 100000).toFixed(1)}L</p>
                  </div>
                  <div className={`rounded-lg p-3 ${isCaught ? 'bg-red-900/20' : 'bg-slate-900/50'}`}>
                    <p className="text-slate-500 text-xs mb-1">Triggered By</p>
                    <p className={`font-bold ${isCaught ? 'text-red-400' : 'text-slate-400'}`}>{trap.triggeredBy ?? 'No activity yet'}</p>
                  </div>
                </div>
                {isCaught && trap.identityTrace && (
                  <div className="mt-4 bg-red-900/20 border border-red-500/20 rounded-lg px-4 py-3">
                    <p className="text-xs text-slate-400 mb-1">🔍 Identity Trace</p>
                    <p className="text-sm text-red-300">{trap.identityTrace}</p>
                    <p className="text-xs text-slate-500 mt-1 font-mono">Triggered at: {trap.triggeredAt}</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* TAB: Role-Based AI */}
      {activeTab === 'behavioral' && (
        <div className="space-y-6">
          <div className="glass-panel rounded-xl p-6 border border-dark-border bg-gradient-to-r from-slate-900/80 to-neon-blue/5">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2"><Brain size={22} className="text-neon-blue" /> Unified AI Fraud Scoring</h3>
                <p className="text-sm text-slate-400 mt-1">Final Fraud Score = Auditor Risk (30%) + Admin Risk (40%) + Vendor Risk (30%)</p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-black text-red-400">76</span><span className="text-slate-500 font-bold">/100</span>
                <p className="text-xs font-bold text-red-400 uppercase tracking-widest mt-1">High Risk</p>
              </div>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3">
              <motion.div initial={{ width: 0 }} animate={{ width: '76%' }} transition={{ duration: 1 }}
                className="h-3 rounded-full bg-gradient-to-r from-yellow-500 to-red-500" />
            </div>
            <div className="flex justify-between text-xs font-mono text-slate-500 mt-2 px-1">
              <span>0-30: Safe</span>
              <span>30-60: Monitor</span>
              <span>60-80: High Risk</span>
              <span>80-100: Critical</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 hover:border-neon-blue/50 transition-colors">
              <Activity className="text-neon-blue mb-3" size={24} />
              <h4 className="font-bold text-white text-sm mb-1">1. Statistical Baseline</h4>
              <p className="text-xs text-slate-400 mb-2">Learns normal ranges (amounts, approval %). Fast, real-time anomaly detection.</p>
              <code className="text-[10px] text-slate-500 bg-slate-900 px-2 py-1 rounded block">if amt &gt; avg + (2*std_dev) → FLAG</code>
            </div>
            
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 hover:border-neon-purple/50 transition-colors">
              <Target className="text-neon-purple mb-3" size={24} />
              <h4 className="font-bold text-white text-sm mb-1">2. Isolation Forest</h4>
              <p className="text-xs text-slate-400 mb-2">Isolates outliers in multi-dimensional space. Best for unknown/new fraud types.</p>
              <code className="text-[10px] text-slate-500 bg-slate-900 px-2 py-1 rounded block">if score == -1 → ANOMALY</code>
            </div>
            
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 hover:border-yellow-400/50 transition-colors">
              <Clock className="text-yellow-400 mb-3" size={24} />
              <h4 className="font-bold text-white text-sm mb-1">3. Time-Based Analysis</h4>
              <p className="text-xs text-slate-400 mb-2">Detects unusual timing (e.g., midnight transfers, rapid burst approvals).</p>
              <code className="text-[10px] text-slate-500 bg-slate-900 px-2 py-1 rounded block">if time == "2 AM" → UNUSUAL</code>
            </div>
            
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 hover:border-neon-red/50 transition-colors">
              <Network className="text-neon-red mb-3" size={24} />
              <h4 className="font-bold text-white text-sm mb-1">4. Graph Pattern Learning</h4>
              <p className="text-xs text-slate-400 mb-2">Learns normal money flows. Detects circular kickback chains and hidden links.</p>
              <code className="text-[10px] text-slate-500 bg-slate-900 px-2 py-1 rounded block">if graph.has_cycle() → CIRCULAR</code>
            </div>
          </div>

          <div className="mt-8 mb-4">
            <h3 className="text-lg font-bold text-white">Role-Specific Detection Layers</h3>
            <p className="text-slate-400 text-sm">Separate risk formulas and flags for Admins, Auditors, and Vendors based on the above models.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {BEHAVIORAL_PROFILES.map((profile, index) => (
              <motion.div key={profile.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.12 }}
                className={`glass-panel rounded-xl p-5 border flex flex-col ${profile.riskScore > 70 ? 'border-red-500/30' : profile.riskScore > 50 ? 'border-yellow-500/30' : 'border-dark-border'}`}>
                
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-white flex items-center gap-2">
                      <User size={16} className={profile.role === 'Admin' ? 'text-neon-red' : profile.role === 'Auditor' ? 'text-neon-purple' : 'text-neon-green'} />
                      {profile.role} Detection
                    </h3>
                    <p className="text-sm font-medium text-slate-300 mt-1">{profile.actorName}</p>
                    <span className="text-xs text-slate-500 font-mono mt-0.5 block">{profile.id} · {profile.entityId}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-slate-900/60 rounded-lg p-3 mb-4 border border-slate-700/50">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wide">Risk Score</span>
                  <div className="flex items-center gap-2">
                    <TrendingUp size={14} className={profile.trend === 'Increasing' ? 'text-red-400' : 'text-slate-400'} />
                    <span className={`text-lg font-black ${profile.riskScore > 70 ? 'text-red-400' : profile.riskScore > 50 ? 'text-yellow-400' : 'text-green-400'}`}>
                      {profile.riskScore}/100
                    </span>
                  </div>
                </div>

                <div className="flex-1 space-y-3 mb-4">
                  <p className="text-xs text-slate-500 font-mono bg-slate-900/40 px-2 py-1.5 rounded">{profile.formula}</p>
                  <div className="space-y-2.5 mt-3">
                    {profile.flags.map((flag, i) => (
                      <div key={i} className="text-sm bg-slate-900/40 rounded px-3 py-2 border-l-2 border-neon-red">
                        <span className="font-bold text-white block mb-0.5 flex items-center gap-1.5">🚩 {flag.name}</span>
                        <span className="text-slate-400 text-xs">{flag.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-3 border-t border-dark-border/50 text-xs text-slate-500 text-right">
                  Flagged since: {profile.flaggedSince}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
