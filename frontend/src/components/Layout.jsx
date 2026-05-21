import { Outlet } from 'react-router-dom';
import NavSidebar from './NavSidebar.jsx';

export default function Layout({ auth, onLogout }) {
  return (
    <div className="app-shell">
      <NavSidebar auth={auth} onLogout={onLogout} />
      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
}
