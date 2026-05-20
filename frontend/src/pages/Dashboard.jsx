import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import KPISection from '../components/KPISection.jsx';
import ChartCard from '../components/ChartCard.jsx';
import { fetchProjects, fetchBudget, fetchPayments } from '../api.js';

export default function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [budgetData, setBudgetData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);

  useEffect(() => {
    fetchProjects().then((res) => setProjects(res.data)).catch(console.error);
    setBudgetData([
      { name: 'Planned', value: 950000 },
      { name: 'Actual', value: 780000 },
    ]);
    setPaymentData([
      { month: 'Jan', value: 120000 },
      { month: 'Feb', value: 145000 },
      { month: 'Mar', value: 160000 },
    ]);
  }, []);

  const kpis = [
    { title: 'Active Projects', value: projects.length, description: 'Live portfolio' },
    { title: 'Budget Variance', value: '$170K', description: 'Budget vs actual' },
    { title: 'Pending Payments', value: 24, description: 'Subcontractor invoices' },
    { title: 'Recent Updates', value: 8, description: 'Progress photos uploaded' },
  ];

  return (
    <div>
      <header className="page-header"><h1>Portfolio Dashboard</h1></header>
      <KPISection items={kpis} />
      <div className="grid-columns">
        <ChartCard title="Budget vs Actual">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={budgetData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Subcontractor Payment Trend">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={paymentData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
