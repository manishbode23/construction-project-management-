import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/gantt', label: 'Gantt' },
  { to: '/procurement', label: 'Procurement' },
  { to: '/tasks', label: 'Tasks' },
  { to: '/photos', label: 'Photos' },
  { to: '/finance', label: 'Finance' },
  { to: '/reports', label: 'Reports' },
];

export default function NavSidebar({ auth, onLogout }) {
  const user = auth?.user;

  return (
    <aside className="sidebar">
      <div className="brand">Construction Portal</div>
      <nav>
        {links.map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'active' : '')}>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="login-status-card">
        <div className="login-symbol" aria-hidden="true">
          {(user?.name || user?.email || 'A').charAt(0).toUpperCase()}
        </div>
        <div>
          <span>Signed in</span>
          <strong>{user?.name || 'Admin User'}</strong>
          <small>{user?.email || 'admin@example.com'}</small>
        </div>
        <button type="button" onClick={onLogout}>Logout</button>
      </div>
    </aside>
  );
}
