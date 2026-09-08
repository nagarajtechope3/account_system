import React, { useState } from 'react';
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
    Banking: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 22 7 12 2"></polygon><polyline points="2 17 22 17"></polyline><polyline points="2 22 22 22"></polyline><line x1="6" y1="17" x2="6" y2="9"></line><line x1="10" y1="17" x2="10" y2="9"></line><line x1="14" y1="17" x2="14" y2="9"></line><line x1="18" y1="17" x2="18" y2="9"></line></svg>,
    Search: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
    Bell: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>,
    Plus: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
    TrendingUp: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>,
    TrendingDown: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>,
    Sync: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>,
    UserOutline: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
    Grid: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
    History: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
    ChevronDown: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>,
    Close: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
    Copy: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>,
    CheckCircle: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-1 14.4l-4-4 1.4-1.4 2.6 2.6 6.6-6.6 1.4 1.4z"></path></svg>,
    Box: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>,
    FileText: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
    UserSmall: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
    ShoppingCart: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>,
    Tag: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>,
    ShoppingBag: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>,
    Building: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18"></path><path d="M9 8h1"></path><path d="M9 12h1"></path><path d="M9 16h1"></path><path d="M14 8h1"></path><path d="M14 12h1"></path><path d="M14 16h1"></path><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path></svg>,
    Users: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
    Globe: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>,
    Percent: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg>,
    Palette: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="13.5" cy="6.5" r=".5"></circle><circle cx="17.5" cy="10.5" r=".5"></circle><circle cx="8.5" cy="7.5" r=".5"></circle><circle cx="6.5" cy="12.5" r=".5"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path></svg>,
    Database: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>,
    Link: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
};

function Sidebar({ activePage, setPage }) {
    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">
                <a href="#" className={`nav-item ${activePage === 'dashboard' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setPage('dashboard'); }}><Icons.Dashboard /> Dashboard</a>
                <a href="#" className={`nav-item ${activePage === 'customers' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setPage('customers'); }}><Icons.Customers /> Customers</a>
                <a href="#" className={`nav-item ${activePage === 'invoices' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setPage('invoices'); }}><Icons.Invoices /> Invoices</a>
                <a href="#" className={`nav-item ${activePage === 'expenses' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setPage('expenses'); }}><Icons.Expenses /> Expenses</a>
                <a href="#" className={`nav-item ${activePage === 'reports' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setPage('reports'); }}><Icons.Reports /> Reports</a>
                <a href="#" className={`nav-item ${activePage === 'banking' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setPage('banking'); }}><Icons.Banking /> Banking</a>
            </nav>
        </aside>
    );
}

