import React from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle2, XCircle, AlertTriangle, Play, Brain, Link as LinkIcon, Camera, User, Hash } from 'lucide-react';

export const ComplaintDetailsModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel border border-slate-600 rounded-2xl shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-slate-900/90 backdrop-blur-md border-b border-slate-700 p-5 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
                High Alert
              </span>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Complaint Verification Review
              </h2>
            </div>
            <p className="text-sm text-slate-400 mt-1 flex items-center gap-2">
              <Hash size={14} /> CMP-001 <span className="mx-2 text-slate-600">|</span> 📂 Project: PRJ-441
            </p>
          </div>
          <button onClick={onClose} className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Complaint Details & Proof */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Complaint Info */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Road work incomplete & muddy</h3>
                  <p className="text-sm text-slate-400 flex items-center gap-2">
                    <User size={14} /> Raised by: <span className="font-mono text-slate-300">User_23A (Masked)</span>
                  </p>
                </div>
                <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-3 py-1 rounded-full text-xs font-bold">
                  Status: Pending Audit
                </span>
              </div>
              
              <div className="mb-4">
                <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Issue Description</p>
                <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                  The vendor reported 100% completion for this road segment, but it is completely unpaved and muddy. No tar has been laid down. The funds appear to be entirely misused.
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-2 flex items-center gap-1">
                  <Camera size={14} /> Citizen Photographic Proof
                </p>
                <div className="relative rounded-lg overflow-hidden border border-slate-700 aspect-video bg-slate-900">
                  <img 
                    src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80" 
                    alt="Muddy unpaved road" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2 text-xs text-white">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    GPS Metadata Verified
                  </div>
                </div>
              </div>
            </div>

            {/* Auditor Actions */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">Auditor Action Panel</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button className="flex flex-col items-center justify-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 p-3 rounded-xl transition-all hover:scale-105">
                  <Play size={20} />
                  <span className="text-xs font-bold">Start Re-Audit</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-2 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 p-3 rounded-xl transition-all hover:scale-105">
                  <CheckCircle2 size={20} />
                  <span className="text-xs font-bold">Approve Complaint</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-2 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 text-slate-300 p-3 rounded-xl transition-all hover:scale-105">
                  <XCircle size={20} />
                  <span className="text-xs font-bold">Reject Complaint</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 p-3 rounded-xl transition-all hover:scale-105 shadow-[0_0_15px_rgba(239,68,68,0.15)]">
                  <AlertTriangle size={20} />
                  <span className="text-xs font-bold">Flag as Fraud</span>
                </button>
              </div>
            </div>
            
          </div>

          {/* Right Column: AI, Validation & Blockchain */}
          <div className="space-y-6">
            
            {/* Citizen Verification Metrics */}
            <div className="bg-gradient-to-b from-slate-800/80 to-slate-900/80 border border-slate-700 rounded-xl p-5">
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                👥 Crowd Verification
              </h3>
              
              <div className="flex justify-between items-end mb-5">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Final Status</p>
                  <p className="text-xl font-black text-neon-green flex items-center gap-2">
                    <CheckCircle2 size={20} /> VERIFIED
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 mb-1">Confidence</p>
                  <p className="text-lg font-bold text-white">94%</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center bg-slate-900/50 p-2.5 rounded border border-slate-700/50">
                  <span className="text-sm text-slate-400 flex items-center gap-2"><CheckCircle2 size={14} className="text-green-400"/> Verify Count</span>
                  <span className="font-bold text-white">12</span>
                </div>
                <div className="flex justify-between items-center bg-slate-900/50 p-2.5 rounded border border-slate-700/50">
                  <span className="text-sm text-slate-400 flex items-center gap-2"><XCircle size={14} className="text-red-400"/> Reject Count</span>
                  <span className="font-bold text-white">2</span>
                </div>
                <div className="flex justify-between items-center bg-slate-900/50 p-2.5 rounded border border-slate-700/50">
                  <span className="text-sm text-slate-400 flex items-center gap-2"><span className="text-yellow-400">⭐</span> Trusted Votes</span>
                  <span className="font-bold text-white">4</span>
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-blue-900/10 border border-neon-blue/30 rounded-xl p-5 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 opacity-10">
                <Brain size={100} className="text-neon-blue" />
              </div>
              <h3 className="text-sm font-bold text-neon-blue uppercase tracking-wider mb-4 flex items-center gap-2 relative z-10">
                <Brain size={16} /> AI Insights
              </h3>
              
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-slate-400">Fraud Score</span>
                  <span className="text-sm font-black text-red-400">82/100 (High Risk)</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 h-1.5 rounded-full w-[82%] shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-500 uppercase">Detection Reasons:</p>
                <ul className="text-sm text-slate-300 space-y-2">
                  <li className="flex items-start gap-2 bg-slate-900/60 p-2 rounded border border-slate-700/50">
                    <AlertTriangle size={14} className="text-yellow-400 shrink-0 mt-0.5" />
                    <span>Audit mismatch detected (Image vs Report)</span>
                  </li>
                  <li className="flex items-start gap-2 bg-slate-900/60 p-2 rounded border border-slate-700/50">
                    <AlertTriangle size={14} className="text-yellow-400 shrink-0 mt-0.5" />
                    <span>High citizen verification threshold reached</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Blockchain Proof */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5">
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                <LinkIcon size={16} className="text-neon-purple" /> Blockchain Proof
              </h3>
              <p className="text-xs text-slate-500 mb-1">Immutable Hash ID</p>
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-700 font-mono text-xs text-neon-purple break-all mb-3">
                0x8f71a4c9b2d8e4f1a2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2eeb2
              </div>
              <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-xs font-bold text-white transition-colors flex items-center justify-center gap-2">
                View on Ledger <LinkIcon size={12} />
              </button>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};
