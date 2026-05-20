export default function KPISection({ items }) {
  return (
    <section className="kpi-grid">
      {items.map((item) => (
        <div className="kpi-card" key={item.title}>
          <span className="kpi-label">{item.title}</span>
          <strong>{item.value}</strong>
          <p>{item.description}</p>
        </div>
      ))}
    </section>
  );
}
