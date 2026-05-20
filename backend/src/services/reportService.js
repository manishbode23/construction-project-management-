import { query } from '../db/index.js';

export const listReportExports = async (projectId) => {
  const sql = projectId
    ? 'SELECT * FROM report_exports WHERE project_id = $1 ORDER BY generated_at DESC'
    : 'SELECT * FROM report_exports ORDER BY generated_at DESC';
  const result = await query(sql, projectId ? [projectId] : []);
  return result.rows;
};

export const generateClientReport = async (data) => {
  const result = await query(
    `INSERT INTO report_exports (project_id, type, generated_by, file_url)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [data.project_id, data.type || 'client', data.generated_by, data.file_url || '']
  );
  return result.rows[0];
};
