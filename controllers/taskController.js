const Task = require('../models/Task');

// Add a new task
exports.addTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const newTask = await Task.create({ title, description, completed });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

// Update a task's status
// Update a task's status (PUT method)
exports.updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;  // Get task ID from URL parameters
    const { title, description, completed } = req.body;  // Get data from request body

    // Find the task by ID
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });  // If task doesn't exist, return 404
    }

    // Update the fields only if they are provided
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;

    // Save the updated task
    const updatedTask = await task.save();

    // Return the updated task as a response
    return res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);  // Log the error for debugging
    return res.status(500).json({ message: 'Error updating task', error });  // Return 500 if error occurs
  }
};



// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully', deletedTask });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
};
