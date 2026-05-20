import { query } from '../db/index.js';

export const findProjects = async () => {
  const result = await query('SELECT * FROM projects ORDER BY created_at DESC');
  return result.rows;
};

export const findProjectById = async (id) => {
  const result = await query('SELECT * FROM projects WHERE id = $1', [id]);
  return result.rows[0];
};

export const createProjectRecord = async (data) => {
  const result = await query(
    `INSERT INTO projects (company_id, name, client_name, location, start_date, end_date, approved_budget, status, description)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *`,
    [
      data.company_id,
      data.name,
      data.client_name,
      data.location,
      data.start_date,
      data.end_date,
      data.approved_budget,
      data.status || 'active',
      data.description,
    ]
  );
  return result.rows[0];
};

export const updateProjectRecord = async (id, data) => {
  const result = await query(
    `UPDATE projects SET name = $1, client_name = $2, location = $3, start_date = $4, end_date = $5,
      approved_budget = $6, status = $7, description = $8 WHERE id = $9 RETURNING *`,
    [
      data.name,
      data.client_name,
      data.location,
      data.start_date,
      data.end_date,
      data.approved_budget,
      data.status,
      data.description,
      id,
    ]
  );
  return result.rows[0];
};

export const archiveProjectRecord = async (id) => {
  await query('UPDATE projects SET status = $1 WHERE id = $2', ['archived', id]);
};
