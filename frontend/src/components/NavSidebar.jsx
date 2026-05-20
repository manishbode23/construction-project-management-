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

export default function NavSidebar() {
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
    </aside>
  );
}
