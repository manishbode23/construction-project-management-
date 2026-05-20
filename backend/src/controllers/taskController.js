import {
  findTasks,
  findTaskById,
  createTaskRecord,
  updateTaskRecord,
  setTaskDependencies,
} from '../services/taskService.js';

export const listTasks = async (req, res, next) => {
  try {
    const tasks = await findTasks(req.query.projectId);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req, res, next) => {
  try {
    const task = await findTaskById(req.params.id);
    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const task = await createTaskRecord(req.body);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await updateTaskRecord(req.params.id, req.body);
    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const setDependencies = async (req, res, next) => {
  try {
    const result = await setTaskDependencies(req.params.id, req.body.dependencies);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
