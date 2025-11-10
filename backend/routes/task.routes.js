import express from 'express';
import {
  getAllTasks,
  getTaskById,
  getTasksByProject,
  createTask,
  updateTask,
  deleteTask
} from '../controllers/task.controller.js';

const router = express.Router();

router.get('/', getAllTasks);

router.get('/project/:projectId', getTasksByProject);

router.get('/:id', getTaskById);

router.post('/', createTask);

router.put('/:id', updateTask);

router.delete('/:id', deleteTask);

export default router;
