const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController'); // Adjust path if necessary

// Add a new task
router.post('/tasks', taskController.addTask);

// Get all tasks with optional query parameters (e.g., filter by priority or completion status)
router.get('/tasks', taskController.getTasks);

// Update a task (allows updating title, description, priority, or completion status)
router.put('/tasks/:id', taskController.updateTaskStatus);

// Delete a task by ID
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;
