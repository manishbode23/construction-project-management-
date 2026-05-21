import { useEffect, useState } from 'react';
import { fetchReports } from '../api.js';

const demoReports = [
  { id: 1, type: 'Weekly Progress Summary', generated_at: new Date().toISOString() },
  { id: 2, type: 'Client Cost Snapshot', generated_at: new Date(Date.now() - 86400000).toISOString() },
];

export default function ReportsPage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports().then((res) => setReports(res.data)).catch(() => setReports(demoReports));
  }, []);

  return (
    <div>
      <header className="page-header">
        <div>
          <h1>Reports</h1>
          <p>Package site updates into tidy client-ready summaries.</p>
        </div>
      </header>
      <div className="list-card">
        {reports.map((report) => (
          <div key={report.id} className="report-card">
            <strong>{report.type}</strong>
            <p>Generated {new Date(report.generated_at).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
