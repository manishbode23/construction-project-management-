import { query } from '../db/index.js';

export const listProcurementOrders = async (projectId) => {
  const sql = projectId
    ? 'SELECT * FROM procurement_orders WHERE project_id = $1 ORDER BY ordered_at DESC'
    : 'SELECT * FROM procurement_orders ORDER BY ordered_at DESC';
  const params = projectId ? [projectId] : [];
  const result = await query(sql, params);
  return result.rows;
};

export const createProcurementRequest = async (data) => {
  const result = await query(
    `INSERT INTO procurement_orders (project_id, created_by, vendor, status, total_cost, expected_delivery)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [data.project_id, data.created_by, data.vendor, 'requested', data.total_cost || 0, data.expected_delivery]
  );
  return result.rows[0];
};

export const approveProcurementOrder = async (id) => {
  const result = await query('UPDATE procurement_orders SET status = $1 WHERE id = $2 RETURNING *', ['approved', id]);
  return result.rows[0];
};

export const receiveProcurementMaterials = async (id, data) => {
  const result = await query(
    'UPDATE procurement_orders SET status = $1, expected_delivery = $2 WHERE id = $3 RETURNING *',
    ['received', data.expected_delivery || null, id]
  );
  return result.rows[0];
};
