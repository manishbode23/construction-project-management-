import {
  getBudgetStatus,
  createCostEntry,
  getSubcontractorPayments,
  updateSubcontractorPaymentStatus,
} from '../services/financeService.js';

export const getBudgetAnalysis = async (req, res, next) => {
  try {
    const analysis = await getBudgetStatus(req.query.projectId);
    res.json(analysis);
  } catch (error) {
    next(error);
  }
};

export const addCostEntry = async (req, res, next) => {
  try {
    const entry = await createCostEntry(req.body);
    res.status(201).json(entry);
  } catch (error) {
    next(error);
  }
};

export const listSubcontractorPayments = async (req, res, next) => {
  try {
    const payments = await getSubcontractorPayments(req.query.projectId);
    res.json(payments);
  } catch (error) {
    next(error);
  }
};

export const updatePaymentStatus = async (req, res, next) => {
  try {
    const payment = await updateSubcontractorPaymentStatus(req.params.id, req.body.status);
    res.json(payment);
  } catch (error) {
    next(error);
  }
};
