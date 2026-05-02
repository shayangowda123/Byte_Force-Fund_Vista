import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { IndianRupee, PieChart as PieChartIcon, Activity, AlertTriangle, Zap, Calendar, Map, CheckCircle2, Clock, Filter, ListCollapse } from 'lucide-react';
import { REALTIME_ALERTS, FRAUD_ALERTS } from '../data/mockData';
import { RoleType } from '../App';

const DASHBOARD_DATA_2025 = [
  {name:"National Highways Expansion", sanctioned:240, released:200, completed:170},
  {name:"Rural Roads Development", sanctioned:180, released:150, completed:120},
  {name:"Metro Rail Construction", sanctioned:300, released:250, completed:190},
  {name:"Village Healthcare Centers", sanctioned:130, released:110, completed:85},
  {name:"District Hospitals Upgrade", sanctioned:170, released:145, completed:110},
  {name:"Medical Equipment Procurement", sanctioned:90, released:75, completed:60},
  {name:"Government Schools Renovation", sanctioned:140, released:118, completed:95},
  {name:"Digital Smart Classrooms", sanctioned:110, released:95, completed:72},
  {name:"Scholarship Distribution Program", sanctioned:160, released:150, completed:145},
  {name:"Farmer Irrigation Support", sanctioned:190, released:160, completed:125},
  {name:"Crop Insurance Scheme", sanctioned:120, released:110, completed:105},
  {name:"Organic Farming Promotion", sanctioned:80, released:65, completed:50},
  {name:"Clean Drinking Water Mission", sanctioned:210, released:175, completed:135},
  {name:"River Rejuvenation Project", sanctioned:260, released:220, completed:170},
  {name:"Urban Drainage System", sanctioned:150, released:120, completed:92},
  {name:"Smart City Surveillance", sanctioned:175, released:150, completed:118},
  {name:"Public WiFi Infrastructure", sanctioned:95, released:82, completed:70},
  {name:"Affordable Housing Scheme", sanctioned:320, released:280, completed:225},
  {name:"Slum Redevelopment Project", sanctioned:230, released:195, completed:150},
  {name:"Solar Energy Parks", sanctioned:280, released:240, completed:190},
  {name:"Wind Energy Installation", sanctioned:220, released:185, completed:145},
  {name:"EV Charging Stations", sanctioned:125, released:105, completed:80},
  {name:"Women Skill Development Centers", sanctioned:100, released:88, completed:75},
  {name:"Youth Employment Mission", sanctioned:140, released:125, completed:110},
  {name:"Disaster Relief Infrastructure", sanctioned:200, released:170, completed:140},
  {name:"Flood Protection Walls", sanctioned:185, released:155, completed:120},
  {name:"Public Transport Buses", sanctioned:210, released:180, completed:145},
  {name:"Airport Modernization", sanctioned:350, released:300, completed:240},
  {name:"Digital Governance Platform", sanctioned:130, released:115, completed:92},
  {name:"Cyber Security Infrastructure", sanctioned:160, released:140, completed:112}
];

// Helper to generate dynamic data for different years based on 2025 baseline
const getYearData = (yearStr: string) => {
  const year = parseInt(yearStr);
  if (year === 2025) return DASHBOARD_DATA_2025;
  
  const scale = year < 2025 ? 1 - ((2025 - year) * 0.15) : 1 + ((year - 2025) * 0.1);
  return DASHBOARD_DATA_2025.map(item => ({
    name: item.name,
    sanctioned: Math.round(item.sanctioned * scale),
    released: Math.round(item.released * scale),
    completed: Math.round(item.completed * scale)
  }));
};

const YEARLY_GROWTH = [
  { year: '2022', total: 2400 }, { year: '2023', total: 3200 }, { year: '2024', total: 4500 }, { year: '2025', total: 5410 }
];

const SECTOR_PIE = [
  { name: 'Infrastructure', value: 35 }, { name: 'Healthcare', value: 20 }, { name: 'Energy', value: 15 }, 
  { name: 'Education', value: 15 }, { name: 'Smart City', value: 15 }
];
const PIE_COLORS = ['#38bdf8', '#4ade80', '#fbbf24', '#f472b6', '#a78bfa'];

const STATE_HEATMAP = [
  { state: 'Maharashtra', val: 95 }, { state: 'Karnataka', val: 88 }, { state: 'Gujarat', val: 82 },
  { state: 'Tamil Nadu', val: 78 }, { state: 'Uttar Pradesh', val: 92 }, { state: 'Telangana', val: 85 },
  { state: 'Delhi', val: 65 }, { state: 'Kerala', val: 55 }, { state: 'Rajasthan', val: 74 },
  { state: 'West Bengal', val: 68 }, { state: 'Madhya Pradesh', val: 72 }, { state: 'Punjab', val: 45 }
];

