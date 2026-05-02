export const OVERVIEW_STATS = {
  totalFundsTracked: 1250000000,
  activeProjects: 342,
  flaggedTransactions: 15,
  decoyTrapsTriggered: 2,
};

export const RECENT_ACTIVITY = [
  { id: 1, type: 'transfer', message: '₹5Cr transferred to District Node (Hyderabad)', time: '2 mins ago', status: 'verified' },
  { id: 2, type: 'alert', message: 'AI flagged Vendor X for 25% cost anomaly — Fraud Score: 79', time: '15 mins ago', status: 'warning' },
  { id: 3, type: 'citizen', message: 'Citizen reported stalled work at Project #402 — AI Match: 12%', time: '1 hour ago', status: 'review' },
  { id: 4, type: 'trap', message: 'DECOY TRAP TRIGGERED: Wallet 0x1A2B... flagged — Identity traced', time: '3 hours ago', status: 'critical' },
  { id: 5, type: 'budget', message: 'Budget request BDG-201 blocked — 60.7% above market estimate', time: '4 hours ago', status: 'warning' },
  { id: 6, type: 'transfer', message: 'Central Govt released ₹50Cr for Highway Authority (Block #19204781)', time: '5 hours ago', status: 'verified' },
];

export const FUND_FLOW = [
  { id: 'gov', label: 'Central Govt', amount: 50000000, status: 'completed', hash: '0x3a4b...910c' },
  { id: 'state', label: 'State Nodal Agency', amount: 50000000, status: 'completed', hash: '0x77f1...22ea' },
  { id: 'district', label: 'District Admin', amount: 48000000, status: 'completed', hash: '0x992b...ff11', note: '₹2M retained for admin costs' },
  { id: 'vendor', label: 'Vendor (L&T Const.)', amount: 15000000, status: 'pending', hash: 'Pending...', note: 'Tranche 1' },
];

export const FRAUD_ALERTS = [
  {
    id: 'ALT-991',
    type: 'Shadow Audit Mismatch',
    description: 'Human auditor approved 100% completion. AI Shadow Audit estimates 40% based on satellite & citizen imagery.',
    severity: 'High',
    fraudScore: 82,
    scoreReason: 'Audit approval vs AI estimate divergence exceeds 50% threshold. Auditor_ID_772 has 3 prior mismatch flags.',
    entities: ['Auditor_ID_772', 'Project_ID_441'],
    date: '2026-05-01'
  },
  {
    id: 'ALT-820',
    type: 'Circular Transaction (Middleman)',
    description: 'Vendor transferred 15% of received funds to an unregistered subcontractor account linked to District Admin relative.',
    severity: 'Critical',
    fraudScore: 96,
    scoreReason: 'Circular flow detected: Govt → Admin → Vendor → Shell_Co → Admin_Relative. Graph analysis confirms 4-hop kickback chain.',
    entities: ['Vendor_ABC', 'Admin_ID_109'],
    date: '2026-05-02'
  },
  {
    id: 'TRP-001',
    type: 'Decoy Fund Trigger',
    description: 'Test fund "Project_Ghost_009" was accessed by unregistered wallet address. Immediate freeze executed.',
    severity: 'Critical',
    fraudScore: 100,
    scoreReason: 'Decoy fund accessed within 4 hours of release. No legitimate project exists. Identity trace in progress.',
    entities: ['Wallet_0x1A2B...'],
    date: '2026-05-02'
  }
];

export const CITIZEN_REPORTS = [
  {
    id: 'REP-101',
    projectId: 'PRJ-441',
    location: 'Ward 12, Main Road',
    claimedProgress: '100% Complete (Paved)',
    citizenPhoto: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80',
    aiAnalysis: 'Match Score: 12% - Image shows unpaved, muddy road.',
    status: 'Flagged for Investigation'
  },
  {
    id: 'REP-102',
    projectId: 'PRJ-502',
    location: 'Govt School Block B',
    claimedProgress: 'Roofing Completed',
    citizenPhoto: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80',
    aiAnalysis: 'Match Score: 95% - Image shows completed roofing.',
    status: 'Verified'
  }
];

