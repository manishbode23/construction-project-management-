import express from 'express';
import { generateReport, listReports } from '../controllers/reportController.js';

const router = express.Router();
router.get('/', listReports);
router.post('/generate', generateReport);

export default router;
