const express = require('express');
const auth = require('../middleware/authMiddleware');
const { todos, getAllTodos, updatTodo } = require('../controllers/todoController');

const router = express.Router();

router.route('/todos/new').post(auth, todos);
router.route('/todos').get(auth, getAllTodos);
router.route('/todos/update/:id').post(auth, updatTodo);

module.exports = router;