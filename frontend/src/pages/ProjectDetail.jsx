import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProject } from '../api.js';

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (projectId) {
      fetchProject(projectId).then((res) => setProject(res.data)).catch(console.error);
    }
  }, [projectId]);

  if (!project) {
    return <div>Loading project details...</div>;
  }

  return (
    <div>
      <header className="page-header"><h1>{project.name}</h1></header>
      <section className="detail-grid">
        <div className="detail-card">
          <h2>Project Summary</h2>
          <p><strong>Client:</strong> {project.client_name}</p>
          <p><strong>Location:</strong> {project.location}</p>
          <p><strong>Status:</strong> {project.status}</p>
          <p><strong>Budget:</strong> ${project.approved_budget}</p>
        </div>
        <div className="detail-card">
          <h2>Timeline</h2>
          <p><strong>Start:</strong> {project.start_date}</p>
          <p><strong>End:</strong> {project.end_date}</p>
        </div>
      </section>
    </div>
  );
}
