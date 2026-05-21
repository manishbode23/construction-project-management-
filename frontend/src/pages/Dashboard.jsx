import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import KPISection from '../components/KPISection.jsx';
import ChartCard from '../components/ChartCard.jsx';
import { fetchProjects, formatRupees } from '../api.js';

const demoProjects = [
  {
    id: 1,
    name: 'Riverside Residences',
    status: 'active',
    location: 'Pune',
    progress: 72,
    budget: 4200000,
    due: '12 Jun',
    risk: 'On track',
  },
  {
    id: 2,
    name: 'Metro Office Fitout',
    status: 'planning',
    location: 'Mumbai',
    progress: 38,
    budget: 1850000,
    due: '28 Jun',
    risk: 'Materials watch',
  },
  {
    id: 3,
    name: 'North Gate Villas',
    status: 'active',
    location: 'Nashik',
    progress: 56,
    budget: 3150000,
    due: '05 Jul',
    risk: 'Client review',
  },
];

const budgetData = [
  { name: 'Planned', value: 950000 },
  { name: 'Committed', value: 840000 },
  { name: 'Actual', value: 780000 },
];

const paymentData = [
  { month: 'Jan', value: 120000 },
  { month: 'Feb', value: 145000 },
  { month: 'Mar', value: 160000 },
  { month: 'Apr', value: 138000 },
  { month: 'May', value: 172000 },
];

const workMixData = [
  { name: 'Structure', value: 42, color: '#b85c38' },
  { name: 'MEP', value: 24, color: '#e8a63a' },
  { name: 'Finishing', value: 21, color: '#725f52' },
  { name: 'Procurement', value: 13, color: '#34302d' },
];

const siteUpdates = [
  { label: 'Concrete cube test cleared', detail: 'Riverside block A', tone: 'good' },
  { label: 'Steel delivery pending', detail: 'Metro Office level 3', tone: 'watch' },
  { label: 'Client walkthrough scheduled', detail: 'North Gate sample villa', tone: 'info' },
];

const upcomingMilestones = [
  { date: '22 May', title: 'Foundation QA signoff', project: 'Riverside Residences' },
  { date: '24 May', title: 'HVAC vendor confirmation', project: 'Metro Office Fitout' },
  { date: '27 May', title: 'Facade mockup review', project: 'North Gate Villas' },
];

const currencyTick = (value) => `₹${Math.round(value / 1000)}K`;

export default function DashboardPage() {
  const [projects, setProjects] = useState(demoProjects);

  useEffect(() => {
    fetchProjects()
      .then((res) => setProjects(res.data?.length ? res.data : demoProjects))
      .catch(() => setProjects(demoProjects));
  }, []);

  const activeProjects = projects.filter((project) => project.status === 'active').length || projects.length;
  const totalBudget = projects.reduce((sum, project) => sum + Number(project.budget || project.approved_budget || 0), 0);

  const kpis = [
    { title: 'Active Projects', value: activeProjects, description: `${projects.length} total sites monitored` },
    { title: 'Portfolio Budget', value: formatRupees(totalBudget || 9200000), description: 'Approved project value' },
    { title: 'Pending Payments', value: formatRupees(74500), description: 'Due in the next 7 days' },
    { title: 'Site Updates', value: 18, description: 'Photos, tasks, and reports today' },
  ];

  return (
    <div>
      <section className="dashboard-hero">
        <div>
          <span className="eyebrow">Live construction command center</span>
          <h1>Portfolio Dashboard</h1>
          <p>Track progress, spend, procurement, and site signals across every active project.</p>
        </div>
        <div className="hero-scorecard">
          <span>Overall Progress</span>
          <strong>63%</strong>
          <div className="progress-bar" aria-label="Overall progress">
            <span style={{ width: '63%' }} />
          </div>
        </div>
      </section>

      <KPISection items={kpis} />

      <section className="dashboard-layout">
        <ChartCard title="Budget Health">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={budgetData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(114, 95, 82, 0.18)" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={currencyTick} />
              <Tooltip formatter={(value) => formatRupees(value)} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#b85c38" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Payment Trend">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={paymentData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(114, 95, 82, 0.18)" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={currencyTick} />
              <Tooltip formatter={(value) => formatRupees(value)} />
              <Line type="monotone" dataKey="value" stroke="#e8a63a" strokeWidth={4} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <section className="dashboard-layout lower">
        <div className="dashboard-panel wide">
          <div className="panel-heading">
            <h2>Active Project Snapshot</h2>
            <span>{projects.length} sites</span>
          </div>
          <div className="project-snapshot-grid">
            {projects.map((project) => (
              <article className="project-snapshot" key={project.id}>
                <div>
                  <h3>{project.name}</h3>
                  <p>{project.location || 'Site location'} - Due {project.due || 'TBD'}</p>
                </div>
                <strong>{project.progress || 45}%</strong>
                <div className="progress-bar">
                  <span style={{ width: `${project.progress || 45}%` }} />
                </div>
                <div className="project-footer">
                  <span>{project.risk || project.status}</span>
                  <span>{formatRupees(project.budget || project.approved_budget || 0)}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="panel-heading">
            <h2>Work Mix</h2>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={workMixData} dataKey="value" innerRadius={52} outerRadius={82} paddingAngle={3}>
                {workMixData.map((item) => (
                  <Cell key={item.name} fill={item.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="workmix-list">
            {workMixData.map((item) => (
              <span key={item.name}>
                <i style={{ background: item.color }} />
                {item.name} {item.value}%
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="dashboard-layout lower">
        <div className="dashboard-panel">
          <div className="panel-heading">
            <h2>Site Signals</h2>
          </div>
          <div className="signal-list">
            {siteUpdates.map((update) => (
              <div className={`signal-item ${update.tone}`} key={update.label}>
                <strong>{update.label}</strong>
                <span>{update.detail}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-panel wide">
          <div className="panel-heading">
            <h2>Upcoming Milestones</h2>
            <span>This week</span>
          </div>
          <div className="milestone-list">
            {upcomingMilestones.map((milestone) => (
              <div className="milestone-item" key={milestone.title}>
                <time>{milestone.date}</time>
                <div>
                  <strong>{milestone.title}</strong>
                  <span>{milestone.project}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
