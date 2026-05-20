import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import LoginPage from './pages/Login.jsx';
import DashboardPage from './pages/Dashboard.jsx';
import ProjectDetailPage from './pages/ProjectDetail.jsx';
import GanttPage from './pages/GanttPage.jsx';
import ProcurementPage from './pages/ProcurementPage.jsx';
import TasksPage from './pages/TasksPage.jsx';
import PhotosPage from './pages/PhotosPage.jsx';
import FinancePage from './pages/FinancePage.jsx';
import ReportsPage from './pages/ReportsPage.jsx';
import { getStoredAuth } from './api.js';

function App() {
  const isAuthenticated = Boolean(getStoredAuth()?.token);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/*"
        element={isAuthenticated ? <Layout /> : <Navigate to="/login" replace />}
      >
        <Route index element={<DashboardPage />} />
        <Route path="projects/:projectId" element={<ProjectDetailPage />} />
        <Route path="gantt" element={<GanttPage />} />
        <Route path="procurement" element={<ProcurementPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="photos" element={<PhotosPage />} />
        <Route path="finance" element={<FinancePage />} />
        <Route path="reports" element={<ReportsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