export const BLOCKCHAIN_TRANSACTIONS = [
  {
    txHash: '0x3a4b8c1d2e...910c',
    projectId: 'PRJ-441',
    sender: { id: 'GOV-001', label: 'Central Government', role: 'Government' },
    receiver: { id: 'SNA-TG-01', label: 'State Nodal Agency (Telangana)', role: 'State' },
    amount: 50000000,
    timestamp: '2026-04-10 09:00:12 UTC',
    status: 'Confirmed',
    block: 19204781,
  },
  {
    txHash: '0x77f1a2b3c4...22ea',
    projectId: 'PRJ-441',
    sender: { id: 'SNA-TG-01', label: 'State Nodal Agency (Telangana)', role: 'State' },
    receiver: { id: 'DA-HYD-12', label: 'District Admin (Hyderabad)', role: 'District' },
    amount: 48500000,
    timestamp: '2026-04-11 11:23:44 UTC',
    status: 'Confirmed',
    block: 19211200,
  },
  {
    txHash: '0x992b1c0d9e...ff11',
    projectId: 'PRJ-441',
    sender: { id: 'DA-HYD-12', label: 'District Admin (Hyderabad)', role: 'District' },
    receiver: { id: 'VND-LT-07', label: 'Vendor: L&T Construction', role: 'Vendor' },
    amount: 15000000,
    timestamp: '2026-04-15 14:07:55 UTC',
    status: 'Confirmed',
    block: 19233410,
  },
  {
    txHash: '0xSUSP1f2e3d...ALERT',
    projectId: 'PRJ-441',
    sender: { id: 'VND-LT-07', label: 'Vendor: L&T Construction', role: 'Vendor' },
    receiver: { id: 'SHL-XX-99', label: '⚠️ Shell Co. (Unregistered)', role: 'Unknown' },
    amount: 2250000,
    timestamp: '2026-04-16 02:31:08 UTC',
    status: 'Flagged',
    block: 19235100,
  },
];

export const BUDGET_REQUESTS = [
  {
    id: 'BDG-201',
    projectName: 'NH-44 Road Repair (10km)',
    adminId: 'DA-HYD-12',
    requestedAmount: 45000000,
    aiEstimate: 28000000,
    variance: '+60.7%',
    status: 'Blocked',
    reason: 'Requested budget is 60.7% above market average for similar road projects in the region (avg ₹2.8L/km vs claimed ₹4.5L/km).',
  },
  {
    id: 'BDG-202',
    projectName: 'Primary School Construction',
    adminId: 'DA-WAR-08',
    requestedAmount: 12000000,
    aiEstimate: 11500000,
    variance: '+4.3%',
    status: 'Approved',
    reason: 'Within acceptable 5% tolerance of market pricing for similar structures.',
  },
  {
    id: 'BDG-203',
    projectName: 'District Hospital Renovation',
    adminId: 'DA-SEC-04',
    requestedAmount: 78000000,
    aiEstimate: 51000000,
    variance: '+52.9%',
    status: 'Flagged',
    reason: 'Cost per sq.ft is ₹4,200 vs historical average of ₹2,750. Sudden spike vs prior quarter. Requires re-evaluation.',
  },
];

export const MIDDLEMAN_NETWORK = {
  nodes: [
    { id: 'GOV', label: 'Central Govt', color: '#38bdf8', type: 'government' },
    { id: 'ADMIN', label: 'Admin_ID_109', color: '#f87171', type: 'admin' },
    { id: 'VND', label: 'Vendor ABC', color: '#facc15', type: 'vendor' },
    { id: 'SHELL', label: 'Shell Co. (Ghost)', color: '#f87171', type: 'shell' },
    { id: 'REL', label: 'Admin Relative', color: '#f87171', type: 'suspect' },
  ],
  links: [
    { source: 'GOV', target: 'ADMIN', label: '₹48L', suspicious: false },
    { source: 'ADMIN', target: 'VND', label: '₹44L', suspicious: false },
    { source: 'VND', target: 'SHELL', label: '₹6.6L (15%)', suspicious: true },
    { source: 'SHELL', target: 'REL', label: '₹6L', suspicious: true },
  ],
  sharedIdentifiers: [
    { field: 'Phone', value: '+91-9876543210', linkedTo: ['Admin_ID_109', 'Shell Co. Reg.'] },
    { field: 'Bank IFSC', value: 'SBIN0001234', linkedTo: ['Vendor ABC', 'Admin Relative Account'] },
  ],
};

