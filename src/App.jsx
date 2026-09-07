import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Icons = {
    Logo: () => (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21h18"></path>
            <path d="M5 21V7l8-4v18"></path>
            <path d="M19 21V11l-6-3"></path>
        </svg>
    ),
    Dashboard: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>,
    Customers: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
    Invoices: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
    Expenses: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>,
    Reports: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>,
    Settings: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>,
    Search: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
    Bell: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>,
    Plus: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
    TrendingUp: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>,
    TrendingDown: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>
};

function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <Icons.Logo />
                <span>ArjavaBooks</span>
            </div>
            <nav className="sidebar-nav">
                <a href="#" className="nav-item active"><Icons.Dashboard /> Dashboard</a>
                <a href="#" className="nav-item"><Icons.Customers /> Customers</a>
                <a href="#" className="nav-item"><Icons.Invoices /> Invoices</a>
                <a href="#" className="nav-item"><Icons.Expenses /> Expenses</a>
                <a href="#" className="nav-item"><Icons.Reports /> Reports</a>
                <a href="#" className="nav-item"><Icons.Settings /> Settings</a>
            </nav>
        </aside>
    );
}

function Topbar() {
    return (
        <header className="topbar">
            <div className="search-bar">
                <Icons.Search />
                <input type="text" placeholder="Search in Customers, Invoices, or Expenses..." />
            </div>
            <div className="topbar-actions">
                <button className="icon-btn"><Icons.Bell /></button>
                <div className="user-profile">
                    <div className="avatar">N</div>
                    <span>Naga</span>
                </div>
            </div>
        </header>
    );
}

function SummaryCard({ title, amount, trendText, trendType }) {
    const Icon = trendType === 'negative' ? Icons.TrendingDown : Icons.TrendingUp;
    return (
        <div className="summary-card">
            <h3>{title}</h3>
            <div className="amount">{amount}</div>
            <div className={`trend ${trendType}`}>
                {trendType !== 'neutral' && <Icon />}
                <span>{trendText} vs last month</span>
            </div>
        </div>
    );
}

function IncomeExpenseChart() {
    const data = [
        { name: 'Apr', income: 4000, expense: 2400 },
        { name: 'May', income: 3000, expense: 1398 },
        { name: 'Jun', income: 2000, expense: 9800 },
        { name: 'Jul', income: 2780, expense: 3908 },
        { name: 'Aug', income: 1890, expense: 4800 },
        { name: 'Sep', income: 2390, expense: 3800 },
    ];

    return (
        <div className="chart-section">
            <div className="chart-header">Income vs Expense</div>
            <ResponsiveContainer width="100%" height="90%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                    <Tooltip cursor={{fill: '#F4F5F7'}} />
                    <Legend />
                    <Bar dataKey="income" fill="#10B981" radius={[4, 4, 0, 0]} name="Income" />
                    <Bar dataKey="expense" fill="#EF4444" radius={[4, 4, 0, 0]} name="Expense" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

function RecentTransactions() {
    const transactions = [
        { id: 1, desc: 'Payment from Acme Corp', date: 'Sep 05, 2026', amount: '+$1,200.00', type: 'income' },
        { id: 2, desc: 'AWS Hosting', date: 'Sep 04, 2026', amount: '-$150.00', type: 'expense' },
        { id: 3, desc: 'Payment from Globex', date: 'Sep 03, 2026', amount: '+$3,200.00', type: 'income' },
        { id: 4, desc: 'Office Supplies', date: 'Sep 01, 2026', amount: '-$45.00', type: 'expense' },
    ];

    return (
        <div className="table-container">
            <div className="table-header">
                <h2>Recent Transactions</h2>
                <button className="icon-btn" style={{fontSize: '14px'}}>View All</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((tx) => (
                        <tr key={tx.id}>
                            <td style={{fontWeight: 500}}>{tx.desc}</td>
                            <td>{tx.date}</td>
                            <td className={`status-${tx.type}`}>{tx.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function PendingInvoices() {
    const invoices = [
        { id: 'INV-0043', customer: 'Stark Industries', date: 'Sep 06, 2026', amount: '$4,500.00', status: 'Pending', statusClass: 'status-pending' },
        { id: 'INV-0044', customer: 'Wayne Enterprises', date: 'Sep 07, 2026', amount: '$850.00', status: 'Overdue', statusClass: 'status-overdue' },
        { id: 'INV-0046', customer: 'Oscorp', date: 'Sep 10, 2026', amount: '$2,100.00', status: 'Pending', statusClass: 'status-pending' },
    ];

    return (
        <div className="table-container">
            <div className="table-header">
                <h2>Pending/Overdue Invoices</h2>
                <button className="icon-btn" style={{fontSize: '14px'}}>View All</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Invoice #</th>
                        <th>Customer</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((inv) => (
                        <tr key={inv.id}>
                            <td style={{fontWeight: 500, color: 'var(--accent)'}}>{inv.id}</td>
                            <td>{inv.customer}</td>
                            <td style={{fontWeight: 500}}>{inv.amount}</td>
                            <td><span className={`status-badge ${inv.statusClass}`}>{inv.status}</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function MainContent() {
    return (
        <main className="main-content">
            <div className="page-header">
                <div className="page-title">
                    <h1>Dashboard Overview</h1>
                </div>
                <div className="page-actions">
                    <select className="date-filter">
                        <option>This Month</option>
                        <option>Last Month</option>
                        <option>This Quarter</option>
                        <option>This Year</option>
                    </select>
                    <button className="btn-secondary">
                        <Icons.Plus /> Add Expense
                    </button>
                    <button className="btn-primary">
                        <Icons.Plus /> Create Invoice
                    </button>
                </div>
            </div>

            <div className="summary-grid">
                <SummaryCard title="Total Income" amount="$16,040.00" trendText="+14%" trendType="positive" />
                <SummaryCard title="Total Expense" amount="$15,398.00" trendText="+2%" trendType="negative" />
                <SummaryCard title="Net Profit" amount="$642.00" trendText="-5%" trendType="negative" />
                <SummaryCard title="Pending Payments" amount="$7,450.00" trendText="3 invoices" trendType="neutral" />
            </div>

            <div className="middle-grid">
                <IncomeExpenseChart />
                <RecentTransactions />
            </div>

            <div className="bottom-grid">
                <PendingInvoices />
            </div>
        </main>
    );
}

function App() {
    return (
        <div className="app-container">
            <Sidebar />
            <div className="main-wrapper">
                <Topbar />
                <MainContent />
            </div>
        </div>
    );
}

export default App;
