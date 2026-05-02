import React, { useState } from 'react';
import { Shield, LayoutDashboard, Link, AlertTriangle, Users, Menu, Bell, Settings, LogOut, ChevronDown, FileText, Layers, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { DashboardOverview } from './components/DashboardOverview';
import { FundTracker } from './components/FundTracker';
import { FraudAlerts } from './components/FraudAlerts';
import { CitizenVerification } from './components/CitizenVerification';
import { TraceabilityReport } from './components/TraceabilityReport';
import { AdminProjects } from './components/AdminProjects';
import { AuditorGuidelines } from './components/AuditorGuidelines';
import { ComplaintDetailsModal } from './components/ComplaintDetailsModal';
import { NOTIFICATIONS } from './data/mockData';

export type RoleType = 'admin' | 'auditor' | 'user';
type ViewType = 'overview' | 'tracker' | 'alerts' | 'citizen' | 'trace' | 'projects';

export default function App() {
  const [currentRole, setCurrentRole] = useState<RoleType>('admin');
  const [currentView, setCurrentView] = useState<ViewType>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showComplaintModal, setShowComplaintModal] = useState(false);

  const roleNotifications = NOTIFICATIONS.filter(n => n.role === currentRole);
  const unreadCount = roleNotifications.filter(n => !n.read).length;

  // Define navigation based on role
  const getNavigation = () => {
    const allNav = [
      { id: 'overview',  label: 'Dashboard', icon: <LayoutDashboard size={20} />, roles: ['admin', 'user', 'auditor'] },
      { id: 'tracker',   label: 'Fund Tracking', icon: <Link size={20} />, roles: ['admin', 'auditor', 'user'] },
      { id: 'alerts',    label: 'Fraud Detection', icon: <AlertTriangle size={20} />, roles: ['admin', 'auditor'] },
      { id: 'trace',     label: 'Audit Reports', icon: <FileText size={20} />, roles: ['admin', 'auditor'] },
      { id: 'citizen',   label: currentRole === 'user' ? 'Complaint & Verification' : 'Public Transparency', icon: <Users size={20} />, roles: ['user'] },
      { id: 'projects',  label: 'Manage Projects',  icon: <Layers size={20} />, roles: ['admin'] },
    ] as const;

    return allNav.filter(nav => nav.roles.includes(currentRole));
  };

  const navigation = getNavigation();

  // If a user switches roles and is on a page they shouldn't access, redirect
  React.useEffect(() => {
    if (!navigation.find(n => n.id === currentView)) {
      setCurrentView('overview');
    }
  }, [currentRole, navigation, currentView]);

  const renderView = () => {
    switch (currentView) {
      case 'overview':  return <DashboardOverview role={currentRole} />;
      case 'projects':  return <AdminProjects role={currentRole} />;
      case 'tracker':   return <FundTracker role={currentRole} />;
      case 'alerts':    return <FraudAlerts role={currentRole} />;
      case 'citizen':   return <CitizenVerification role={currentRole} />;
      case 'trace':     return <TraceabilityReport role={currentRole} />;
      default:          return <DashboardOverview role={currentRole} />;
    }
  };

  const roleConfig = {
    admin: { name: 'Admin (Authority)', color: 'from-neon-blue to-blue-600', badge: 'bg-neon-blue' },
    auditor: { name: 'Independent Auditor', color: 'from-neon-purple to-purple-600', badge: 'bg-neon-purple' },
    user: { name: 'Citizen User', color: 'from-neon-green to-green-600', badge: 'bg-neon-green' }
  };

  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 0 }}
        className="glass-panel border-r border-dark-border z-20 hidden md:flex flex-col h-screen"
      >
        <div className="p-6 flex items-center justify-center border-b border-dark-border/50">
          <Shield className="w-8 h-8 text-neon-blue mr-3" />
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-white tracking-wider">
            FUND VISTA
          </h1>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as ViewType)}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-300 ${
                currentView === item.id 
                  ? 'bg-neon-blue/10 text-neon-blue shadow-[inset_0_0_10px_rgba(56,189,248,0.2)] border border-neon-blue/20' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Role Switcher */}
        <div className="p-4 border-t border-dark-border/50 relative">
          <button 
            onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
            className="w-full bg-slate-800/50 hover:bg-slate-800 p-4 rounded-xl flex items-center justify-between transition-colors border border-slate-700/50"
          >
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${roleConfig[currentRole].color} flex items-center justify-center text-white font-bold shadow-lg`}>
                {currentRole.substring(0, 2).toUpperCase()}
              </div>
              <div className="ml-3 text-left">
                <p className="text-sm font-bold text-white">{roleConfig[currentRole].name}</p>
                <p className={`text-xs flex items-center text-${roleConfig[currentRole].badge.split('-')[1]}-400`}>
                  <span className={`w-2 h-2 rounded-full ${roleConfig[currentRole].badge} mr-1 animate-pulse`}></span>
                  Active Role
                </p>
              </div>
            </div>
            <ChevronDown size={16} className={`text-slate-400 transition-transform ${isRoleMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Role Dropdown Menu */}
          <AnimatePresence>
            {isRoleMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-full left-4 right-4 mb-2 glass-panel border border-slate-700 rounded-xl overflow-hidden shadow-2xl z-50"
              >
                {(Object.keys(roleConfig) as RoleType[]).map((role) => (
                  <button
                    key={role}
                    onClick={() => { setCurrentRole(role); setIsRoleMenuOpen(false); }}
                    className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${
                      currentRole === role ? 'bg-slate-700 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    Switch to {roleConfig[role].name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="glass-panel border-b border-dark-border h-20 flex items-center justify-between px-6 z-10 shrink-0">
          <div className="flex items-center">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 text-slate-400 hover:text-white md:hidden"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-bold text-white ml-4 md:ml-0">
              {navigation.find(n => n.id === currentView)?.label}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex px-3 py-1 rounded-full border border-slate-700 bg-slate-800 text-xs font-mono text-slate-400 items-center mr-4">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              Mainnet Connected
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-2 transition-colors rounded-full ${showNotifications ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-neon-red text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-[0_0_8px_rgba(248,113,113,0.8)]">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-80 sm:w-96 glass-panel border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b border-dark-border/50 flex justify-between items-center bg-slate-900/50">
                      <h3 className="font-bold text-white flex items-center gap-2"><Bell size={16} className="text-neon-blue"/> Notifications</h3>
                      <span className="text-xs text-slate-400 hover:text-white cursor-pointer transition-colors">Mark all as read</span>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto">
                      {roleNotifications.length === 0 ? (
                        <div className="p-6 text-center text-slate-500 text-sm">No new notifications</div>
                      ) : (
                        roleNotifications.map((notif) => (
                          <div 
                            key={notif.id} 
                            onClick={() => {
                              if (notif.message.toLowerCase().includes('complaint')) {
                                setShowComplaintModal(true);
                                setShowNotifications(false);
                              }
                            }}
                            className={`p-4 border-b border-dark-border/30 hover:bg-slate-800/30 transition-colors cursor-pointer ${notif.read ? 'opacity-75' : 'bg-slate-800/20'}`}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                                notif.type === 'Critical' ? 'bg-red-500/10 text-red-400 border-red-500/30' : 
                                notif.type === 'High' ? 'bg-orange-500/10 text-orange-400 border-orange-500/30' : 
                                'bg-neon-blue/10 text-neon-blue border-neon-blue/30'
                              }`}>
                                {notif.type}
                              </span>
                              <span className="text-xs text-slate-500">{notif.time}</span>
                            </div>
                            <p className={`text-sm mt-2 ${notif.read ? 'text-slate-400' : 'text-slate-200 font-medium'}`}>{notif.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                    <div 
                      onClick={() => { setCurrentView('alerts'); setShowNotifications(false); }}
                      className="p-3 text-center border-t border-dark-border/50 bg-slate-900/50 text-xs text-neon-blue hover:text-white cursor-pointer transition-colors"
                    >
                      View All Alerts
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <Settings size={20} />
            </button>
            <div className="h-6 w-px bg-slate-700 mx-2"></div>
            <button className="flex items-center text-sm font-medium text-slate-400 hover:text-red-400 transition-colors">
              <LogOut size={18} className="mr-2" />
              Exit
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView + currentRole} // Re-animate when view or role changes
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {renderView()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {showComplaintModal && <ComplaintDetailsModal onClose={() => setShowComplaintModal(false)} />}
      </AnimatePresence>
    </div>
  );
}
