import { query } from '../db/index.js';

export const findTasks = async (projectId) => {
  if (projectId) {
    const result = await query('SELECT * FROM project_tasks WHERE project_id = $1 ORDER BY due_date NULLS LAST', [projectId]);
    return result.rows;
  }
  const result = await query('SELECT * FROM project_tasks ORDER BY due_date NULLS LAST');
  return result.rows;
};

export const findTaskById = async (id) => {
  const result = await query('SELECT * FROM project_tasks WHERE id = $1', [id]);
  return result.rows[0];
};

export const createTaskRecord = async (data) => {
  const result = await query(
    `INSERT INTO project_tasks (project_id, assigned_to, title, description, start_date, due_date, priority, status, percent_complete, notes)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
    [
      data.project_id,
      data.assigned_to,
      data.title,
      data.description,
      data.start_date,
      data.due_date,
      data.priority || 'medium',
      data.status || 'open',
      data.percent_complete || 0,
      data.notes,
    ]
  );
  return result.rows[0];
};

export const updateTaskRecord = async (id, data) => {
  const result = await query(
    `UPDATE project_tasks SET assigned_to=$1, title=$2, description=$3, start_date=$4, due_date=$5,
      priority=$6, status=$7, percent_complete=$8, notes=$9 WHERE id=$10 RETURNING *`,
    [
      data.assigned_to,
      data.title,
      data.description,
      data.start_date,
      data.due_date,
      data.priority,
      data.status,
      data.percent_complete,
      data.notes,
      id,
    ]
  );
  return result.rows[0];
};

export const setTaskDependencies = async (taskId, dependencies = []) => {
  await query('DELETE FROM task_dependencies WHERE task_id = $1', [taskId]);
  for (const dependsOn of dependencies) {
    await query('INSERT INTO task_dependencies (task_id, depends_on_task_id) VALUES ($1, $2)', [taskId, dependsOn]);
  }
  return { taskId, dependencies };
};
