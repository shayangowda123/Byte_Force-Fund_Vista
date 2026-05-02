# FundVista — Smart Anti-Corruption System

FundVista is a smart public fund tracking system that helps monitor how government money is used. It is built to make public spending more transparent, easier to track, and harder to misuse.

The main goal of FundVista is simple: track where public money goes, detect suspicious activity, and allow citizens to verify whether projects are actually happening.

This project is designed as a modern civic-tech platform for transparency, fraud detection, and accountability.

---

## What is FundVista?

FundVista is a web-based platform that helps track the full journey of public funds.

It shows:

- where money is allocated
- when money is released
- who receives it
- how it is used
- whether work is completed
- whether anything looks suspicious

Instead of waiting for corruption to happen and checking later, FundVista helps detect problems early.

---

## Why FundVista?

In many systems, public money is hard to track.

Problems usually happen because:

- spending data is not clear
- reports are delayed
- fraud is noticed too late
- fake vendors or fake beneficiaries can be added
- citizens cannot verify what is happening

FundVista solves this by making public spending visible and easier to verify.

---

## Main Features

### Fund Tracking

Track the full flow of public money:

- Budget allocated
- Funds released
- Vendor paid
- Work submitted
- Project completed

This helps users clearly see how money moves.

---

### Fraud Alerts

FundVista can highlight suspicious activity such as:

- sudden budget increase
- duplicate payments
- unusual vendors
- delayed work updates
- overpayment patterns

This helps auditors quickly spot risky transactions.

---

### Citizen Verification

Citizens can check if:

- the project is real
- the work is happening
- the asset is delivered
- the money is being used properly

This adds public accountability.

---

### Complaint System

Users can raise complaints for:

- missing work
- payment issues
- fake updates
- suspicious fund usage

This helps escalate problems quickly.

---

### Traceability Report

Each project can be tracked from start to finish:

Project → Allocation → Release → Payment → Work → Completion

This makes audits much easier.

---

### Role-Based Access

Different users get different dashboards:

- **Admin** → manages projects and funds
- **Auditor** → checks fraud and reviews alerts
- **Citizen** → verifies projects and raises complaints

---

## Tech Stack

FundVista is built using:

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Recharts
- Lucide React

---

## File Structure

```bash
FundVista/
├── public/
│   └── vite.svg
│
├── src/
│   ├── components/
│   │   ├── DashboardOverview.tsx
│   │   ├── FundTracker.tsx
│   │   ├── FraudAlerts.tsx
│   │   ├── CitizenVerification.tsx
│   │   ├── TraceabilityReport.tsx
│   │   ├── ComplaintDetailsModal.tsx
│   │   ├── AdminProjects.tsx
│   │   ├── AdminGuidelines.tsx
│   │   └── AuditorGuidelines.tsx
│   │
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── vite-env.d.ts
│
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md


How to Run the Project
Install Dependencies
npm install

Start the Project
npm run dev

Build the Project
npm run build

Preview Build
npm run preview

## Where FundVista Can Be Used

FundVista can be used in:

- government fund monitoring
- scholarship systems
- welfare schemes
- NGO fund tracking
- CSR fund monitoring
- infrastructure projects
- public procurement systems

---

## Future Improvements

FundVista can be expanded with:

- blockchain for tamper-proof records
- AI fraud scoring
- geo-tagged work verification
- smart contract fund release
- beneficiary identity verification
- vendor trust scoring

---

## Why This Project Matters

FundVista helps make public spending:

- transparent
- trackable
- verifiable
- accountable

It is built to reduce corruption and improve trust in public systems.

---

## Vision

The goal of FundVista is simple:

> Make public money easy to track and hard to misuse.

When every fund movement is visible, corruption becomes harder to hide.
