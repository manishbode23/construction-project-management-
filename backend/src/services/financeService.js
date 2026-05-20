import { query } from '../db/index.js';

export const getBudgetStatus = async (projectId) => {
  const budgetResult = await query('SELECT COALESCE(SUM(planned_amount),0) AS planned FROM budget_items WHERE project_id = $1', [projectId]);
  const actualResult = await query('SELECT COALESCE(SUM(amount),0) AS actual FROM cost_entries WHERE project_id = $1', [projectId]);
  return {
    projectId,
    plannedBudget: budgetResult.rows[0].planned,
    actualCost: actualResult.rows[0].actual,
    variance: parseFloat(budgetResult.rows[0].planned) - parseFloat(actualResult.rows[0].actual),
  };
};

export const createCostEntry = async (data) => {
  const result = await query(
    `INSERT INTO cost_entries (project_id, budget_item_id, description, amount, spent_at, created_by, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [
      data.project_id,
      data.budget_item_id,
      data.description,
      data.amount,
      data.spent_at,
      data.created_by,
      data.status || 'approved',
    ]
  );
  return result.rows[0];
};

export const getSubcontractorPayments = async (projectId) => {
  const sql = projectId
    ? 'SELECT * FROM subcontractor_payments WHERE project_id = $1 ORDER BY due_date ASC'
    : 'SELECT * FROM subcontractor_payments ORDER BY due_date ASC';
  const result = await query(sql, projectId ? [projectId] : []);
  return result.rows;
};

export const updateSubcontractorPaymentStatus = async (id, status) => {
  const result = await query(
    'UPDATE subcontractor_payments SET status = $1 WHERE id = $2 RETURNING *',
    [status, id]
  );
  return result.rows[0];
};