function Topbar({ setPage }) {
    const [isOrgPanelOpen, setIsOrgPanelOpen] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [isSearchFilterOpen, setIsSearchFilterOpen] = useState(false);
    const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <>
        {isHistoryOpen && <div className="invisible-overlay" onClick={() => setIsHistoryOpen(false)}></div>}
        {isSearchFilterOpen && <div className="invisible-overlay" onClick={() => setIsSearchFilterOpen(false)}></div>}
        {isQuickAddOpen && <div className="invisible-overlay" onClick={() => setIsQuickAddOpen(false)}></div>}
        {isProfileOpen && <div className="invisible-overlay" onClick={() => setIsProfileOpen(false)}></div>}
        
        <header className="topbar">
            <div className="topbar-left">
                <Icons.Logo />
                <span className="topbar-logo-text">ArjavaBooks</span>
                
                <div style={{position: 'relative'}}>
                    <button className="icon-btn-light" style={{marginLeft: '24px', position: 'relative', zIndex: isHistoryOpen ? 101 : 1}} onClick={() => setIsHistoryOpen(!isHistoryOpen)}>
                        <Icons.History />
                    </button>
                    {isHistoryOpen && (
                        <div className="history-dropdown">
                            <div className="history-item">
                                <div className="history-icon"><Icons.Box /></div>
                                <div className="history-details">
                                    <div className="history-title">Website Development</div>
                                    <div className="history-sub">ITEM VARIANT</div>
                                </div>
                            </div>
                            <div className="history-item">
                                <div className="history-icon"><Icons.FileText /></div>
                                <div className="history-details">
                                    <div className="history-title">INV-000001</div>
                                    <div className="history-sub">INVOICE</div>
                                </div>
                            </div>
                            <div className="history-item">
                                <div className="history-icon"><Icons.Box /></div>
                                <div className="history-details">
                                    <div className="history-title">Website Development</div>
                                    <div className="history-sub">ITEM</div>
                                </div>
                            </div>
                            <div className="history-item">
                                <div className="history-icon"><Icons.UserSmall /></div>
                                <div className="history-details">
                                    <div className="history-title">Mr. Demo Customer</div>
                                    <div className="history-sub">CONTACTS</div>
                                </div>
                            </div>
                            <div className="history-item">
                                <div className="history-icon"><Icons.UserSmall /></div>
                                <div className="history-details">
                                    <div className="history-title">Mr. Naga</div>
                                    <div className="history-sub">CONTACTS</div>
                                </div>
                            </div>
                            <div className="history-item">
                                <div className="history-icon"><Icons.Box /></div>
                                <div className="history-details">
                                    <div className="history-title">Apple</div>
                                    <div className="history-sub">ITEM VARIANT</div>
                                </div>
                            </div>
                            <div className="history-item">
                                <div className="history-icon"><Icons.Box /></div>
                                <div className="history-details">
                                    <div className="history-title">Apple</div>
                                    <div className="history-sub">ITEM</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className="search-bar-dark">
                    <Icons.Search />
                    <div style={{position: 'relative'}}>
                        <div style={{color: '#3b82f6', marginLeft: '6px', display: 'flex', cursor: 'pointer', position: 'relative', zIndex: isSearchFilterOpen ? 101 : 1}} onClick={() => setIsSearchFilterOpen(!isSearchFilterOpen)}>
                            <Icons.ChevronDown />
                        </div>
                        {isSearchFilterOpen && (
                            <div className="search-filter-dropdown">
                                <div className="search-filter-item">Dashboard</div>
                                <div className="search-filter-item">Customers</div>
                                <div className="search-filter-item">Invoices</div>
                                <div className="search-filter-item">Expenses</div>
                                <div className="search-filter-item">Reports</div>
                                <div className="search-filter-item">Banking</div>
                            </div>
                        )}
                    </div>
                    <div className="search-divider"></div>
                    <input type="text" placeholder="Search in Banking ( / )" />
                </div>
            </div>
            <div className="topbar-right">
                <div className="org-dropdown" onClick={() => setIsOrgPanelOpen(true)}>thecruisersfamily <Icons.ChevronDown /></div>
                <div className="divider"></div>
                <div style={{position: 'relative'}}>
                    <button className="btn-plus-square" style={{position: 'relative', zIndex: isQuickAddOpen ? 101 : 1}} onClick={() => setIsQuickAddOpen(!isQuickAddOpen)}>
                        <Icons.Plus />
                    </button>
                    {isQuickAddOpen && (
                        <div className="quick-add-mega-menu" style={{gridTemplateColumns: 'repeat(4, 200px)'}}>
                            <div className="mega-col">
                                <div className="mega-heading"><Icons.UserSmall /> CUSTOMERS</div>
                                <div className="mega-link"><Icons.Plus className="mega-plus" /> Add Customer</div>
                                <div className="mega-link"><Icons.Plus className="mega-plus" /> Add Vendor</div>
                            </div>
                            <div className="mega-col">
                                <div className="mega-heading"><Icons.FileText /> INVOICES</div>
                                <div className="mega-link"><Icons.Plus className="mega-plus" /> Create Invoice</div>
                                <div className="mega-link"><Icons.Plus className="mega-plus" /> Create Recurring Invoice</div>
                                <div className="mega-link"><Icons.Plus className="mega-plus" /> Record Customer Payment</div>
                            </div>
                            <div className="mega-col">
                                <div className="mega-heading"><Icons.Tag /> EXPENSES</div>
                                <div className="mega-link"><Icons.Plus className="mega-plus" /> Add Expense</div>
                                <div className="mega-link"><Icons.Plus className="mega-plus" /> Add Recurring Expense</div>
                                <div className="mega-link"><Icons.Plus className="mega-plus" /> Add Bill</div>
                            </div>
                            <div className="mega-col">
                                <div className="mega-heading"><Icons.Banking /> BANKING</div>
                                <div className="mega-link"><Icons.Plus className="mega-plus" /> Bank Transfer</div>
                                <div className="mega-link"><Icons.Plus className="mega-plus" /> Card Payment</div>
                                <div className="mega-link"><Icons.Plus className="mega-plus" /> Owner Drawings</div>
                            </div>
                        </div>
                    )}
                </div>
                <button className="icon-btn-light" onClick={() => setPage('settings')}><Icons.Settings /></button>
                <div style={{position: 'relative'}}>
                    <div className="avatar-light" style={{position: 'relative', zIndex: isProfileOpen ? 101 : 1, cursor: 'pointer'}} onClick={() => setIsProfileOpen(!isProfileOpen)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </div>
                    {isProfileOpen && (
                        <div className="profile-dropdown">
                            <div className="profile-header">
                                <div className="profile-avatar-large">
                                    <Icons.UserSmall />
                                </div>
                                <div className="profile-info">
                                    <h4>Naga</h4>
                                    <p>User ID: 12345678</p>
                                    <p>naga@example.com</p>
                                </div>
                            </div>
                            <div className="profile-links">
                                <div className="profile-link">My Account</div>
                                <div className="profile-link">My Organizations</div>
                                <div className="profile-link">Sign Out</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>

        {isOrgPanelOpen && (
            <div className="org-panel-overlay" onClick={() => setIsOrgPanelOpen(false)}>
                <div className="org-panel" onClick={e => e.stopPropagation()}>
                    <div className="org-panel-header">
                        <h2>Organizations</h2>
                        <div className="org-panel-actions">
                            <a href="#" className="manage-link"><Icons.Settings /> Manage</a>
                            <button className="close-btn" onClick={() => setIsOrgPanelOpen(false)}><Icons.Close /></button>
                        </div>
                    </div>
                    <div className="org-panel-subheader">
                        My Organizations
                    </div>
                    <div className="org-panel-list">
                        <div className="org-card active">
                            <div className="org-card-icon">
                                <Icons.Copy />
                            </div>
                            <div className="org-card-details">
                                <h4>thecruisersfamily</h4>
                                <p>Organization ID: 60085861078 &nbsp;&bull;&nbsp; Premium Trial</p>
                            </div>
                            <div className="org-card-check">
                                <Icons.CheckCircle />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
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
                <span>{trendText}{trendType !== 'neutral' ? ' vs last month' : ''}</span>
            </div>
        </div>
    );
}

function IncomeExpenseChart() {
    const data = [
        { name: 'Jan', income: 8000, expense: 4000 },
        { name: 'Feb', income: 9000, expense: 4500 },
        { name: 'Mar', income: 11000, expense: 6000 },
        { name: 'Apr', income: 10000, expense: 5000 },
        { name: 'May', income: 15000, expense: 8000 },
        { name: 'Jun', income: 12000, expense: 10000 },
        { name: 'Jul', income: 14000, expense: 9000 },
        { name: 'Aug', income: 16000, expense: 11000 },
        { name: 'Sep', income: 18000, expense: 12000 },
        { name: 'Oct', income: 13000, expense: 8000 },
        { name: 'Nov', income: 15000, expense: 9500 },
        { name: 'Dec', income: 20000, expense: 13000 },
    ];

    return (
        <div className="chart-section">
            <div className="chart-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span>Income vs Expense</span>
                <select className="date-filter" style={{padding: '4px 8px', fontSize: '13px'}}>
                    <option>This Year</option>
                    <option>Last Year</option>
                </select>
            </div>
            <ResponsiveContainer width="100%" height="90%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value}`} />
                    <Tooltip cursor={{fill: '#F4F5F7'}} formatter={(value) => `₹${value}`} />
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
        { id: 1, typeIcon: '🟢', desc: 'Payment from ABC', date: 'Sep 05', amount: '+₹1,200', type: 'income' },
        { id: 2, typeIcon: '🔴', desc: 'AWS Hosting', date: 'Sep 04', amount: '-₹150', type: 'expense' },
        { id: 3, typeIcon: '🟢', desc: 'Website Project', date: 'Sep 03', amount: '+₹3,200', type: 'income' },
        { id: 4, typeIcon: '🔴', desc: 'Office Supplies', date: 'Sep 01', amount: '-₹45', type: 'expense' },
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
                        <th>Type</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((tx) => (
                        <tr key={tx.id}>
                            <td>{tx.typeIcon} {tx.type === 'income' ? 'Income' : 'Expense'}</td>
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
        { id: 'INV-0043', customer: 'Stark Ltd', date: 'Sep 10', amount: '₹4,500', status: '🟡 Pending', statusClass: 'status-pending' },
        { id: 'INV-0044', customer: 'Wayne Ltd', date: 'Sep 05', amount: '₹850', status: '🔴 Overdue', statusClass: 'status-overdue' },
        { id: 'INV-0046', customer: 'Oscorp', date: 'Sep 12', amount: '₹2,100', status: '🟡 Pending', statusClass: 'status-pending' },
    ];

    return (
        <div className="table-container">
            <div className="table-header">
                <h2>Pending / Overdue Invoices</h2>
                <button className="icon-btn" style={{fontSize: '14px'}}>View All</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Invoice Number</th>
                        <th>Customer</th>
                        <th>Due Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((inv) => (
                        <tr key={inv.id}>
                            <td style={{fontWeight: 500, color: 'var(--accent)'}}>{inv.id}</td>
                            <td>{inv.customer}</td>
                            <td>{inv.date}</td>
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
                    <h1>Dashboard</h1>
                </div>
                <div className="page-actions">
                    <select className="date-filter">
                        <option>Today</option>
                        <option>This Week</option>
                        <option defaultValue>This Month</option>
                        <option>Last Month</option>
                        <option>This Year</option>
                        <option>Custom Range</option>
                    </select>
                    <select className="btn-primary" style={{appearance: 'none', paddingRight: '32px', backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', backgroundSize: '12px auto', border: 'none', outline: 'none', cursor: 'pointer', fontFamily: 'Inter'}}>
                        <option>+ Create New</option>
                        <option>+ Add Income</option>
                        <option>+ Add Expense</option>
                        <option>+ Create Invoice</option>
                        <option>+ Add Customer</option>
                    </select>
                </div>
            </div>

            <div className="summary-grid">
                <SummaryCard title="Total Income" amount="₹16,040.00" trendText="14%" trendType="positive" />
                <SummaryCard title="Total Expense" amount="₹15,398.00" trendText="12%" trendType="negative" />
                <SummaryCard title="Net Profit" amount="₹642.00" trendText="5%" trendType="positive" />
                <SummaryCard title="Outstanding" amount="₹7,450.00" trendText="3 Pending Invoices" trendType="neutral" />
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

function CustomersPage() {
    const customers = [
        { id: 'C-001', name: 'Tony Stark', company: 'Stark Industries', email: 'tony@stark.com', phone: '+1 555-0100', receivables: '₹4,500' },
        { id: 'C-002', name: 'Bruce Wayne', company: 'Wayne Enterprises', email: 'bruce@wayne.com', phone: '+1 555-0200', receivables: '₹850' },
        { id: 'C-003', name: 'Norman Osborn', company: 'Oscorp', email: 'norman@oscorp.com', phone: '+1 555-0300', receivables: '₹2,100' },
        { id: 'C-004', name: 'Peter Parker', company: 'Daily Bugle', email: 'peter@dailybugle.com', phone: '+1 555-0400', receivables: '₹0' },
        { id: 'C-005', name: 'Lex Luthor', company: 'LexCorp', email: 'lex@lexcorp.com', phone: '+1 555-0500', receivables: '₹12,400' },
    ];

    return (
        <main className="main-content">
            <div className="page-header">
                <div className="page-title">
                    <h1>All Customers</h1>
                </div>
                <div className="page-actions">
                    <button className="btn-primary">
                        <Icons.Plus /> New Customer
                    </button>
                </div>
            </div>

            <div className="utility-bar">
                <div className="search-bar-light">
                    <Icons.Search />
                    <input type="text" placeholder="Search Customers..." />
                </div>
                <select className="date-filter">
                    <option>All Customers</option>
                    <option>Active Customers</option>
                    <option>Inactive Customers</option>
                </select>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th style={{width: '40px'}}><input type="checkbox" /></th>
                            <th>Name</th>
                            <th>Company Name</th>
                            <th>Email</th>
                            <th>Work Phone</th>
                            <th>Receivables</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((c) => (
                            <tr key={c.id}>
                                <td><input type="checkbox" /></td>
                                <td style={{fontWeight: 500, color: 'var(--accent)', cursor: 'pointer'}}>{c.name}</td>
                                <td>{c.company}</td>
                                <td>{c.email}</td>
                                <td>{c.phone}</td>
                                <td style={{fontWeight: c.receivables !== '₹0' ? 600 : 400}}>{c.receivables}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <span className="pagination-info">Showing 1–10 of 150 Customers</span>
                    <div className="pagination-controls">
                        <button className="btn-page" disabled>&lt; Previous</button>
                        <button className="btn-page active">1</button>
                        <button className="btn-page">2</button>
                        <button className="btn-page">3</button>
                        <button className="btn-page">Next &gt;</button>
                    </div>
                </div>
            </div>
        </main>
    );
}

function InvoicesPage() {
    const invoices = [
        { id: 'INV-0043', date: 'Sep 10, 2026', customer: 'Stark Industries', status: 'Pending', statusClass: 'status-pending', amount: '₹4,500', balance: '₹4,500' },
        { id: 'INV-0044', date: 'Sep 05, 2026', customer: 'Wayne Enterprises', status: 'Overdue', statusClass: 'status-overdue', amount: '₹850', balance: '₹850' },
        { id: 'INV-0045', date: 'Sep 01, 2026', customer: 'Acme Corp', status: 'Paid', statusClass: 'status-paid', amount: '₹1,200', balance: '₹0' },
        { id: 'INV-0046', date: 'Aug 28, 2026', customer: 'Oscorp', status: 'Sent', statusClass: 'status-sent', amount: '₹2,100', balance: '₹2,100' },
        { id: 'INV-0047', date: 'Aug 25, 2026', customer: 'Globex', status: 'Draft', statusClass: 'status-draft', amount: '₹3,200', balance: '₹3,200' },
    ];

    return (
        <main className="main-content">
            <div className="page-header">
                <div className="page-title">
                    <h1>All Invoices</h1>
                </div>
                <div className="page-actions">
                    <button className="btn-primary">
                        <Icons.Plus /> New Invoice
                    </button>
                </div>
            </div>

            <div className="utility-bar">
                <div className="search-bar-light">
                    <Icons.Search />
                    <input type="text" placeholder="Search Invoices..." />
                </div>
                <select className="date-filter">
                    <option>All Invoices</option>
                    <option>Draft</option>
                    <option>Sent</option>
                    <option>Paid</option>
                    <option>Overdue</option>
                </select>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th style={{width: '40px'}}><input type="checkbox" /></th>
                            <th>Date</th>
                            <th>Invoice Number</th>
                            <th>Customer Name</th>
                            <th>Status</th>
                            <th>Amount</th>
                            <th>Balance Due</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((inv) => (
                            <tr key={inv.id}>
                                <td><input type="checkbox" /></td>
                                <td>{inv.date}</td>
                                <td style={{fontWeight: 500, color: 'var(--accent)', cursor: 'pointer'}}>{inv.id}</td>
                                <td>{inv.customer}</td>
                                <td><span className={`status-badge ${inv.statusClass}`}>{inv.status}</span></td>
                                <td style={{fontWeight: 500}}>{inv.amount}</td>
                                <td style={{fontWeight: inv.balance !== '₹0' ? 600 : 400}}>{inv.balance}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}

function ExpensesPage() {
    const expenses = [
        { id: 1, date: 'Sep 15, 2026', account: 'Office Supplies', ref: 'EXP-0012', vendor: 'Amazon', amount: '₹1,250', status: 'Non-Billable', statusClass: 'status-nonbillable' },
        { id: 2, date: 'Sep 12, 2026', account: 'Travel', ref: 'EXP-0013', vendor: 'Uber', amount: '₹850', status: 'Billable', statusClass: 'status-billable' },
        { id: 3, date: 'Sep 10, 2026', account: 'Meals and Entertainment', ref: 'EXP-0014', vendor: 'Starbucks', amount: '₹320', status: 'Reimbursed', statusClass: 'status-reimbursed' },
        { id: 4, date: 'Sep 05, 2026', account: 'IT and Internet Expenses', ref: 'EXP-0015', vendor: 'AWS', amount: '₹4,500', status: 'Non-Billable', statusClass: 'status-nonbillable' },
        { id: 5, date: 'Sep 01, 2026', account: 'Advertising and Marketing', ref: 'EXP-0016', vendor: 'Google Ads', amount: '₹12,000', status: 'Billable', statusClass: 'status-billable' },
    ];

    return (
        <main className="main-content">
            <div className="page-header">
                <div className="page-title">
                    <h1>All Expenses</h1>
                </div>
                <div className="page-actions">
                    <button className="btn-primary">
                        <Icons.Plus /> New Expense
                    </button>
                </div>
            </div>

            <div className="utility-bar">
                <div className="search-bar-light">
                    <Icons.Search />
                    <input type="text" placeholder="Search Expenses..." />
                </div>
                <select className="date-filter">
                    <option>All Expenses</option>
                    <option>Billable</option>
                    <option>Non-Billable</option>
                    <option>Reimbursed</option>
                </select>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th style={{width: '40px'}}><input type="checkbox" /></th>
                            <th>Date</th>
                            <th>Expense Account</th>
                            <th>Reference#</th>
                            <th>Vendor</th>
                            <th>Status</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((exp) => (
                            <tr key={exp.id}>
                                <td><input type="checkbox" /></td>
                                <td>{exp.date}</td>
                                <td>{exp.account}</td>
                                <td style={{fontWeight: 500, color: 'var(--accent)', cursor: 'pointer'}}>{exp.ref}</td>
                                <td>{exp.vendor}</td>
                                <td><span className={`status-badge ${exp.statusClass}`}>{exp.status}</span></td>
                                <td style={{fontWeight: 600}}>{exp.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <span className="pagination-info">Showing 1–5 of 42 Expenses</span>
                    <div className="pagination-controls">
                        <button className="btn-page" disabled>&lt; Previous</button>
                        <button className="btn-page active">1</button>
                        <button className="btn-page">2</button>
                        <button className="btn-page">Next &gt;</button>
                    </div>
                </div>
            </div>
        </main>
    );
}

function ReportsPage() {
    return (
        <main className="main-content">
            <div className="page-header">
                <div className="page-title">
                    <h1>Reports</h1>
                </div>
            </div>

            <div className="reports-grid">
                <div className="report-category">
                    <h3>Business Overview</h3>
                    <ul className="report-list">
                        <li><a href="#">Profit and Loss</a></li>
                        <li><a href="#">Cash Flow Statement</a></li>
                        <li><a href="#">Balance Sheet</a></li>
                        <li><a href="#">Account Transactions</a></li>
                    </ul>
                </div>

                <div className="report-category">
                    <h3>Sales</h3>
                    <ul className="report-list">
                        <li><a href="#">Sales by Customer</a></li>
                        <li><a href="#">Sales by Item</a></li>
                        <li><a href="#">Invoice Details</a></li>
                    </ul>
                </div>

                <div className="report-category">
                    <h3>Receivables</h3>
                    <ul className="report-list">
                        <li><a href="#">Customer Balances</a></li>
                        <li><a href="#">Aging Summary</a></li>
                    </ul>
                </div>

                <div className="report-category">
                    <h3>Purchases & Expenses</h3>
                    <ul className="report-list">
                        <li><a href="#">Expense Details</a></li>
                        <li><a href="#">Vendor Balances</a></li>
                    </ul>
                </div>
            </div>
        </main>
    );
}

function BankingPage() {
    return (
        <main className="main-content">
            <div className="page-header">
                <div className="page-title">
                    <h1>Banking</h1>
                </div>
                <div className="page-actions">
                    <button className="btn-primary">
                        <Icons.Plus /> Add Bank Account
                    </button>
                </div>
            </div>
            <div className="table-container" style={{padding: '48px', textAlign: 'center', color: 'var(--text-muted)'}}>
                <Icons.Banking />
                <p style={{marginTop: '16px'}}>Banking module coming soon. Connect your bank accounts here.</p>
            </div>
        </main>
    );
}

function SettingsPage() {
    return (
        <main className="main-content">
            <div className="page-header">
                <div className="page-title">
                    <h1>Settings</h1>
                </div>
            </div>

            <div className="settings-container">
                <div className="settings-section">
                    <h3>Organization</h3>
                    <div className="settings-grid">
                        <div className="settings-card">
                            <div className="settings-card-icon"><Icons.Building /></div>
                            <div className="settings-card-content">
                                <h4>Organization Profile</h4>
                                <p>Manage your company details, address, and primary contact.</p>
                            </div>
                        </div>
                        <div className="settings-card">
                            <div className="settings-card-icon"><Icons.Users /></div>
                            <div className="settings-card-content">
                                <h4>Users & Roles</h4>
                                <p>Invite users and define access permissions across the app.</p>
                            </div>
                        </div>
                        <div className="settings-card">
                            <div className="settings-card-icon"><Icons.Grid /></div>
                            <div className="settings-card-content">
                                <h4>Branches</h4>
                                <p>Set up and track finances across multiple branch locations.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="settings-section">
                    <h3>Taxes & Compliance</h3>
                    <div className="settings-grid">
                        <div className="settings-card">
                            <div className="settings-card-icon"><Icons.Percent /></div>
                            <div className="settings-card-content">
                                <h4>Taxes</h4>
                                <p>Configure tax rates, exemptions, and tax authorities.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="settings-section">
                    <h3>Customization</h3>
                    <div className="settings-grid">
                        <div className="settings-card">
                            <div className="settings-card-icon"><Icons.Settings /></div>
                            <div className="settings-card-content">
                                <h4>Preferences</h4>
                                <p>Customize module behaviors, numbering, and general preferences.</p>
                            </div>
                        </div>
                        <div className="settings-card">
                            <div className="settings-card-icon"><Icons.Palette /></div>
                            <div className="settings-card-content">
                                <h4>Templates</h4>
                                <p>Design and customize PDF templates for invoices and quotes.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="settings-section">
                    <h3>Data & Integrations</h3>
                    <div className="settings-grid">
                        <div className="settings-card">
                            <div className="settings-card-icon"><Icons.Globe /></div>
                            <div className="settings-card-content">
                                <h4>Currencies</h4>
                                <p>Add foreign currencies and manage base exchange rates.</p>
                            </div>
                        </div>
                        <div className="settings-card">
                            <div className="settings-card-icon"><Icons.Link /></div>
                            <div className="settings-card-content">
                                <h4>Integrations</h4>
                                <p>Connect with payment gateways and third-party apps.</p>
                            </div>
                        </div>
                        <div className="settings-card">
                            <div className="settings-card-icon"><Icons.Database /></div>
                            <div className="settings-card-content">
                                <h4>Data Backup</h4>
                                <p>Export and safely backup all your financial data.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function App() {
    const [activePage, setActivePage] = useState('dashboard');

    return (
        <div className="app-container">
            <Topbar setPage={setActivePage} />
            <div className="main-wrapper">
                <Sidebar activePage={activePage} setPage={setActivePage} />
                {activePage === 'dashboard' && <MainContent />}
                {activePage === 'customers' && <CustomersPage />}
                {activePage === 'invoices' && <InvoicesPage />}
                {activePage === 'expenses' && <ExpensesPage />}
                {activePage === 'reports' && <ReportsPage />}
                {activePage === 'banking' && <BankingPage />}
                {activePage === 'settings' && <SettingsPage />}
            </div>
        </div>
    );
}

export default App;
