const progressPhotos = [
  {
    id: 1,
    title: 'Concrete pour inspection',
    project: 'Riverside Residences',
    date: '21 May 2026',
    status: 'Foundation',
    caption: 'Ground crew completing the slab pour and surface leveling for block A.',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    title: 'Structural frame progress',
    project: 'Metro Office Fitout',
    date: '20 May 2026',
    status: 'Structure',
    caption: 'Steel and formwork progress captured before the evening quality check.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    title: 'Exterior works update',
    project: 'North Gate Villas',
    date: '19 May 2026',
    status: 'Finishing',
    caption: 'Facade preparation and scaffolding review before material delivery.',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=900&q=80',
  },
];

export default function PhotosPage() {
  return (
    <div>
      <header className="page-header">
        <div>
          <h1>Daily Progress Photos</h1>
          <p>Collect visual proof of progress by project, task, and date.</p>
        </div>
      </header>
      <section className="photo-grid">
        {progressPhotos.map((photo) => (
          <article className="photo-card" key={photo.id}>
            <img src={photo.image} alt={photo.title} />
            <div className="photo-card-content">
              <div className="photo-meta">
                <span>{photo.status}</span>
                <span>{photo.date}</span>
              </div>
              <h2>{photo.title}</h2>
              <strong>{photo.project}</strong>
              <p>{photo.caption}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