export const DECOY_TRAPS = [
  {
    id: 'DCY-001',
    projectName: 'Project Ghost Alpha',
    fundsReleased: 1000000,
    releaseDate: '2026-04-28',
    triggeredBy: 'Wallet 0x1A2B3C...',
    triggeredAt: '2026-04-28 06:14:22 UTC',
    identityTrace: 'IP traced to Admin_ID_109 network. Device fingerprint matches known actor.',
    status: 'Caught',
  },
  {
    id: 'DCY-002',
    projectName: 'Project Ghost Beta',
    fundsReleased: 500000,
    releaseDate: '2026-05-01',
    triggeredBy: null,
    triggeredAt: null,
    identityTrace: null,
    status: 'Active (Monitoring)',
  },
];

export const DIGITAL_IDENTITIES = [
  { id: 'GOV-001', name: 'Central Govt Authority', role: 'Government', txCount: 48, riskScore: 2 },
  { id: 'DA-HYD-12', name: 'Dist. Admin (Hyderabad)', role: 'Admin', txCount: 34, riskScore: 71 },
  { id: 'AUD-772', name: 'Auditor Ramesh K.', role: 'Auditor', txCount: 22, riskScore: 58 },
  { id: 'VND-LT-07', name: 'L&T Construction', role: 'Vendor', txCount: 19, riskScore: 45 },
  { id: 'CTZ-4421', name: 'Citizen Reporter', role: 'Citizen', txCount: 3, riskScore: 0 },
];

// STEP 1: Shadow Audit Conflicts
export const SHADOW_AUDIT_CONFLICTS = [
  {
    id: 'SAC-001',
    projectId: 'PRJ-441',
    auditorId: 'AUD-772',
    auditorName: 'Ramesh K.',
    auditorDecision: 'Approved — 100% Complete',
    aiDecision: 'Rejected — Estimated 38% Complete',
    conflictScore: 62,
    citizenEvidence: 'Citizen upload REP-101: Muddy unpaved road.',
    satelliteNote: 'Satellite imagery confirms no surface change since last quarter.',
    status: 'Conflict — Flagged for Review',
    date: '2026-05-01',
  },
  {
    id: 'SAC-002',
    projectId: 'PRJ-502',
    auditorId: 'AUD-310',
    auditorName: 'Priya S.',
    auditorDecision: 'Approved — Roofing 100% done',
    aiDecision: 'Approved — Match Score 95%',
    conflictScore: 5,
    citizenEvidence: 'Citizen upload REP-102: Completed roofing confirmed.',
    satelliteNote: 'No discrepancy detected.',
    status: 'Verified',
    date: '2026-05-02',
  },
  {
    id: 'SAC-003',
    projectId: 'PRJ-309',
    auditorId: 'AUD-772',
    auditorName: 'Ramesh K.',
    auditorDecision: 'Approved — Budget utilised 90%',
    aiDecision: 'Flagged — Only 55% fund trail traceable on ledger',
    conflictScore: 35,
    citizenEvidence: 'No citizen report submitted.',
    satelliteNote: 'Project site shows activity but at lower scale than reported.',
    status: 'Conflict — Higher Review Triggered',
    date: '2026-04-29',
  },
];

