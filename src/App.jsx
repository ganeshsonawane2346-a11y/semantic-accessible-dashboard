import React, { useEffect, useRef, useState } from 'react'
import {
  LayoutDashboard, ChartNoAxesCombined, FileText, Settings, Search,
  Bell, Menu, X, ArrowUpRight, Users, IndianRupee, Activity,
  Download, Plus, CheckCircle2, CircleHelp
} from 'lucide-react'

const pageItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'analytics', label: 'Analytics', icon: ChartNoAxesCombined },
  { id: 'reports', label: 'Reports', icon: FileText },
]

const records = [
  { name: 'Aarav Sharma', email: 'aarav.sharma@example.gov.in', department: 'Public Services', status: 'Active', date: '15 Nov 2026' },
  { name: 'Meera Patel', email: 'meera.patel@example.gov.in', department: 'Healthcare', status: 'Active', date: '14 Nov 2026' },
  { name: 'Kabir Singh', email: 'kabir.singh@example.gov.in', department: 'Transport', status: 'Pending', date: '13 Nov 2026' },
  { name: 'Ananya Rao', email: 'ananya.rao@example.gov.in', department: 'Education', status: 'Active', date: '12 Nov 2026' },
]

function getPage() {
  const path = window.location.pathname.replace('/', '')
  return pageItems.some(p => p.id === path) ? path : 'dashboard'
}

