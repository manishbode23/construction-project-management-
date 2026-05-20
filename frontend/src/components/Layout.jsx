import { Outlet } from 'react-router-dom';
import NavSidebar from './NavSidebar.jsx';

export default function Layout() {
  return (
    <div className="app-shell">
      <NavSidebar />
      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
}
