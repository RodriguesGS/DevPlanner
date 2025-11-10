import { v4 as uuidv4 } from 'uuid';
import * as taskRepository from '../repositories/task.repository.js';

// GET all tasks
export const getAllTasks = (req, res) => {
  try {
    const tasks = taskRepository.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks', message: error.message });
  }
};

// GET tasks by project
export const getTasksByProject = (req, res) => {
  try {
    const { projectId } = req.params;
    const tasks = taskRepository.findByProject(projectId);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks by project', message: error.message });
  }
};

// GET task by ID
export const getTaskById = (req, res) => {
  try {
    const { id } = req.params;
    const task = taskRepository.findById(id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching task', message: error.message });
  }
};

// POST create new task
export const createTask = (req, res) => {
  try {
    console.log('📝 Creating task - Request body:', req.body);

    const taskData = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      ...req.body
    };

    // Validate required fields
    if (!taskData.projectId || !taskData.title || !taskData.status || !taskData.priority) {
      console.log('❌ Missing required fields:', taskData);
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['projectId', 'title', 'status', 'priority']
      });
    }

    const newTask = taskRepository.create(taskData);
    console.log('✅ Task created successfully:', newTask);
    res.status(201).json(newTask);
  } catch (error) {
    console.error('❌ Error creating task:', error);
    res.status(500).json({ error: 'Error creating task', message: error.message });
  }
};

// PUT update task
export const updateTask = (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // If status is being changed to FINALIZADO, add completedAt
    if (updates.status === 'FINALIZADO' && !updates.completedAt) {
      updates.completedAt = new Date().toISOString();
    }

    const updatedTask = taskRepository.update(id, updates);

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Error updating task', message: error.message });
  }
};

// DELETE task
export const deleteTask = (req, res) => {
  try {
    const { id } = req.params;
    const deleted = taskRepository.remove(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully', id });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting task', message: error.message });
  }
};
