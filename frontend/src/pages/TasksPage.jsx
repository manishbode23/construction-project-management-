import { useEffect, useState } from 'react';
import { fetchTasks } from '../api.js';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks().then((res) => setTasks(res.data)).catch(console.error);
  }, []);

  return (
    <div>
      <header className="page-header"><h1>Task Board</h1></header>
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