// STEP 7: Role-Based Suspicious Activity Detection (Behavioral AI)
export const BEHAVIORAL_PROFILES = [
  {
    id: 'RSK-109',
    entityId: 'ENT-ADM-109',
    actorName: 'Dist. Admin (Hyderabad)',
    role: 'Admin',
    flags: [
      { name: 'Circular Transactions', desc: 'Govt → Admin → Vendor → Shell → Admin-linked entity' },
      { name: 'Relative Link Detection', desc: 'Money routed to known associate account' },
      { name: 'Repeated Vendor Bias', desc: 'Vendor ABC selected for 11/12 projects' }
    ],
    riskScore: 88,
    formula: 'Risk = (Transaction Anomaly × 0.4) + (Relationship Risk × 0.4) + (Pattern Frequency × 0.2)',
    trend: 'Increasing',
    flaggedSince: '2026-03-01',
  },
  {
    id: 'RSK-772',
    entityId: 'ENT-AUD-772',
    actorName: 'Auditor Ramesh K.',
    role: 'Auditor',
    flags: [
      { name: 'Shadow Audit Mismatch', desc: 'AI estimate 40% vs human audit 100%' },
      { name: 'Repeated Approval Bias', desc: 'Same auditor always approves Admin_ID_109 projects' },
      { name: 'Fast Approval Flag', desc: 'Audit completed unrealistically fast (2 hours)' }
    ],
    riskScore: 74,
    formula: 'Risk = (Mismatch Score × 0.5) + (Past Flags × 0.3) + (Speed Factor × 0.2)',
    trend: 'Increasing',
    flaggedSince: '2026-02-15',
  },
  {
    id: 'RSK-LT-07',
    entityId: 'ENT-VND-07',
    actorName: 'L&T Construction',
    role: 'Vendor',
    flags: [
      { name: 'Split Transactions', desc: 'Breaking money into small parts to evade limits' },
      { name: 'Decoy Trap Trigger', desc: 'Accessed fake project funds (Project_Ghost_009)' },
      { name: 'Unusual Activity Timing', desc: 'Midnight / burst transactions detected' }
    ],
    riskScore: 61,
    formula: 'Risk = (Decoy Trigger × 0.6) + (Account Validity × 0.2) + (Transaction Behavior × 0.2)',
    trend: 'Stable',
    flaggedSince: '2026-04-01',
  },
];

// STEP 8: Real-Time Alert Stream
export const REALTIME_ALERTS = [
  { id: 'RT-001', level: 'critical', message: 'Fraud Score exceeded 90 — ALT-820 auto-escalated to National Authority', time: '04:06:12' },
  { id: 'RT-002', level: 'warning',  message: 'Audit conflict SAC-001 logged — Auditor Ramesh K. flagged for investigation', time: '04:03:44' },
  { id: 'RT-003', level: 'critical', message: 'Decoy Trap DCY-001 triggered — Transaction frozen, identity trace initiated', time: '03:58:22' },
  { id: 'RT-004', level: 'warning',  message: 'Budget BDG-201 blocked — 60.7% above AI estimate, re-evaluation required', time: '03:44:10' },
  { id: 'RT-005', level: 'info',     message: 'Blockchain Tx 0x992b...ff11 confirmed on block #19233410', time: '03:30:55' },
  { id: 'RT-006', level: 'warning',  message: 'Behavioral AI raised risk score for DA-HYD-12 to 88 — Vendor favoritism pattern', time: '03:11:07' },
];

export const NOTIFICATIONS = [
  { id: 'NOT-1', role: 'admin', type: 'Critical', message: 'Critical fraud detected – funds halted (Circular Transaction)', time: 'Just now', read: false },
  { id: 'NOT-2', role: 'admin', type: 'High', message: 'Project PRJ-441 approved by Auditor_ID_772', time: '10 mins ago', read: false },
  { id: 'NOT-3', role: 'admin', type: 'Low', message: 'Citizen reported stalled work at Project #402', time: '1 hour ago', read: true },
  
  { id: 'NOT-4', role: 'auditor', type: 'High', message: 'Re-audit required: AI mismatch > 50% on PRJ-441', time: '2 mins ago', read: false },
  { id: 'NOT-5', role: 'auditor', type: 'High', message: 'Citizen verification required for Project #402', time: '1 hour ago', read: false },
  { id: 'NOT-6', role: 'auditor', type: 'Low', message: 'Admin released funds for PRJ-502', time: '3 hours ago', read: true },
  
  { id: 'NOT-7', role: 'user', type: 'High', message: 'Your project PRJ-441 has been approved by Auditor', time: '15 mins ago', read: false },
  { id: 'NOT-8', role: 'user', type: 'Low', message: 'Funds released by Admin for PRJ-441 (Tranche 1)', time: '2 hours ago', read: true },
  { id: 'NOT-9', role: 'user', type: 'High', message: 'Complaint #CMP-001 received. Pending auditor review.', time: '1 day ago', read: true },
];

export const addNotification = (role: string, type: string, message: string) => {
  NOTIFICATIONS.unshift({
    id: `NOT-DYN-${Date.now()}`,
    role,
    type,
    message,
    time: 'Just now',
    read: false
  });
};
