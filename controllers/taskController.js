const Task = require('../models/Task');

// Add a new task
exports.addTask = async (req, res) => {
  try {
    const { title, description, completed, priority } = req.body; // Include priority
    const newTask = await Task.create({ title, description, completed, priority });
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Error creating task', error });
  }
};

// Get all tasks
// Get all tasks and sort by priority (High -> Medium -> Low) and completion status (Incomplete first)
exports.getTasks = async (req, res) => {
  try {
    // Fetch all tasks from the database
    const tasks = await Task.find();

    // Define custom sorting logic for priority and completion status
    const priorityOrder = {
      Low: 3,
      Medium: 2,
      High: 1
    };

    // Sort tasks by completion status (Incomplete first) and then by priority
    const sortedTasks = tasks.sort((a, b) => {
      // Sort by completion status: Incomplete (false) before Complete (true)
      if (a.completed !== b.completed) {
        return a.completed - b.completed; // false (0) comes before true (1)
      }

      // If completion status is the same, sort by priority (High -> Medium -> Low)
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    // Send the sorted tasks as a response
    res.status(200).json(sortedTasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};



// Update a task's status or details
exports.updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params; // Get task ID from URL
    const { title, description, completed, priority } = req.body; // Include priority in the update fields

    // Find the task by ID
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update fields only if provided
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;
    if (priority !== undefined) task.priority = priority;

    // Save and return the updated task
    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Error updating task', error });
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
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Error deleting task', error });
  }
};
