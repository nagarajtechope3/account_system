import React, { useState, useRef, useEffect } from 'react';
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

function CountrySelect({ value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const dropdownRef = useRef(null);

    const countries = [
        { code: '+91', flag: '🇮🇳', name: 'India' },
        { code: '+1', flag: '🇺🇸', name: 'USA/Canada' },
        { code: '+44', flag: '🇬🇧', name: 'UK' },
        { code: '+61', flag: '🇦🇺', name: 'Australia' },
        { code: '+49', flag: '🇩🇪', name: 'Germany' },
        { code: '+33', flag: '🇫🇷', name: 'France' },
        { code: '+81', flag: '🇯🇵', name: 'Japan' },
        { code: '+86', flag: '🇨🇳', name: 'China' },
        { code: '+55', flag: '🇧🇷', name: 'Brazil' },
        { code: '+27', flag: '🇿🇦', name: 'South Africa' },
        { code: '+971', flag: '🇦🇪', name: 'UAE' },
        { code: '+65', flag: '🇸🇬', name: 'Singapore' },
    ];

    const filtered = countries.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.code.includes(searchQuery));
    const selectedCountry = countries.find(c => c.code === value) || countries[0];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} style={{position: 'relative', borderRight: '1px solid var(--border-color)', background: '#f9fafb'}}>
            <div onClick={() => setIsOpen(!isOpen)} style={{padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', height: '100%', fontSize: '13px'}}>
                <span>{selectedCountry.flag}</span>
                <span>{selectedCountry.code}</span>
                <Icons.ChevronDown />
            </div>
            {isOpen && (
                <div style={{position: 'absolute', top: '100%', left: 0, background: 'white', border: '1px solid var(--border-color)', borderRadius: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 1001, width: '220px', marginTop: '4px'}}>
                    <div style={{padding: '8px', borderBottom: '1px solid var(--border-color)'}}>
                        <input type="text" placeholder="Search country or code..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{width: '100%', padding: '6px 8px', border: '1px solid var(--border-color)', borderRadius: '4px', outline: 'none', boxSizing: 'border-box', fontSize: '13px'}} onClick={e => e.stopPropagation()} autoFocus />
                    </div>
                    <div style={{maxHeight: '200px', overflowY: 'auto'}}>
                        {filtered.map(c => (
                            <div key={c.code + c.name} style={{padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px'}} onClick={() => { onChange(c.code); setIsOpen(false); setSearchQuery(''); }} onMouseEnter={e => e.currentTarget.style.background = '#f4f5f7'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                <span>{c.flag}</span>
                                <span style={{flex: 1}}>{c.name}</span>
                                <span style={{color: 'var(--text-muted)'}}>{c.code}</span>
                            </div>
                        ))}
                        {filtered.length === 0 && <div style={{padding: '12px 8px', color: 'var(--text-muted)', fontSize: '13px', textAlign: 'center'}}>No results found</div>}
                    </div>
                </div>
            )}
        </div>
    );
}

function CustomerModal({ isOpen, onClose, onAddCustomer }) {
    if (!isOpen) return null;
    const [salutation, setSalutation] = useState('Mr.');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [company, setCompany] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [workPhoneCode, setWorkPhoneCode] = useState('+91');
    const [workPhone, setWorkPhone] = useState('');
    const [mobilePhoneCode, setMobilePhoneCode] = useState('+91');
    const [mobilePhone, setMobilePhone] = useState('');
    
    const formatPhoneNumber = (value, code) => {
        const numbers = value.replace(/\D/g, '');
        if (!numbers) return '';
        
        if (code === '+1') { // USA/Canada
            if (numbers.length <= 3) return numbers;
            if (numbers.length <= 6) return `(${numbers.slice(0,3)}) ${numbers.slice(3)}`;
            return `(${numbers.slice(0,3)}) ${numbers.slice(3,6)}-${numbers.slice(6,10)}`;
        } else if (code === '+91') { // India
            if (numbers.length <= 5) return numbers;
            return `${numbers.slice(0,5)} ${numbers.slice(5,10)}`;
        } else if (code === '+44') { // UK
            if (numbers.length <= 4) return numbers;
            return `${numbers.slice(0,4)} ${numbers.slice(4,10)}`;
        } else if (code === '+61') { // Australia
            if (numbers.length <= 3) return numbers;
            if (numbers.length <= 6) return `${numbers.slice(0,3)} ${numbers.slice(3)}`;
            return `${numbers.slice(0,3)} ${numbers.slice(3,6)} ${numbers.slice(6,9)}`;
        }
        // Default spacing for others
        return numbers.replace(/(\d{3})(?=\d)/g, '$1 ').trim();
    };

    const handleWorkPhoneCodeChange = (code) => {
        setWorkPhoneCode(code);
        setWorkPhone(formatPhoneNumber(workPhone, code));
    };

    const handleMobilePhoneCodeChange = (code) => {
        setMobilePhoneCode(code);
        setMobilePhone(formatPhoneNumber(mobilePhone, code));
    };

    // Auto-populate Display Name based on First and Last name if empty
    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
        if (!displayName || displayName === `${firstName} ${lastName}`.trim()) {
            setDisplayName(`${e.target.value} ${lastName}`.trim());
        }
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
        if (!displayName || displayName === `${firstName} ${lastName}`.trim()) {
            setDisplayName(`${firstName} ${e.target.value}`.trim());
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let finalPhone = '-';
        if (workPhone || mobilePhone) {
            const parts = [];
            if (workPhone) parts.push(`${workPhoneCode} ${workPhone}`);
            if (mobilePhone) parts.push(`${mobilePhoneCode} ${mobilePhone}`);
            finalPhone = parts.join(', ');
        }

        onAddCustomer({ 
            id: 'C-' + Math.floor(Math.random()*1000), 
            name: displayName || `${firstName} ${lastName}`, 
            company, 
            email, 
            phone: finalPhone, 
            receivables: '₹0' 
        });
        onClose();
        setSalutation('Mr.'); setFirstName(''); setLastName(''); setCompany(''); setDisplayName(''); setEmail(''); setWorkPhone(''); setMobilePhone(''); setWorkPhoneCode('+91'); setMobilePhoneCode('+91');
    };

    return (
        <div className="modal-overlay" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div className="modal-content" style={{background: 'white', padding: '32px', borderRadius: '8px', width: '600px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                    <h2 style={{margin: 0, fontSize: '18px', color: 'var(--text-main)'}}>New Customer</h2>
                    <button onClick={onClose} style={{background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)'}}><Icons.Close /></button>
                </div>
                <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                    
                    <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                        <label style={{width: '140px', fontSize: '13px', fontWeight: 500, color: 'var(--text-main)'}}>Primary Contact</label>
                        <select value={salutation} onChange={e => setSalutation(e.target.value)} style={{width: '80px', padding: '8px', border: '1px solid var(--border-color)', borderRadius: '4px'}}>
                            <option>Mr.</option>
                            <option>Mrs.</option>
                            <option>Ms.</option>
                            <option>Dr.</option>
                        </select>
                        <input type="text" placeholder="First Name" value={firstName} onChange={handleFirstNameChange} style={{flex: 1, padding: '8px', border: '1px solid var(--border-color)', borderRadius: '4px'}} />
                        <input type="text" placeholder="Last Name" value={lastName} onChange={handleLastNameChange} style={{flex: 1, padding: '8px', border: '1px solid var(--border-color)', borderRadius: '4px'}} />
                    </div>

                    <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                        <label style={{width: '140px', fontSize: '13px', fontWeight: 500, color: 'var(--text-main)'}}>Company Name</label>
                        <input type="text" value={company} onChange={e => setCompany(e.target.value)} style={{flex: 1, padding: '8px', border: '1px solid var(--border-color)', borderRadius: '4px'}} />
                    </div>

                    <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                        <label style={{width: '140px', fontSize: '13px', fontWeight: 500, color: 'var(--text-main)'}}>
                            <span style={{color: '#EF4444'}}>Display Name*</span>
                        </label>
                        <input type="text" required value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="Select or type to add" style={{flex: 1, padding: '8px', border: '1px solid var(--border-color)', borderRadius: '4px'}} />
                    </div>

                    <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                        <label style={{width: '140px', fontSize: '13px', fontWeight: 500, color: 'var(--text-main)'}}>Email Address</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{flex: 1, padding: '8px', border: '1px solid var(--border-color)', borderRadius: '4px'}} />
                    </div>

                    <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                        <label style={{width: '140px', fontSize: '13px', fontWeight: 500, color: 'var(--text-main)'}}>Phone</label>
                        <div style={{display: 'flex', flex: 1, gap: '8px', minWidth: 0}}>
                            <div style={{display: 'flex', flex: 1, border: '1px solid var(--border-color)', borderRadius: '4px', overflow: 'visible', minWidth: 0}}>
                                <CountrySelect value={workPhoneCode} onChange={handleWorkPhoneCodeChange} />
                                <input type="text" placeholder="Work Phone" value={workPhone} onChange={e => setWorkPhone(formatPhoneNumber(e.target.value, workPhoneCode))} style={{flex: 1, padding: '8px', border: 'none', outline: 'none', width: '100%', minWidth: 0}} />
                            </div>
                            <div style={{display: 'flex', flex: 1, border: '1px solid var(--border-color)', borderRadius: '4px', overflow: 'visible', minWidth: 0}}>
                                <CountrySelect value={mobilePhoneCode} onChange={handleMobilePhoneCodeChange} />
                                <input type="text" placeholder="Mobile" value={mobilePhone} onChange={e => setMobilePhone(formatPhoneNumber(e.target.value, mobilePhoneCode))} style={{flex: 1, padding: '8px', border: 'none', outline: 'none', width: '100%', minWidth: 0}} />
                            </div>
                        </div>
                    </div>

                    <div style={{display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end'}}>
                        <button type="button" onClick={onClose} style={{padding: '10px 24px', background: 'white', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer', fontWeight: 500, color: 'var(--text-main)'}}>Cancel</button>
                        <button type="submit" className="btn-primary" style={{padding: '10px 24px'}}>Save Customer</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function InvoiceModal({ isOpen, onClose, onAddInvoice, customers }) {
    if (!isOpen) return null;
    
    const [customer, setCustomer] = useState('');
    const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
    const [dueDate, setDueDate] = useState('');
    const [invoiceNumber, setInvoiceNumber] = useState('INV-' + Math.floor(Math.random()*100000).toString().padStart(6, '0'));
    
    const [items, setItems] = useState([
        { id: Date.now(), item: '', qty: 1, rate: 0, tax: 0, amount: 0 }
    ]);
    const [discount, setDiscount] = useState(0);

    const mockProducts = ['Web Design', 'Web Hosting', 'SEO Consulting', 'Software License', 'Maintenance Retainer'];

    const handleItemChange = (id, field, value) => {
        setItems(prev => prev.map(item => {
            if (item.id === id) {
                const updated = { ...item, [field]: value };
                // Calculate amount
                const baseAmount = updated.qty * updated.rate;
                const taxAmount = baseAmount * (updated.tax / 100);
                updated.amount = baseAmount + taxAmount;
                return updated;
            }
            return item;
        }));
    };

    const addItem = () => {
        setItems([...items, { id: Date.now(), item: '', qty: 1, rate: 0, tax: 0, amount: 0 }]);
    };

    const removeItem = (id) => {
        if (items.length > 1) {
            setItems(items.filter(item => item.id !== id));
        }
    };

    const subtotal = items.reduce((sum, item) => sum + (item.qty * item.rate), 0);
    const totalTax = items.reduce((sum, item) => sum + ((item.qty * item.rate) * (item.tax / 100)), 0);
    const grandTotal = subtotal + totalTax - discount;

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddInvoice({ 
            id: invoiceNumber, 
            date: new Date(invoiceDate).toLocaleDateString('en-US', {month: 'short', day: '2-digit', year: 'numeric'}), 
            dueDate: new Date(dueDate).toLocaleDateString('en-US', {month: 'short', day: '2-digit', year: 'numeric'}),
            customer, 
            status: 'Draft', 
            statusClass: 'status-draft', 
            amount: '₹' + grandTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","), 
            balance: '₹' + grandTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            items: items,
            subtotal: subtotal,
            discount: discount,
            tax: totalTax
        });
        onClose();
        setCustomer('');
        setItems([{ id: Date.now(), item: '', qty: 1, rate: 0, tax: 0, amount: 0 }]);
        setDiscount(0);
        setInvoiceNumber('INV-' + Math.floor(Math.random()*100000).toString().padStart(6, '0'));
    };

    return (
        <div className="modal-overlay" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div className="modal-content" style={{background: 'white', padding: '32px', borderRadius: '8px', width: '900px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 10px 25px rgba(0,0,0,0.2)'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                    <h2 style={{margin: 0, fontSize: '20px', color: 'var(--text-main)'}}>New Invoice</h2>
                    <button type="button" onClick={onClose} style={{background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)'}}><Icons.Close /></button>
                </div>

                <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                    <div style={{display: 'flex', gap: '24px', background: '#f9fafb', padding: '20px', borderRadius: '8px'}}>
                        <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '16px'}}>
                            <div>
                                <label style={{display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-main)', marginBottom: '8px'}}>Customer Name*</label>
                                <select required value={customer} onChange={e => setCustomer(e.target.value)} style={{width: '100%', padding: '10px', border: '1px solid var(--border-color)', borderRadius: '4px', boxSizing: 'border-box'}}>
                                    <option value="">-- Select Customer --</option>
                                    {customers.map(c => <option key={c.id} value={c.company || c.name}>{c.company || c.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={{display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-main)', marginBottom: '8px'}}>Invoice Number*</label>
                                <input type="text" required value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} style={{width: '100%', padding: '10px', border: '1px solid var(--border-color)', borderRadius: '4px', boxSizing: 'border-box'}} />
                            </div>
                        </div>
                        <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '16px'}}>
                            <div>
                                <label style={{display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-main)', marginBottom: '8px'}}>Invoice Date*</label>
                                <input type="date" required value={invoiceDate} onChange={e => setInvoiceDate(e.target.value)} style={{width: '100%', padding: '10px', border: '1px solid var(--border-color)', borderRadius: '4px', boxSizing: 'border-box'}} />
                            </div>
                            <div>
                                <label style={{display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-main)', marginBottom: '8px'}}>Due Date*</label>
                                <input type="date" required value={dueDate} onChange={e => setDueDate(e.target.value)} style={{width: '100%', padding: '10px', border: '1px solid var(--border-color)', borderRadius: '4px', boxSizing: 'border-box'}} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <table style={{width: '100%', borderCollapse: 'collapse', border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden'}}>
                            <thead style={{background: '#f1f5f9', textAlign: 'left', fontSize: '13px'}}>
                                <tr>
                                    <th style={{padding: '12px', borderBottom: '1px solid var(--border-color)', width: '30%'}}>Item / Service</th>
                                    <th style={{padding: '12px', borderBottom: '1px solid var(--border-color)'}}>Qty</th>
                                    <th style={{padding: '12px', borderBottom: '1px solid var(--border-color)'}}>Unit Price (₹)</th>
                                    <th style={{padding: '12px', borderBottom: '1px solid var(--border-color)'}}>Tax (%)</th>
                                    <th style={{padding: '12px', borderBottom: '1px solid var(--border-color)'}}>Amount (₹)</th>
                                    <th style={{padding: '12px', borderBottom: '1px solid var(--border-color)', width: '50px'}}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={item.id} style={{borderBottom: '1px solid var(--border-color)'}}>
                                        <td style={{padding: '8px'}}>
                                            <input type="text" list="products" required value={item.item} onChange={e => handleItemChange(item.id, 'item', e.target.value)} placeholder="Type or select..." style={{width: '100%', padding: '8px', border: '1px solid var(--border-color)', borderRadius: '4px', boxSizing: 'border-box'}} />
                                            <datalist id="products">
                                                {mockProducts.map(p => <option key={p} value={p} />)}
                                            </datalist>
                                        </td>
                                        <td style={{padding: '8px'}}>
                                            <input type="number" required min="1" value={item.qty} onChange={e => handleItemChange(item.id, 'qty', parseFloat(e.target.value) || 0)} style={{width: '100%', padding: '8px', border: '1px solid var(--border-color)', borderRadius: '4px', boxSizing: 'border-box'}} />
                                        </td>
                                        <td style={{padding: '8px'}}>
                                            <input type="number" required min="0" step="0.01" value={item.rate} onChange={e => handleItemChange(item.id, 'rate', parseFloat(e.target.value) || 0)} style={{width: '100%', padding: '8px', border: '1px solid var(--border-color)', borderRadius: '4px', boxSizing: 'border-box'}} />
                                        </td>
                                        <td style={{padding: '8px'}}>
                                            <select value={item.tax} onChange={e => handleItemChange(item.id, 'tax', parseFloat(e.target.value) || 0)} style={{width: '100%', padding: '8px', border: '1px solid var(--border-color)', borderRadius: '4px', boxSizing: 'border-box'}}>
                                                <option value="0">0%</option>
                                                <option value="5">5%</option>
                                                <option value="12">12%</option>
                                                <option value="18">18%</option>
                                                <option value="28">28%</option>
                                            </select>
                                        </td>
                                        <td style={{padding: '8px', fontWeight: 500}}>
                                            {item.amount.toFixed(2)}
                                        </td>
                                        <td style={{padding: '8px', textAlign: 'center'}}>
                                            <button type="button" onClick={() => removeItem(item.id)} disabled={items.length === 1} style={{background: 'none', border: 'none', cursor: items.length > 1 ? 'pointer' : 'not-allowed', color: items.length > 1 ? '#EF4444' : 'var(--text-muted)'}}>
                                                <Icons.Close />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button type="button" onClick={addItem} style={{marginTop: '12px', background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'}}>
                            <Icons.Plus style={{width: '16px', height: '16px'}} /> Add New Line
                        </button>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <div style={{width: '350px', background: '#f9fafb', padding: '20px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '12px'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--text-main)'}}>
                                <span>Subtotal</span>
                                <span>₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', color: 'var(--text-main)'}}>
                                <span>Discount (₹)</span>
                                <input type="number" min="0" step="0.01" value={discount} onChange={e => setDiscount(parseFloat(e.target.value) || 0)} style={{width: '100px', padding: '6px', border: '1px solid var(--border-color)', borderRadius: '4px', textAlign: 'right'}} />
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--text-main)'}}>
                                <span>Total Tax</span>
                                <span>₹{totalTax.toFixed(2)}</span>
                            </div>
                            <div style={{height: '1px', background: 'var(--border-color)', margin: '8px 0'}}></div>
                            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 600, color: 'var(--accent)'}}>
                                <span>Grand Total</span>
                                <span>₹{grandTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div style={{display: 'flex', gap: '12px', marginTop: '16px', justifyContent: 'flex-end'}}>
                        <button type="button" onClick={onClose} style={{padding: '12px 24px', background: 'white', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer', fontWeight: 500, color: 'var(--text-main)'}}>Cancel</button>
                        <button type="submit" className="btn-primary" style={{padding: '12px 32px'}}>Save Invoice</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function InvoiceDetailModal({ invoice, onClose }) {
    if (!invoice) return null;

    return (
        <div className="modal-overlay" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div className="modal-content" style={{background: 'white', padding: '0', borderRadius: '8px', width: '850px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', position: 'relative'}}>
                
                {/* Header Action Bar */}
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', borderBottom: '1px solid var(--border-color)', background: '#f9fafb', position: 'sticky', top: 0, zIndex: 10}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                        <h2 style={{margin: 0, fontSize: '18px', color: 'var(--text-main)'}}>{invoice.id}</h2>
                        <span className={`status-badge ${invoice.statusClass}`}>{invoice.status}</span>
                    </div>
                    <div style={{display: 'flex', gap: '16px'}}>
                        <button type="button" style={{background: 'white', border: '1px solid var(--border-color)', padding: '6px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 500, color: 'var(--text-main)'}} onClick={() => alert('Printing Invoice...')}>Print</button>
                        <button onClick={onClose} style={{background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)'}}><Icons.Close /></button>
                    </div>
                </div>

                {/* Invoice Document Body */}
                <div style={{padding: '48px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '48px'}}>
                        <div>
                            <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px'}}>
                                <Icons.Logo />
                                <span style={{fontSize: '24px', fontWeight: 700, color: 'var(--primary)'}}>ArjavaBooks</span>
                            </div>
                            <p style={{margin: '4px 0', color: 'var(--text-muted)', fontSize: '13px'}}>123 Tech Park, Silicon Valley</p>
                            <p style={{margin: '4px 0', color: 'var(--text-muted)', fontSize: '13px'}}>San Francisco, CA 94107</p>
                            <p style={{margin: '4px 0', color: 'var(--text-muted)', fontSize: '13px'}}>contact@arjavabooks.com</p>
                        </div>
                        <div style={{textAlign: 'right'}}>
                            <h1 style={{margin: '0 0 16px 0', fontSize: '32px', color: 'var(--text-main)', letterSpacing: '2px', textTransform: 'uppercase'}}>Invoice</h1>
                            <p style={{margin: '4px 0', color: 'var(--text-main)', fontSize: '14px'}}><strong>Invoice#:</strong> {invoice.id}</p>
                            <p style={{margin: '4px 0', color: 'var(--text-main)', fontSize: '14px'}}><strong>Invoice Date:</strong> {invoice.date}</p>
                            <p style={{margin: '4px 0', color: 'var(--text-main)', fontSize: '14px'}}><strong>Due Date:</strong> {invoice.dueDate || 'N/A'}</p>
                        </div>
                    </div>

                    <div style={{marginBottom: '48px'}}>
                        <h3 style={{margin: '0 0 8px 0', fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase'}}>Bill To</h3>
                        <p style={{margin: '0', fontSize: '16px', fontWeight: 600, color: 'var(--text-main)'}}>{invoice.customer}</p>
                    </div>

                    <table style={{width: '100%', borderCollapse: 'collapse', marginBottom: '32px'}}>
                        <thead style={{background: 'var(--text-main)', color: 'white'}}>
                            <tr>
                                <th style={{padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: 600}}>Item / Service</th>
                                <th style={{padding: '12px', textAlign: 'right', fontSize: '13px', fontWeight: 600}}>Qty</th>
                                <th style={{padding: '12px', textAlign: 'right', fontSize: '13px', fontWeight: 600}}>Rate</th>
                                <th style={{padding: '12px', textAlign: 'right', fontSize: '13px', fontWeight: 600}}>Tax</th>
                                <th style={{padding: '12px', textAlign: 'right', fontSize: '13px', fontWeight: 600}}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoice.items && invoice.items.length > 0 ? invoice.items.map((item, idx) => (
                                <tr key={idx} style={{borderBottom: '1px solid var(--border-color)'}}>
                                    <td style={{padding: '16px 12px', color: 'var(--text-main)', fontSize: '14px'}}>{item.item}</td>
                                    <td style={{padding: '16px 12px', textAlign: 'right', color: 'var(--text-main)', fontSize: '14px'}}>{item.qty}</td>
                                    <td style={{padding: '16px 12px', textAlign: 'right', color: 'var(--text-main)', fontSize: '14px'}}>₹{item.rate.toFixed(2)}</td>
                                    <td style={{padding: '16px 12px', textAlign: 'right', color: 'var(--text-main)', fontSize: '14px'}}>{item.tax}%</td>
                                    <td style={{padding: '16px 12px', textAlign: 'right', color: 'var(--text-main)', fontSize: '14px', fontWeight: 500}}>₹{item.amount.toFixed(2)}</td>
                                </tr>
                            )) : (
                                <tr style={{borderBottom: '1px solid var(--border-color)'}}>
                                    <td colSpan="5" style={{padding: '16px 12px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px'}}>Legacy invoice - line items not available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <div style={{width: '350px'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0', color: 'var(--text-main)', fontSize: '14px'}}>
                                <span>Subtotal</span>
                                <span>₹{(invoice.subtotal || 0).toFixed(2)}</span>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0', color: 'var(--text-main)', fontSize: '14px'}}>
                                <span>Discount</span>
                                <span>- ₹{(invoice.discount || 0).toFixed(2)}</span>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0', color: 'var(--text-main)', fontSize: '14px'}}>
                                <span>Tax</span>
                                <span>₹{(invoice.tax || 0).toFixed(2)}</span>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderTop: '2px solid var(--border-color)', color: 'var(--text-main)', fontSize: '18px', fontWeight: 700, marginTop: '8px'}}>
                                <span>Grand Total</span>
                                <span>{invoice.amount}</span>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between', background: '#f1f5f9', color: 'var(--text-main)', fontSize: '14px', fontWeight: 600, padding: '12px', borderRadius: '4px', marginTop: '16px'}}>
                                <span>Balance Due</span>
                                <span>{invoice.balance}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ExpenseModal({ isOpen, onClose, onAddExpense }) {
    if (!isOpen) return null;
    
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [account, setAccount] = useState('');
    const [vendor, setVendor] = useState('');
    const [amount, setAmount] = useState('');
    const [tax, setTax] = useState('0');
    const [reference, setReference] = useState('');
    const [notes, setNotes] = useState('');
    const [status, setStatus] = useState('Non-Billable');
    
    const parsedAmount = parseFloat(amount) || 0;
    const parsedTax = parseFloat(tax) || 0;
    const taxAmount = parsedAmount * (parsedTax / 100);
    const totalAmount = parsedAmount + taxAmount;

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddExpense({ 
            id: Date.now(), 
            date: new Date(date).toLocaleDateString('en-US', {month: 'short', day: '2-digit', year: 'numeric'}), 
            account, 
            ref: reference || ('EXP-' + Math.floor(Math.random()*100000).toString().padStart(6, '0')), 
            vendor, 
            notes,
            status, 
            statusClass: status === 'Billable' ? 'status-billable' : status === 'Reimbursed' ? 'status-reimbursed' : 'status-nonbillable', 
            baseAmount: parsedAmount,
            taxAmount: taxAmount,
            taxRate: parsedTax,
            amount: '₹' + totalAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
        });
        onClose();
        setDate(new Date().toISOString().split('T')[0]);
        setAccount(''); setVendor(''); setAmount(''); setTax('0'); setReference(''); setNotes(''); setStatus('Non-Billable');
    };

    return (
        <div className="modal-overlay" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div className="modal-content" style={{background: 'white', padding: '32px', borderRadius: '8px', width: '600px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 10px 25px rgba(0,0,0,0.2)'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                    <h2 style={{margin: 0, fontSize: '20px', color: 'var(--text-main)'}}>Record Expense</h2>
                    <button type="button" onClick={onClose} style={{background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)'}}><Icons.Close /></button>
                </div>

                <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                    <div style={{display: 'flex', gap: '16px'}}>
                        <div style={{flex: 1}}>
                            <label style={{display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-main)', marginBottom: '8px'}}>Date*</label>
                            <input type="date" required value={date} onChange={e => setDate(e.target.value)} style={{width: '100%', padding: '10px', border: '1px solid var(--border-color)', borderRadius: '4px', boxSizing: 'border-box'}} />
                        </div>
                        <div style={{flex: 1}}>
                            <label style={{display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-main)', marginBottom: '8px'}}>Expense Account*</label>
                            <select required value={account} onChange={e => setAccount(e.target.value)} style={{width: '100%', padding: '10px', border: '1px solid var(--border-color)', borderRadius: '4px', boxSizing: 'border-box'}}>
                                <option value="">-- Choose Account --</option>
                                <option value="Office Supplies">Office Supplies</option>
                                <option value="Travel">Travel</option>
                                <option value="Meals and Entertainment">Meals and Entertainment</option>
                                <option value="IT and Internet Expenses">IT and Internet Expenses</option>
                                <option value="Advertising and Marketing">Advertising and Marketing</option>
                                <option value="Rent Expense">Rent Expense</option>
                                <option value="Repairs and Maintenance">Repairs and Maintenance</option>
                            </select>
                        </div>
                    </div>

                    <div style={{display: 'flex', gap: '16px'}}>
                        <div style={{flex: 1}}>
                            <label style={{display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-main)', marginBottom: '8px'}}>Amount (₹)*</label>
                            <input type="number" required min="0" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} style={{width: '100%', padding: '10px', border: '1px solid var(--border-color)', borderRadius: '4px', boxSizing: 'border-box'}} />
                        </div>
                        <div style={{flex: 1}}>
                            <label style={{display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-main)', marginBottom: '8px'}}>Tax Paid</label>
                            <select value={tax} onChange={e => setTax(e.target.value)} style={{width: '100%', padding: '10px', border: '1px solid var(--border-color)', borderRadius: '4px', boxSizing: 'border-box'}}>
                                <option value="0">0%</option>
                                <option value="5">5%</option>
                                <option value="12">12%</option>
                                <option value="18">18%</option>
                                <option value="28">28%</option>
                            </select>
                        </div>
                    </div>

                    <div style={{display: 'flex', gap: '16px'}}>
                        <div style={{flex: 1}}>
                            <label style={{display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-main)', marginBottom: '8px'}}>Vendor Name*</label>
                            <input type="text" required value={vendor} onChange={e => setVendor(e.target.value)} style={{width: '100%', padding: '10px', border: '1px solid var(--border-color)', borderRadius: '4px', boxSizing: 'border-box'}} />
                        </div>
                        <div style={{flex: 1}}>
                            <label style={{display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-main)', marginBottom: '8px'}}>Reference#</label>
                            <input type="text" placeholder="e.g. Receipt #1234" value={reference} onChange={e => setReference(e.target.value)} style={{width: '100%', padding: '10px', border: '1px solid var(--border-color)', borderRadius: '4px', boxSizing: 'border-box'}} />
                        </div>
                    </div>
                    
                    <div>
                        <label style={{display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-main)', marginBottom: '8px'}}>Notes / Description</label>
                        <textarea rows="2" value={notes} onChange={e => setNotes(e.target.value)} style={{width: '100%', padding: '10px', border: '1px solid var(--border-color)', borderRadius: '4px', boxSizing: 'border-box'}}></textarea>
                    </div>

                    <div>
                        <label style={{display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-main)', marginBottom: '8px'}}>Status</label>
                        <select value={status} onChange={e => setStatus(e.target.value)} style={{width: '100%', padding: '10px', border: '1px solid var(--border-color)', borderRadius: '4px', boxSizing: 'border-box'}}>
                            <option value="Non-Billable">Non-Billable</option>
                            <option value="Billable">Billable</option>
                            <option value="Reimbursed">Reimbursed</option>
                        </select>
                    </div>

                    <div style={{background: '#f9fafb', padding: '16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <span style={{fontSize: '16px', color: 'var(--text-main)', fontWeight: 500}}>Grand Total:</span>
                        <span style={{fontSize: '20px', color: 'var(--accent)', fontWeight: 600}}>₹{totalAmount.toFixed(2)}</span>
                    </div>

                    <div style={{display: 'flex', gap: '12px', marginTop: '8px', justifyContent: 'flex-end'}}>
                        <button type="button" onClick={onClose} style={{padding: '12px 24px', background: 'white', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer', fontWeight: 500, color: 'var(--text-main)'}}>Cancel</button>
                        <button type="submit" className="btn-primary" style={{padding: '12px 32px'}}>Save Expense</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function ExpenseDetailModal({ expense, onClose }) {
    if (!expense) return null;

    return (
        <div className="modal-overlay" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div className="modal-content" style={{background: 'white', padding: '0', borderRadius: '8px', width: '600px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', position: 'relative'}}>
                
                {/* Header */}
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid var(--border-color)', background: '#f9fafb', position: 'sticky', top: 0, zIndex: 10}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                        <h2 style={{margin: 0, fontSize: '18px', color: 'var(--text-main)'}}>Expense Receipt</h2>
                        <span className={`status-badge ${expense.statusClass}`}>{expense.status}</span>
                    </div>
                    <button onClick={onClose} style={{background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)'}}><Icons.Close /></button>
                </div>

                {/* Body */}
                <div style={{padding: '32px 48px'}}>
                    <div style={{textAlign: 'center', marginBottom: '32px'}}>
                        <div style={{width: '64px', height: '64px', background: 'var(--accent)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto'}}>
                            <Icons.Tag style={{width: '32px', height: '32px'}} />
                        </div>
                        <h1 style={{margin: '0', fontSize: '36px', color: 'var(--text-main)', fontWeight: 700}}>{expense.amount}</h1>
                        <p style={{margin: '8px 0 0 0', color: 'var(--text-muted)', fontSize: '15px'}}>Paid to <strong style={{color: 'var(--text-main)'}}>{expense.vendor}</strong></p>
                    </div>

                    <div style={{background: '#f9fafb', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '24px'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)', marginBottom: '16px'}}>
                            <div>
                                <span style={{display: 'block', fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px'}}>Date</span>
                                <span style={{fontSize: '15px', color: 'var(--text-main)', fontWeight: 500}}>{expense.date}</span>
                            </div>
                            <div style={{textAlign: 'right'}}>
                                <span style={{display: 'block', fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px'}}>Reference #</span>
                                <span style={{fontSize: '15px', color: 'var(--text-main)', fontWeight: 500}}>{expense.ref}</span>
                            </div>
                        </div>

                        <div style={{paddingBottom: '16px', borderBottom: '1px solid var(--border-color)', marginBottom: '16px'}}>
                            <span style={{display: 'block', fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px'}}>Category</span>
                            <span style={{fontSize: '15px', color: 'var(--text-main)', fontWeight: 500}}>{expense.account}</span>
                        </div>

                        {expense.notes && (
                            <div style={{paddingBottom: '16px', borderBottom: '1px solid var(--border-color)', marginBottom: '16px'}}>
                                <span style={{display: 'block', fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px'}}>Notes</span>
                                <span style={{fontSize: '15px', color: 'var(--text-main)'}}>{expense.notes}</span>
                            </div>
                        )}

                        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
                            <span style={{color: 'var(--text-muted)', fontSize: '14px'}}>Base Amount</span>
                            <span style={{color: 'var(--text-main)', fontSize: '14px', fontWeight: 500}}>₹{(expense.baseAmount || 0).toFixed(2)}</span>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '16px'}}>
                            <span style={{color: 'var(--text-muted)', fontSize: '14px'}}>Tax ({expense.taxRate || 0}%)</span>
                            <span style={{color: 'var(--text-main)', fontSize: '14px', fontWeight: 500}}>₹{(expense.taxAmount || 0).toFixed(2)}</span>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between', paddingTop: '16px', borderTop: '2px dashed var(--border-color)'}}>
                            <span style={{color: 'var(--text-main)', fontSize: '16px', fontWeight: 600}}>Total Amount</span>
                            <span style={{color: 'var(--accent)', fontSize: '16px', fontWeight: 600}}>{expense.amount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Topbar({ setPage, customers = [], invoices = [], historyLogs = [], onOpenCustomerModal, onOpenInvoiceModal, onOpenExpenseModal }) {
    const [isOrgPanelOpen, setIsOrgPanelOpen] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [isSearchFilterOpen, setIsSearchFilterOpen] = useState(false);
    const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const searchResults = searchQuery ? [
        ...customers.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.company.toLowerCase().includes(searchQuery.toLowerCase())).map(c => ({ type: 'Customer', text: c.name, sub: c.company })),
        ...invoices.filter(i => i.id.toLowerCase().includes(searchQuery.toLowerCase()) || i.customer.toLowerCase().includes(searchQuery.toLowerCase())).map(i => ({ type: 'Invoice', text: i.id, sub: i.customer }))
    ] : [];

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
                            {historyLogs.length > 0 ? historyLogs.map(log => (
                                <div key={log.id} className="history-item">
                                    <div className="history-icon">{log.icon}</div>
                                    <div className="history-details">
                                        <div className="history-title">{log.title}</div>
                                        <div className="history-sub">{log.sub}</div>
                                    </div>
                                </div>
                            )) : (
                                <div style={{padding: '16px', textAlign: 'center', color: 'var(--text-muted)'}}>No recent activity</div>
                            )}
                        </div>
                    )}
                </div>
                
                <div className="search-bar-dark">
                    <Icons.Search />
                    <div className="search-divider"></div>
                    <div style={{position: 'relative', width: '100%'}}>
                        <input 
                            type="text" 
                            placeholder="Search in Customers, Invoices..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{width: '100%', background: 'transparent', border: 'none', color: 'white', outline: 'none', fontSize: '13px'}}
                        />
                        {searchQuery && (
                            <div className="search-dropdown" style={{position: 'absolute', top: '100%', left: 0, right: 0, background: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: '6px', marginTop: '12px', zIndex: 100, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', maxHeight: '300px', overflowY: 'auto'}}>
                                {searchResults.length > 0 ? searchResults.map((res, i) => (
                                    <div key={i} style={{padding: '12px 16px', borderBottom: '1px solid var(--border-color)', cursor: 'pointer', background: 'white'}} onClick={() => { setSearchQuery(''); setIsSearchFilterOpen(false); setPage(res.type === 'Customer' ? 'customers' : 'invoices'); }}>
                                        <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase'}}>{res.type}</div>
                                        <div style={{fontWeight: 500, color: 'var(--text-main)'}}>{res.text}</div>
                                        <div style={{fontSize: '13px', color: 'var(--text-muted)'}}>{res.sub}</div>
                                    </div>
                                )) : <div style={{padding: '16px', textAlign: 'center', color: 'var(--text-muted)', background: 'white'}}>No results found</div>}
                            </div>
                        )}
                    </div>
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
                                <div className="mega-link" style={{cursor: 'pointer'}} onClick={() => { setIsQuickAddOpen(false); onOpenCustomerModal(); }}><Icons.Plus className="mega-plus" /> Add Customer</div>
                                <div className="mega-link"><Icons.Plus className="mega-plus" /> Add Vendor</div>
                            </div>
                            <div className="mega-col">
                                <div className="mega-heading"><Icons.FileText /> INVOICES</div>
                                <div className="mega-link" style={{cursor: 'pointer'}} onClick={() => { setIsQuickAddOpen(false); onOpenInvoiceModal(); }}><Icons.Plus className="mega-plus" /> Create Invoice</div>
                                <div className="mega-link"><Icons.Plus className="mega-plus" /> Create Recurring Invoice</div>
                                <div className="mega-link"><Icons.Plus className="mega-plus" /> Record Customer Payment</div>
                            </div>
                            <div className="mega-col">
                                <div className="mega-heading"><Icons.Tag /> EXPENSES</div>
                                <div className="mega-link" style={{cursor: 'pointer'}} onClick={() => { setIsQuickAddOpen(false); onOpenExpenseModal(); }}><Icons.Plus className="mega-plus" /> Add Expense</div>
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
                                <div className="profile-link" onClick={() => { setIsProfileOpen(false); setPage('organizations'); }}>My Organizations</div>
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
                            <a href="#" className="manage-link" onClick={(e) => { e.preventDefault(); setIsOrgPanelOpen(false); setPage('organizations'); }}><Icons.Settings /> Manage</a>
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

function PendingInvoices({ invoices = [], onInvoiceClick }) {
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
                    {invoices.filter(i => i.status === 'Pending' || i.status === 'Overdue').slice(0, 5).map((inv) => (
                        <tr key={inv.id}>
                            <td style={{fontWeight: 500}}><a href="#" onClick={(e) => { e.preventDefault(); onInvoiceClick(inv); }} style={{color: 'var(--accent)', textDecoration: 'none'}}>{inv.id}</a></td>
                            <td>{inv.customer}</td>
                            <td>{inv.date}</td>
                            <td style={{fontWeight: 500}}>{inv.amount}</td>
                            <td><span className={`status-badge ${inv.statusClass}`}>{inv.status === 'Pending' ? '🟡 Pending' : inv.status === 'Overdue' ? '🔴 Overdue' : inv.status}</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function MainContent({ invoices, onOpenCustomerModal, onOpenInvoiceModal, onOpenExpenseModal, onInvoiceClick }) {
    const [dateFilter, setDateFilter] = useState('This Month');

    const handleCreateNew = (e) => {
        const val = e.target.value;
        if (val === 'customer') onOpenCustomerModal();
        if (val === 'invoice') onOpenInvoiceModal();
        if (val === 'expense') onOpenExpenseModal();
        e.target.value = '';
    };

    return (
        <main className="main-content">
            <div className="page-header">
                <div className="page-title">
                    <h1>Dashboard</h1>
                </div>
                <div className="page-actions">
                    <select className="date-filter" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
                        <option>Today</option>
                        <option>This Week</option>
                        <option>This Month</option>
                        <option>Last Month</option>
                        <option>This Year</option>
                        <option>Custom Range</option>
                    </select>
                    <select className="btn-primary" value="" onChange={handleCreateNew} style={{appearance: 'none', paddingRight: '32px', backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', backgroundSize: '12px auto', border: 'none', outline: 'none', cursor: 'pointer', fontFamily: 'Inter'}}>
                        <option value="" disabled>+ Create New</option>
                        <option value="customer">+ Add Customer</option>
                        <option value="invoice">+ Create Invoice</option>
                        <option value="expense">+ Add Expense</option>
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
                <PendingInvoices invoices={invoices} onInvoiceClick={onInvoiceClick} />
            </div>
        </main>
    );
}

function CustomersPage({ customers = [], onOpenCustomerModal }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('All Customers');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filteredCustomers = customers.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.company.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filter === 'All Customers' || 
            (filter === 'Active Customers' && c.receivables !== '₹0') || 
            (filter === 'Inactive Customers' && c.receivables === '₹0');
        return matchesSearch && matchesFilter;
    });

    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
    const paginatedCustomers = filteredCustomers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <main className="main-content">
            <div className="page-header">
                <div className="page-title">
                    <h1>All Customers</h1>
                </div>
                <div className="page-actions">
                    <button className="btn-primary" onClick={onOpenCustomerModal}>
                        <Icons.Plus /> New Customer
                    </button>
                </div>
            </div>

            <div className="utility-bar">
                <div className="search-bar-light">
                    <Icons.Search />
                    <input type="text" placeholder="Search Customers..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} />
                </div>
                <select className="date-filter" value={filter} onChange={(e) => { setFilter(e.target.value); setCurrentPage(1); }}>
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
                        {paginatedCustomers.length > 0 ? paginatedCustomers.map((c) => (
                            <tr key={c.id}>
                                <td><input type="checkbox" /></td>
                                <td style={{fontWeight: 500, color: 'var(--accent)', cursor: 'pointer'}}>{c.name}</td>
                                <td>{c.company}</td>
                                <td>{c.email}</td>
                                <td>{c.phone}</td>
                                <td style={{fontWeight: c.receivables !== '₹0' ? 600 : 400}}>{c.receivables}</td>
                            </tr>
                        )) : <tr><td colSpan="6" style={{textAlign: 'center', padding: '24px', color: 'var(--text-muted)'}}>No customers found matching your criteria.</td></tr>}
                    </tbody>
                </table>
                <div className="pagination">
                    <span className="pagination-info">Showing {filteredCustomers.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filteredCustomers.length)} of {filteredCustomers.length} Customers</span>
                    <div className="pagination-controls">
                        <button className="btn-page" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>&lt; Previous</button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button key={i} className={`btn-page ${currentPage === i + 1 ? 'active' : ''}`} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                        ))}
                        <button className="btn-page" disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(prev => prev + 1)}>Next &gt;</button>
                    </div>
                </div>
            </div>
        </main>
    );
}

function InvoicesPage({ invoices = [], onOpenInvoiceModal, onInvoiceClick }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('All Invoices');

    const filteredInvoices = invoices.filter(i => {
        const matchesSearch = i.id.toLowerCase().includes(searchQuery.toLowerCase()) || i.customer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filter === 'All Invoices' || i.status === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <main className="main-content">
            <div className="page-header">
                <div className="page-title">
                    <h1>All Invoices</h1>
                </div>
                <div className="page-actions">
                    <button className="btn-primary" onClick={onOpenInvoiceModal}>
                        <Icons.Plus /> New Invoice
                    </button>
                </div>
            </div>

            <div className="utility-bar">
                <div className="search-bar-light">
                    <Icons.Search />
                    <input type="text" placeholder="Search Invoices..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <select className="date-filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
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
                        {filteredInvoices.length > 0 ? filteredInvoices.map((inv) => (
                            <tr key={inv.id}>
                                <td><input type="checkbox" /></td>
                                <td>{inv.date}</td>
                                <td style={{fontWeight: 500, color: 'var(--accent)', cursor: 'pointer'}}><a href="#" onClick={(e) => { e.preventDefault(); onInvoiceClick(inv); }} style={{color: 'var(--accent)', textDecoration: 'none'}}>{inv.id}</a></td>
                                <td>{inv.customer}</td>
                                <td><span className={`status-badge ${inv.statusClass}`}>{inv.status}</span></td>
                                <td style={{fontWeight: 500}}>{inv.amount}</td>
                                <td style={{fontWeight: inv.balance !== '₹0' ? 600 : 400}}>{inv.balance}</td>
                            </tr>
                        )) : <tr><td colSpan="7" style={{textAlign: 'center', padding: '24px', color: 'var(--text-muted)'}}>No invoices found matching your criteria.</td></tr>}
                    </tbody>
                </table>
            </div>
        </main>
    );
}

function ExpensesPage({ expenses = [], onOpenExpenseModal, onExpenseClick }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('All Expenses');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filteredExpenses = expenses.filter(e => {
        const matchesSearch = e.ref.toLowerCase().includes(searchQuery.toLowerCase()) || e.vendor.toLowerCase().includes(searchQuery.toLowerCase()) || e.account.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filter === 'All Expenses' || e.status === filter;
        return matchesSearch && matchesFilter;
    });

    const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);
    const paginatedExpenses = filteredExpenses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <main className="main-content">
            <div className="page-header">
                <div className="page-title">
                    <h1>All Expenses</h1>
                </div>
                <div className="page-actions">
                    <button className="btn-primary" onClick={onOpenExpenseModal}>
                        <Icons.Plus /> New Expense
                    </button>
                </div>
            </div>

            <div className="utility-bar">
                <div className="search-bar-light">
                    <Icons.Search />
                    <input type="text" placeholder="Search Expenses..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} />
                </div>
                <select className="date-filter" value={filter} onChange={(e) => { setFilter(e.target.value); setCurrentPage(1); }}>
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
                        {paginatedExpenses.length > 0 ? paginatedExpenses.map((exp) => (
                            <tr key={exp.id}>
                                <td><input type="checkbox" /></td>
                                <td>{exp.date}</td>
                                <td>{exp.account}</td>
                                <td style={{fontWeight: 500}}><a href="#" onClick={(e) => { e.preventDefault(); onExpenseClick(exp); }} style={{color: 'var(--accent)', textDecoration: 'none'}}>{exp.ref}</a></td>
                                <td>{exp.vendor}</td>
                                <td><span className={`status-badge ${exp.statusClass}`}>{exp.status}</span></td>
                                <td style={{fontWeight: 600}}>{exp.amount}</td>
                            </tr>
                        )) : <tr><td colSpan="7" style={{textAlign: 'center', padding: '24px', color: 'var(--text-muted)'}}>No expenses found matching your criteria.</td></tr>}
                    </tbody>
                </table>
                <div className="pagination">
                    <span className="pagination-info">Showing {filteredExpenses.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filteredExpenses.length)} of {filteredExpenses.length} Expenses</span>
                    <div className="pagination-controls">
                        <button className="btn-page" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>&lt; Previous</button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button key={i} className={`btn-page ${currentPage === i + 1 ? 'active' : ''}`} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                        ))}
                        <button className="btn-page" disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(prev => prev + 1)}>Next &gt;</button>
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

function SettingsPage({ setPage }) {
    return (
        <main className="main-content" style={{ maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="page-title">
                    <h1>Settings</h1>
                </div>
                <button 
                    style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                    onClick={() => setPage('dashboard')}
                >
                    <Icons.Close />
                </button>
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
                    <h3>Module Settings</h3>
                    <div className="settings-grid">
                        <div className="settings-card">
                            <div className="settings-card-icon"><Icons.Customers /></div>
                            <div className="settings-card-content">
                                <h4>Customer Settings</h4>
                                <p>Manage customer preferences and defaults.</p>
                            </div>
                        </div>
                        <div className="settings-card">
                            <div className="settings-card-icon"><Icons.Invoices /></div>
                            <div className="settings-card-content">
                                <h4>Invoice Settings</h4>
                                <p>Configure invoice numbering, terms, and templates.</p>
                            </div>
                        </div>
                        <div className="settings-card">
                            <div className="settings-card-icon"><Icons.Expenses /></div>
                            <div className="settings-card-content">
                                <h4>Expense Settings</h4>
                                <p>Set up expense categories and rules.</p>
                            </div>
                        </div>
                        <div className="settings-card">
                            <div className="settings-card-icon"><Icons.Reports /></div>
                            <div className="settings-card-content">
                                <h4>Report Settings</h4>
                                <p>Customize reporting periods and formats.</p>
                            </div>
                        </div>
                        <div className="settings-card">
                            <div className="settings-card-icon"><Icons.Banking /></div>
                            <div className="settings-card-content">
                                <h4>Bank Settings</h4>
                                <p>Manage connected bank accounts and feeds.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function OrganizationsPage() {
    return (
        <main className="main-content">
            <div className="page-header">
                <div className="page-title">
                    <h1>Organizations</h1>
                </div>
                <div className="page-actions">
                    <button className="btn-primary">
                        <Icons.Plus /> New Organization
                    </button>
                </div>
            </div>
            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Organization Name</th>
                            <th>Organization ID</th>
                            <th>Edition</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                                    <div style={{width: '32px', height: '32px', background: 'var(--bg-hover)', border: '1px solid var(--border-color)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)'}}>
                                        <Icons.Building />
                                    </div>
                                    <span style={{fontWeight: 600, color: 'var(--text-main)'}}>thecruisersfamily</span>
                                </div>
                            </td>
                            <td>60085861078</td>
                            <td><span className="status-badge status-draft" style={{background: '#EEF2FF', color: 'var(--accent)'}}>Premium Trial</span></td>
                            <td>Admin</td>
                            <td><button className="btn-primary" style={{padding: '6px 16px', fontSize: '13px', background: 'white', color: 'var(--accent)', border: '1px solid var(--accent)'}}>Go to Org</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    );
}

function App() {
    const [activePage, setActivePage] = useState('dashboard');
    const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
    const [activeInvoice, setActiveInvoice] = useState(null);
    const [activeExpense, setActiveExpense] = useState(null);

    const [customers, setCustomers] = useState([
        { id: 'C-001', name: 'Tony Stark', company: 'Stark Industries', email: 'tony@stark.com', phone: '+1 555-0100', receivables: '₹4,500' },
        { id: 'C-002', name: 'Bruce Wayne', company: 'Wayne Enterprises', email: 'bruce@wayne.com', phone: '+1 555-0200', receivables: '₹850' },
        { id: 'C-003', name: 'Norman Osborn', company: 'Oscorp', email: 'norman@oscorp.com', phone: '+1 555-0300', receivables: '₹2,100' },
        { id: 'C-004', name: 'Peter Parker', company: 'Daily Bugle', email: 'peter@dailybugle.com', phone: '+1 555-0400', receivables: '₹0' },
        { id: 'C-005', name: 'Lex Luthor', company: 'LexCorp', email: 'lex@lexcorp.com', phone: '+1 555-0500', receivables: '₹12,400' },
    ]);

    const [invoices, setInvoices] = useState([
        { id: 'INV-0043', date: 'Sep 10, 2026', dueDate: 'Sep 24, 2026', customer: 'Stark Industries', status: 'Pending', statusClass: 'status-pending', amount: '₹4,500', balance: '₹4,500', items: [{ id: 1, item: 'Web Design', qty: 1, rate: 4500, tax: 0, amount: 4500 }], subtotal: 4500, discount: 0, tax: 0 },
        { id: 'INV-0044', date: 'Sep 05, 2026', dueDate: 'Sep 19, 2026', customer: 'Wayne Enterprises', status: 'Overdue', statusClass: 'status-overdue', amount: '₹850', balance: '₹850', items: [{ id: 1, item: 'Hosting', qty: 1, rate: 850, tax: 0, amount: 850 }], subtotal: 850, discount: 0, tax: 0 },
        { id: 'INV-0045', date: 'Sep 01, 2026', dueDate: 'Sep 15, 2026', customer: 'Acme Corp', status: 'Paid', statusClass: 'status-paid', amount: '₹1,200', balance: '₹0', items: [{ id: 1, item: 'Consulting', qty: 2, rate: 600, tax: 0, amount: 1200 }], subtotal: 1200, discount: 0, tax: 0 },
        { id: 'INV-0046', date: 'Aug 28, 2026', dueDate: 'Sep 11, 2026', customer: 'Oscorp', status: 'Sent', statusClass: 'status-sent', amount: '₹2,100', balance: '₹2,100', items: [{ id: 1, item: 'Software License', qty: 1, rate: 2100, tax: 0, amount: 2100 }], subtotal: 2100, discount: 0, tax: 0 },
        { id: 'INV-0047', date: 'Aug 25, 2026', dueDate: 'Sep 08, 2026', customer: 'Globex', status: 'Draft', statusClass: 'status-draft', amount: '₹3,200', balance: '₹3,200', items: [{ id: 1, item: 'Maintenance', qty: 1, rate: 3200, tax: 0, amount: 3200 }], subtotal: 3200, discount: 0, tax: 0 },
    ]);

    const [expenses, setExpenses] = useState([
        { id: 1, date: 'Sep 15, 2026', account: 'Office Supplies', ref: 'EXP-0012', vendor: 'Amazon', amount: '₹1,250.00', status: 'Non-Billable', statusClass: 'status-nonbillable', baseAmount: 1250, taxAmount: 0, taxRate: 0, notes: 'Printer ink and paper.' },
        { id: 2, date: 'Sep 12, 2026', account: 'Travel', ref: 'EXP-0013', vendor: 'Uber', amount: '₹850.00', status: 'Billable', statusClass: 'status-billable', baseAmount: 850, taxAmount: 0, taxRate: 0, notes: 'Ride to client meeting.' },
        { id: 3, date: 'Sep 10, 2026', account: 'Meals and Entertainment', ref: 'EXP-0014', vendor: 'Starbucks', amount: '₹320.00', status: 'Reimbursed', statusClass: 'status-reimbursed', baseAmount: 320, taxAmount: 0, taxRate: 0, notes: 'Coffee with prospective client.' },
        { id: 4, date: 'Sep 05, 2026', account: 'IT and Internet Expenses', ref: 'EXP-0015', vendor: 'AWS', amount: '₹4,500.00', status: 'Non-Billable', statusClass: 'status-nonbillable', baseAmount: 4500, taxAmount: 0, taxRate: 0, notes: 'Monthly server hosting.' },
        { id: 5, date: 'Sep 01, 2026', account: 'Advertising and Marketing', ref: 'EXP-0016', vendor: 'Google Ads', amount: '₹12,000.00', status: 'Billable', statusClass: 'status-billable', baseAmount: 12000, taxAmount: 0, taxRate: 0, notes: 'Q3 Search Campaign.' },
    ]);

    const [historyLogs, setHistoryLogs] = useState([
        { id: 1, icon: <Icons.Box />, title: 'Website Development', sub: 'ITEM VARIANT' },
        { id: 2, icon: <Icons.FileText />, title: 'INV-000001', sub: 'INVOICE' },
        { id: 3, icon: <Icons.UserSmall />, title: 'Mr. Demo Customer', sub: 'CONTACTS' },
    ]);

    const handleAddCustomer = (newCustomer) => {
        setCustomers(prev => [newCustomer, ...prev]);
        setHistoryLogs(prev => [{ id: Date.now(), icon: <Icons.UserSmall />, title: newCustomer.name, sub: 'NEW CUSTOMER' }, ...prev]);
    };

    const handleAddInvoice = (newInvoice) => {
        setInvoices(prev => [newInvoice, ...prev]);
        setHistoryLogs(prev => [{ id: Date.now(), icon: <Icons.FileText />, title: newInvoice.id, sub: 'NEW INVOICE' }, ...prev]);
    };

    const handleAddExpense = (newExpense) => {
        setExpenses(prev => [newExpense, ...prev]);
        setHistoryLogs(prev => [{ id: Date.now(), icon: <Icons.Tag />, title: newExpense.ref, sub: 'NEW EXPENSE' }, ...prev]);
    };

    if (activePage === 'settings') {
        return (
            <div style={{ width: '100vw', height: '100vh', overflowY: 'auto', backgroundColor: 'var(--bg-main)' }}>
                <SettingsPage setPage={setActivePage} />
            </div>
        );
    }

    return (
        <div className="app-container">
            <Topbar 
                setPage={setActivePage} 
                customers={customers} 
                invoices={invoices} 
                historyLogs={historyLogs} 
                onOpenCustomerModal={() => setIsCustomerModalOpen(true)}
                onOpenInvoiceModal={() => setIsInvoiceModalOpen(true)}
                onOpenExpenseModal={() => setIsExpenseModalOpen(true)}
            />
            <div className="main-wrapper">
                <Sidebar activePage={activePage} setPage={setActivePage} />
                {activePage === 'dashboard' && <MainContent invoices={invoices} onOpenCustomerModal={() => setIsCustomerModalOpen(true)} onOpenInvoiceModal={() => setIsInvoiceModalOpen(true)} onOpenExpenseModal={() => setIsExpenseModalOpen(true)} onInvoiceClick={setActiveInvoice} />}
                {activePage === 'customers' && <CustomersPage customers={customers} onOpenCustomerModal={() => setIsCustomerModalOpen(true)} />}
                {activePage === 'invoices' && <InvoicesPage invoices={invoices} onOpenInvoiceModal={() => setIsInvoiceModalOpen(true)} onInvoiceClick={setActiveInvoice} />}
                {activePage === 'expenses' && <ExpensesPage expenses={expenses} onOpenExpenseModal={() => setIsExpenseModalOpen(true)} onExpenseClick={setActiveExpense} />}
                {activePage === 'reports' && <ReportsPage />}
                {activePage === 'banking' && <BankingPage />}
                {activePage === 'organizations' && <OrganizationsPage />}
            </div>
            <CustomerModal isOpen={isCustomerModalOpen} onClose={() => setIsCustomerModalOpen(false)} onAddCustomer={handleAddCustomer} />
            <InvoiceModal isOpen={isInvoiceModalOpen} onClose={() => setIsInvoiceModalOpen(false)} onAddInvoice={handleAddInvoice} customers={customers} />
            <ExpenseModal isOpen={isExpenseModalOpen} onClose={() => setIsExpenseModalOpen(false)} onAddExpense={handleAddExpense} />
            <InvoiceDetailModal invoice={activeInvoice} onClose={() => setActiveInvoice(null)} />
            <ExpenseDetailModal expense={activeExpense} onClose={() => setActiveExpense(null)} />
        </div>
    );
}

export default App;
