const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    
  },
  description: {
    type: String,
    
  },
  completed: {
    type: Boolean,
    default: false // Default task status is incomplete
  }
});

module.exports = mongoose.model('Task', taskSchema);
