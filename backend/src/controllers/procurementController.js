import {
  createProcurementRequest,
  approveProcurementOrder,
  receiveProcurementMaterials,
  listProcurementOrders,
} from '../services/procurementService.js';

export const listOrders = async (req, res, next) => {
  try {
    const orders = await listProcurementOrders(req.query.projectId);
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const createRequest = async (req, res, next) => {
  try {
    const order = await createProcurementRequest(req.body);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

export const approveOrder = async (req, res, next) => {
  try {
    const order = await approveProcurementOrder(req.params.id);
    res.json(order);
  } catch (error) {
    next(error);
  }
};

export const receiveMaterials = async (req, res, next) => {
  try {
    const order = await receiveProcurementMaterials(req.params.id, req.body);
    res.json(order);
  } catch (error) {
    next(error);
  }
};
