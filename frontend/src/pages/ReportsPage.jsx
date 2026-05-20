import { useEffect, useState } from 'react';
import { fetchReports } from '../api.js';

export default function ReportsPage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports().then((res) => setReports(res.data)).catch(console.error);
  }, []);

  return (
    <div>
      <header className="page-header"><h1>Reports</h1></header>
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
