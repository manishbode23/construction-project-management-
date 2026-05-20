import express from 'express';
import {
  getBudgetAnalysis,
  addCostEntry,
  listSubcontractorPayments,
  updatePaymentStatus,
} from '../controllers/financeController.js';

const router = express.Router();
router.get('/budget', getBudgetAnalysis);
router.post('/cost-entry', addCostEntry);
router.get('/payments', listSubcontractorPayments);
router.put('/payments/:id', updatePaymentStatus);

export default router;
