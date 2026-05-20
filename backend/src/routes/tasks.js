import express from 'express';
import {
  listTasks,
  getTask,
  createTask,
  updateTask,
  setDependencies,
} from '../controllers/taskController.js';

const router = express.Router();
router.get('/', listTasks);
router.get('/:id', getTask);
router.post('/', createTask);
router.put('/:id', updateTask);
router.post('/:id/dependencies', setDependencies);

export default router;
