const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    todo: {
        type: String,
        required: [true, 'todo is required'],
        minLength: [4, 'must be greater than 3 characters']
    },
    isDone: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'Id cannot be empty'],
        ref: 'students'
    }
});

const Todo = mongoose.models?.todo || mongoose.model('todo', TodoSchema);

module.exports = Todo;