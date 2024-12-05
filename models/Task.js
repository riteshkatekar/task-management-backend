const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Ensures title is mandatory
  },
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false, // Default task status is incomplete
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'], // Allowed values for priority
    default: 'Low', // Default priority
  },
});

module.exports = mongoose.model('Task', taskSchema);
