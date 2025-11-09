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

// GET all tasks
router.get('/', getAllTasks);

// GET tasks by project
router.get('/project/:projectId', getTasksByProject);

// GET task by ID
router.get('/:id', getTaskById);

// POST create new task
router.post('/', createTask);

// PUT update task
router.put('/:id', updateTask);

// DELETE task
router.delete('/:id', deleteTask);

export default router;
