const phases = [
  {
    id: 1,
    name: 'Site mobilization',
    project: 'Riverside Residences',
    start: '18 May',
    end: '24 May',
    progress: 90,
    offset: 0,
    span: 18,
    status: 'On track',
  },
  {
    id: 2,
    name: 'Foundation and slab',
    project: 'Riverside Residences',
    start: '22 May',
    end: '08 Jun',
    progress: 64,
    offset: 13,
    span: 34,
    status: 'Inspection due',
  },
  {
    id: 3,
    name: 'Structural frame',
    project: 'Metro Office Fitout',
    start: '27 May',
    end: '18 Jun',
    progress: 38,
    offset: 28,
    span: 42,
    status: 'Materials watch',
  },
  {
    id: 4,
    name: 'MEP rough-in',
    project: 'Metro Office Fitout',
    start: '12 Jun',
    end: '28 Jun',
    progress: 18,
    offset: 55,
    span: 30,
    status: 'Dependency',
  },
  {
    id: 5,
    name: 'Facade and finishing',
    project: 'North Gate Villas',
    start: '20 Jun',
    end: '10 Jul',
    progress: 12,
    offset: 70,
    span: 26,
    status: 'Upcoming',
  },
];

const milestones = [
  { date: '24 May', title: 'Mobilization signoff', owner: 'Site Engineer' },
  { date: '31 May', title: 'Foundation QA review', owner: 'Project Manager' },
  { date: '12 Jun', title: 'MEP handoff approval', owner: 'MEP Lead' },
  { date: '28 Jun', title: 'Client walkthrough', owner: 'Client Team' },
];

const dependencies = [
  'Foundation inspection must close before structural frame release.',
  'HVAC vendor approval blocks MEP rough-in for Metro Office.',
  'Facade mockup approval required before bulk finishing work.',
];

export default function GanttPage() {
  return (
    <div>
      <header className="page-header">
        <div>
          <h1>Gantt Timeline</h1>
          <p>Plan milestones, dependencies, and handoffs across each project phase.</p>
        </div>
      </header>

      <section className="timeline-summary">
        <div>
          <span className="kpi-label">Schedule Health</span>
          <strong>82%</strong>
          <p>Most workstreams are moving as planned.</p>
        </div>
        <div>
          <span className="kpi-label">Critical Tasks</span>
          <strong>5</strong>
          <p>Items need attention this week.</p>
        </div>
        <div>
          <span className="kpi-label">Next Handoff</span>
          <strong>24 May</strong>
          <p>Mobilization signoff for Riverside.</p>
        </div>
      </section>

      <section className="gantt-board">
        <div className="gantt-header">
          <span>Phase</span>
          <span>May 18</span>
          <span>May 25</span>
          <span>Jun 01</span>
          <span>Jun 08</span>
          <span>Jun 15</span>
          <span>Jun 22</span>
          <span>Jun 29</span>
        </div>

        {phases.map((phase) => (
          <article className="gantt-row" key={phase.id}>
            <div className="phase-info">
              <strong>{phase.name}</strong>
              <span>{phase.project}</span>
            </div>
            <div className="phase-track">
              <div
                className="phase-bar"
                style={{ marginLeft: `${phase.offset}%`, width: `${phase.span}%` }}
              >
                <span style={{ width: `${phase.progress}%` }} />
              </div>
            </div>
            <div className="phase-meta">
              <span>{phase.start} - {phase.end}</span>
              <strong>{phase.status}</strong>
            </div>
          </article>
        ))}
      </section>

      <section className="timeline-details">
        <div className="dashboard-panel">
          <div className="panel-heading">
            <h2>Upcoming Milestones</h2>
            <span>Next 30 days</span>
          </div>
          <div className="milestone-list">
            {milestones.map((milestone) => (
              <div className="milestone-item" key={milestone.title}>
                <time>{milestone.date}</time>
                <div>
                  <strong>{milestone.title}</strong>
                  <span>{milestone.owner}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="panel-heading">
            <h2>Dependencies</h2>
            <span>Watchlist</span>
          </div>
          <div className="dependency-list">
            {dependencies.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