function App() {
  const [page, setPage] = useState(getPage)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [notice, setNotice] = useState('')
  const [form, setForm] = useState({ name: '', email: '', department: 'Public Services' })
  const dialogRef = useRef(null)
  const firstFieldRef = useRef(null)

  useEffect(() => {
    const onPop = () => setPage(getPage())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    if (dialogOpen) {
      dialogRef.current?.showModal()
      firstFieldRef.current?.focus()
    } else if (dialogRef.current?.open) {
      dialogRef.current.close()
    }
  }, [dialogOpen])

  function navigate(event, id) {
    event.preventDefault()
    window.history.pushState({}, '', id === 'dashboard' ? '/' : `/${id}`)
    setPage(id)
    setMobileOpen(false)
    setNotice(`${pageItems.find(item => item.id === id)?.label} page loaded.`)
    document.getElementById('main-content')?.focus()
  }

  const filtered = records.filter(record =>
    `${record.name} ${record.email} ${record.department} ${record.status}`.toLowerCase().includes(query.toLowerCase())
  )

  function submitForm(event) {
    event.preventDefault()
    setNotice(`User ${form.name} was added successfully in this demo.`)
    setDialogOpen(false)
    setForm({ name: '', email: '', department: 'Public Services' })
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>

      <header className="topbar">
        <div className="brand-wrap">
          <button className="icon-button mobile-menu" type="button" aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileOpen} aria-controls="sidebar" onClick={() => setMobileOpen(v => !v)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <a className="brand" href="/" onClick={e => navigate(e, 'dashboard')} aria-label="GovAccess home">
            <span className="brand-mark">G</span>
            <span>GovAccess<span className="brand-dot">.</span></span>
          </a>
        </div>
        <div className="topbar-actions">
          <label className="global-search">
            <Search size={17} aria-hidden="true" />
            <span className="sr-only">Search records</span>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search records..." />
            <kbd>/</kbd>
          </label>
          <button className="icon-button notification-button" type="button" aria-label="Notifications, 2 unread">
            <Bell size={19} /><span className="notification-dot" aria-hidden="true" />
          </button>
          <button className="profile-button" type="button" aria-label="Signed in as Admin User">
            <span className="avatar" aria-hidden="true">AU</span>
            <span className="profile-name">Admin User</span>
          </button>
        </div>
      </header>

      <div className="layout">
        <aside id="sidebar" className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`} aria-label="Sidebar">
          <div className="sidebar-label">WORKSPACE</div>
          <nav aria-label="Primary navigation">
            <ul className="nav-list">
              {pageItems.map(({ id, label, icon: Icon }) => (
                <li key={id}>
                  <a href={id === 'dashboard' ? '/' : `/${id}`} className={`nav-link ${page === id ? 'active' : ''}`} aria-current={page === id ? 'page' : undefined} onClick={e => navigate(e, id)}>
                    <Icon size={18} aria-hidden="true" /><span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="sidebar-bottom">
            <a className="nav-link" href="#settings" onClick={e => { e.preventDefault(); setNotice('Settings are not connected in this demo.') }}><Settings size={18} aria-hidden="true" /><span>Settings</span></a>
            <div className="help-card">
              <span className="help-icon"><CircleHelp size={17} /></span>
              <strong>Need help?</strong>
              <p>Visit the help centre for guidance.</p>
              <a href="#help" onClick={e => { e.preventDefault(); setNotice('Help centre is not connected in this demo.') }}>Open help centre <ArrowUpRight size={13} /></a>
            </div>
            <p className="sidebar-version">GOVACCESS PORTAL · v1.0</p>
          </div>
        </aside>

        <main id="main-content" className="main-content" tabIndex="-1">
          <div className="page-heading">
            <div>
              <div className="eyebrow">OVERVIEW / {page.toUpperCase()}</div>
              <h1>{page === 'dashboard' ? 'Dashboard' : page === 'analytics' ? 'Analytics' : 'Reports'}</h1>
              <p className="page-subtitle">{page === 'dashboard' ? 'Welcome back. Here is what is happening today.' : page === 'analytics' ? 'Monitor performance and service activity.' : 'Review and manage your latest reports.'}</p>
            </div>
            <div className="heading-actions">
              <button className="button button-secondary" type="button" onClick={() => setNotice('Report export is a demo action.')}>
                <Download size={16} /> Export
              </button>
              <button className="button button-primary" type="button" onClick={() => setDialogOpen(true)}>
                <Plus size={17} /> Add user
              </button>
            </div>
          </div>

          <div className="sr-only" role="status" aria-live="polite">{notice}</div>

          <section className="stats-grid" aria-label="Key performance indicators">
            <article className="stat-card">
              <div className="stat-top"><span className="stat-icon blue"><Users size={19} /></span><span className="trend positive">+12.8%</span></div>
              <p className="stat-label">Total registered users</p><p className="stat-value">12,480</p><p className="stat-foot">Compared with last month</p>
            </article>
            <article className="stat-card">
              <div className="stat-top"><span className="stat-icon violet"><Activity size={19} /></span><span className="trend positive">+8.2%</span></div>
              <p className="stat-label">Active services</p><p className="stat-value">86.4%</p><p className="stat-foot">Across all departments</p>
            </article>
            <article className="stat-card">
              <div className="stat-top"><span className="stat-icon amber"><FileText size={19} /></span><span className="trend positive">+4.6%</span></div>
              <p className="stat-label">Requests processed</p><p className="stat-value">8,294</p><p className="stat-foot">This month to date</p>
            </article>
            <article className="stat-card">
              <div className="stat-top"><span className="stat-icon green"><IndianRupee size={19} /></span><span className="trend neutral">On track</span></div>
              <p className="stat-label">Budget utilisation</p><p className="stat-value">64.8%</p><p className="stat-foot">Within planned allocation</p>
            </article>
          </section>

          <section className="content-grid" aria-label="Dashboard details">
            <article className="panel activity-panel">
              <div className="panel-heading">
                <div><h2>Service activity</h2><p>Monthly request volume</p></div>
                <label className="select-label">Period
                  <select aria-label="Select activity period" defaultValue="6">
                    <option value="6">Last 6 months</option><option value="3">Last 3 months</option><option value="12">Last 12 months</option>
                  </select>
                </label>
              </div>
              <div className="chart" role="img" aria-label="Bar chart showing service activity increasing from June to November">
                {[
                  ['Jun', 42], ['Jul', 58], ['Aug', 48], ['Sep', 73], ['Oct', 63], ['Nov', 88]
                ].map(([month, value]) => <div className="bar-column" key={month}><span className="bar-value">{value}%</span><div className="bar-track"><div className="bar" style={{ height: `${value}%` }} /></div><span className="bar-label">{month}</span></div>)}
              </div>
              <div className="chart-legend"><span className="legend-dot" /> Requests completed <span className="legend-note">Illustrative demo data</span></div>
            </article>
            <article className="panel department-panel">
              <div className="panel-heading"><div><h2>Department status</h2><p>Service availability</p></div><button className="text-button" type="button" onClick={() => setPage('analytics')}>View all <ArrowUpRight size={14} /></button></div>
              {[
                ['Public Services', '92%', 92], ['Healthcare', '84%', 84], ['Education', '76%', 76], ['Transport', '68%', 68]
              ].map(([name, value, width]) => <div className="department-row" key={name}><div className="department-meta"><span>{name}</span><strong>{value}</strong></div><div className="progress-track" role="progressbar" aria-label={`${name} availability`} aria-valuenow={width} aria-valuemin="0" aria-valuemax="100"><span style={{ width: `${width}%` }} /></div></div>)}
            </article>
          </section>

          <section className="panel table-panel" aria-labelledby="records-heading">
            <div className="panel-heading table-heading">
              <div><h2 id="records-heading">Recent user records</h2><p>Manage registered users and their access status</p></div>
              <span className="record-count">{filtered.length} records</span>
            </div>
            <div className="table-wrap">
              <table>
                <caption className="sr-only">Recent user records including name, email, department, status, and registration date</caption>
                <thead><tr><th scope="col">USER</th><th scope="col">DEPARTMENT</th><th scope="col">STATUS</th><th scope="col">JOINED</th><th scope="col"><span className="sr-only">Actions</span></th></tr></thead>
                <tbody>
                  {filtered.map(record => <tr key={record.email}>
                    <td><div className="user-cell"><span className="table-avatar" aria-hidden="true">{record.name.split(' ').map(n => n[0]).join('')}</span><span><strong>{record.name}</strong><small>{record.email}</small></span></div></td>
                    <td>{record.department}</td><td><span className={`status-pill ${record.status.toLowerCase()}`}><span aria-hidden="true" />{record.status}</span></td><td>{record.date}</td>
                    <td><button className="more-button" type="button" aria-label={`More actions for ${record.name}`} onClick={() => setNotice(`More actions for ${record.name} are not connected in this demo.`)}>•••</button></td>
                  </tr>)}
                  {filtered.length === 0 && <tr><td colSpan="5" className="empty-state">No records match “{query}”.</td></tr>}
                </tbody>
              </table>
            </div>
            <div className="table-footer"><span>Showing {filtered.length} of 4 entries</span><div className="pagination"><button type="button" disabled aria-label="Previous page">Previous</button><button type="button" className="current-page" aria-current="page" aria-label="Page 1">1</button><button type="button" disabled aria-label="Next page">Next</button></div></div>
          </section>

          <footer className="page-footer"><span>© 2026 GovAccess. All rights reserved.</span><span><a href="#privacy" onClick={e => e.preventDefault()}>Privacy</a><a href="#accessibility" onClick={e => e.preventDefault()}>Accessibility</a><a href="#support" onClick={e => e.preventDefault()}>Support</a></span></footer>
        </main>
      </div>

      <dialog ref={dialogRef} className="modal" aria-labelledby="modal-title" onCancel={e => { e.preventDefault(); setDialogOpen(false) }} onClose={() => setDialogOpen(false)}>
        <div className="modal-header"><div><span className="eyebrow">USER MANAGEMENT</span><h2 id="modal-title">Add new user</h2><p>Enter the details below to create a user record.</p></div><button className="icon-button" type="button" aria-label="Close dialog" onClick={() => setDialogOpen(false)}><X size={19} /></button></div>
        <form className="user-form" onSubmit={submitForm}>
          <fieldset>
            <legend>User details</legend>
            <div className="form-field"><label htmlFor="full-name">Full name <span aria-hidden="true">*</span></label><input ref={firstFieldRef} id="full-name" name="name" type="text" autoComplete="name" required minLength="2" maxLength="80" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Enter full name" /></div>
            <div className="form-field"><label htmlFor="user-email">Email address <span aria-hidden="true">*</span></label><input id="user-email" name="email" type="email" autoComplete="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="name@example.gov.in" /></div>
            <div className="form-field"><label htmlFor="department">Department</label><select id="department" name="department" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })}><option>Public Services</option><option>Healthcare</option><option>Education</option><option>Transport</option></select></div>
          </fieldset>
          <p className="form-hint">Fields marked with an asterisk are required.</p>
          <div className="modal-actions"><button className="button button-secondary" type="button" onClick={() => setDialogOpen(false)}>Cancel</button><button className="button button-primary" type="submit"><CheckCircle2 size={16} /> Create user</button></div>
        </form>
      </dialog>
    </div>
  )
}

export default App
