import { generateClientReport, listReportExports } from '../services/reportService.js';

export const listReports = async (req, res, next) => {
  try {
    const reports = await listReportExports(req.query.projectId);
    res.json(reports);
  } catch (error) {
    next(error);
  }
};

export const generateReport = async (req, res, next) => {
  try {
    const report = await generateClientReport(req.body);
    res.status(201).json(report);
  } catch (error) {
    next(error);
  }
};
