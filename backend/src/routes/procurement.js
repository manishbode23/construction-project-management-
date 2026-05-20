import express from 'express';
import {
  createRequest,
  approveOrder,
  receiveMaterials,
  listOrders,
} from '../controllers/procurementController.js';

const router = express.Router();
router.get('/', listOrders);
router.post('/request', createRequest);
router.put('/:id/approve', approveOrder);
router.put('/:id/receive', receiveMaterials);

export default router;
