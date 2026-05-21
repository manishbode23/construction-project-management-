import { useEffect, useState } from 'react';
import { fetchTasks } from '../api.js';

const demoTasks = [
  { id: 1, title: 'Foundation inspection', status: 'In review', priority: 'High', notes: 'Checklist submitted for approval.' },
  { id: 2, title: 'Electrical rough-in', status: 'In progress', priority: 'Medium', notes: 'Crew assigned for block B.' },
  { id: 3, title: 'Client walkthrough prep', status: 'Open', priority: 'Low', notes: 'Collect latest photos and report notes.' },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks().then((res) => setTasks(res.data)).catch(() => setTasks(demoTasks));
  }, []);

  return (
    <div>
      <header className="page-header">
        <div>
          <h1>Task Board</h1>
          <p>Keep the next site actions visible and easy to scan.</p>
        </div>
      </header>
      <div className="list-card">
        {tasks.map((task) => (
          <div key={task.id} className="task-card">
            <h3>{task.title}</h3>
            <p>{task.status} - {task.priority}</p>
            <p>{task.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