export const DashboardOverview = ({ role }: { role: RoleType }) => {
  const [selectedYear, setSelectedYear] = useState('2025');
  
  const chartData = useMemo(() => getYearData(selectedYear), [selectedYear]);
  
  const { totalSanctioned, totalReleased, totalCompleted } = useMemo(() => {
    return chartData.reduce((acc, curr) => ({
        totalSanctioned: acc.totalSanctioned + curr.sanctioned,
        totalReleased: acc.totalReleased + curr.released,
        totalCompleted: acc.totalCompleted + curr.completed,
      }), { totalSanctioned: 0, totalReleased: 0, totalCompleted: 0 });
  }, [chartData]);

  const completionPercent = ((totalCompleted / totalSanctioned) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      
      {/* HEADER & FILTERS */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-slate-900/40 p-4 rounded-xl border border-slate-700/50 backdrop-blur-md">
        <div>
          <h2 className="text-2xl font-black text-white tracking-wide flex items-center gap-2">
            <Activity className="text-neon-cyan" /> Ministry Finance Control Panel
          </h2>
          <p className="text-slate-400 text-sm mt-1">Premium Cyberpunk Analytics & Intelligence Dashboard</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="bg-slate-800 text-sm font-bold text-white border border-slate-600 rounded-lg px-3 py-2 focus:border-neon-cyan focus:outline-none">
            {[2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030].map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <select className="bg-slate-800 text-sm text-slate-300 border border-slate-600 rounded-lg px-3 py-2 focus:border-neon-cyan focus:outline-none">
            <option>All States</option><option>Maharashtra</option><option>Karnataka</option><option>Gujarat</option><option>Tamil Nadu</option><option>Uttar Pradesh</option><option>Telangana</option><option>Delhi</option><option>Kerala</option><option>Rajasthan</option>
          </select>
          <select className="bg-slate-800 text-sm text-slate-300 border border-slate-600 rounded-lg px-3 py-2 focus:border-neon-cyan focus:outline-none">
            <option>All Ministries</option><option>Transport & Highways</option><option>Health & Family Welfare</option><option>Education</option><option>Agriculture</option><option>Housing & Urban Affairs</option><option>Renewable Energy</option>
          </select>
          <button className="bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30 px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-bold hover:bg-neon-cyan/20 transition-colors"><Filter size={16} /> Filters</button>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <StatCard title="Total Sanctioned" value={`₹${totalSanctioned}`} sub="Crore" icon={<IndianRupee />} color="border-slate-600/50" />
        <StatCard title="Total Released" value={`₹${totalReleased}`} sub="Crore" icon={<Activity />} color="border-neon-blue/40" text="text-neon-blue" />
        <StatCard title="Work Completed" value={`${completionPercent}%`} sub="Overall" icon={<CheckCircle2 />} color="border-neon-green/40" text="text-neon-green" />
        <StatCard title="Delayed Projects" value="24" sub="High Risk" icon={<Clock />} color="border-yellow-500/40" text="text-yellow-400" />
        <StatCard title="Fraud Alerts" value={FRAUD_ALERTS.length} sub="Active" icon={<AlertTriangle />} color="border-neon-red/40 bg-neon-red/5" text="text-neon-red" />
        <StatCard title="Pending Approvals" value="18" sub="Awaiting Audit" icon={<ListCollapse />} color="border-purple-500/40" text="text-purple-400" />
      </div>

      {/* MAIN BAR CHART */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-xl border border-dark-border p-6 shadow-2xl bg-gradient-to-br from-slate-900/90 to-[#0a1128]/90">
        <h3 className="text-lg font-bold text-white mb-2">Funds Overview Across Sanctioned Pipeline (Year Wise)</h3>
        <p className="text-xs text-slate-400 mb-6 uppercase tracking-widest">Financial Year {selectedYear} • Top 30 Projects • Amounts in ₹ Crore</p>
        
        <div className="h-[450px] w-full overflow-x-auto no-scrollbar">
          <div style={{ width: '2800px', height: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }} barSize={16} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} interval={0} angle={-35} textAnchor="end" tickMargin={10} axisLine={{ stroke: '#475569' }} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(val) => `₹${val}Cr`} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#1e293b', opacity: 0.4 }} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }} />
                <Legend verticalAlign="top" height={36} iconType="circle" />
                <Bar dataKey="sanctioned" name="Sanctioned Amount" fill="#64748b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="released" name="Released Amount" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completed" name="Completed Work" fill="#4ade80" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* ADVANCED WIDGETS ROW */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="glass-panel rounded-xl border border-slate-700 p-5 bg-slate-900/60">
          <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Yearly Fund Growth</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={YEARLY_GROWTH}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                <Line type="monotone" dataKey="total" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4, fill: '#38bdf8' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="glass-panel rounded-xl border border-slate-700 p-5 bg-slate-900/60">
          <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Sector Allocation</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={SECTOR_PIE} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {SECTOR_PIE.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {SECTOR_PIE.map((s, i) => (
              <span key={s.name} className="text-[10px] text-slate-400 flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }}></span>{s.name}</span>
            ))}
          </div>
        </div>

        {/* Heatmap */}
        <div className="glass-panel rounded-xl border border-slate-700 p-5 bg-slate-900/60 flex flex-col">
          <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center justify-between">
            State-Wise Spending <Map size={14} className="text-neon-cyan" />
          </h3>
          <div className="grid grid-cols-4 gap-2 flex-1">
            {STATE_HEATMAP.map((s, i) => (
              <div key={i} className="rounded flex items-center justify-center text-center p-1 cursor-pointer transition-transform hover:scale-105" 
                   style={{ backgroundColor: `rgba(56, 189, 248, ${s.val / 100})`, border: '1px solid rgba(56, 189, 248, 0.3)' }} title={`${s.state}: ${s.val}% utilized`}>
                <span className={`text-[10px] font-bold ${s.val > 70 ? 'text-slate-900' : 'text-slate-200'}`}>{s.state.substring(0,3).toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TABLES ROW */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-panel rounded-xl border border-slate-700 p-5 bg-slate-900/60 overflow-hidden flex flex-col">
          <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2"><Zap className="text-neon-red" size={16} /> Live Transaction Tracker</h3>
          <div className="space-y-3 flex-1 overflow-y-auto pr-2 no-scrollbar" style={{ maxHeight: '250px' }}>
            {REALTIME_ALERTS.map((t, i) => (
              <div key={i} className="flex justify-between items-center p-3 rounded bg-slate-800/50 border border-slate-700/50 text-sm">
                <div className="flex flex-col">
                  <span className={`font-mono text-[10px] ${t.level === 'critical' ? 'text-neon-red' : 'text-neon-cyan'}`}>{t.id}</span>
                  <span className="text-slate-300 text-xs mt-1">{t.message}</span>
                </div>
                <span className="text-slate-500 text-xs">{t.time}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="glass-panel rounded-xl border border-slate-700 p-5 bg-slate-900/60 overflow-hidden flex flex-col">
          <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2"><AlertTriangle className="text-yellow-400" size={16} /> Audit Mismatch Alerts</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-slate-500 uppercase bg-slate-800/50">
                <tr><th className="p-2 rounded-tl">Project</th><th className="p-2">Auditor</th><th className="p-2">Human %</th><th className="p-2">AI %</th><th className="p-2 rounded-tr text-right">Risk</th></tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-slate-800"><td className="p-2 font-mono text-neon-blue">PRJ-441</td><td className="p-2">AUD-772</td><td className="p-2">100%</td><td className="p-2 text-neon-red">12%</td><td className="p-2 text-right"><span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded font-bold">HIGH</span></td></tr>
                <tr className="border-b border-slate-800"><td className="p-2 font-mono text-neon-blue">PRJ-228</td><td className="p-2">AUD-104</td><td className="p-2">80%</td><td className="p-2 text-yellow-400">55%</td><td className="p-2 text-right"><span className="bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded font-bold">MED</span></td></tr>
                <tr className="border-b border-slate-800"><td className="p-2 font-mono text-neon-blue">PRJ-901</td><td className="p-2">AUD-991</td><td className="p-2">90%</td><td className="p-2 text-green-400">88%</td><td className="p-2 text-right"><span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded font-bold">LOW</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
};

const StatCard = ({ title, value, sub, icon, color, text = "text-white" }: any) => (
  <motion.div whileHover={{ y: -5 }} className={`glass-panel p-4 rounded-xl border ${color} shadow-lg transition-all flex flex-col justify-between`}>
    <div className="flex justify-between items-start mb-2">
      <div className={`p-1.5 rounded-lg bg-slate-900/50 text-slate-400`}>{icon}</div>
      <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{sub}</span>
    </div>
    <div>
      <h3 className={`text-xl lg:text-2xl font-black ${text}`}>{value}</h3>
      <p className="text-[10px] lg:text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">{title}</p>
    </div>
  </motion.div>
);
