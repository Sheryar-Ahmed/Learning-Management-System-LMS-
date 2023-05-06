const express = require('express');
const { auth, roles } = require('../middleware/authMiddleware');
const { todos, getAllTodos, updatTodo } = require('../controllers/todoController');

const router = express.Router();

router.route('/todos/new').post(auth, roles('student'), todos);
router.route('/todos').get(auth, roles('student'), getAllTodos);
router.route('/todos/update/:id').post(auth, roles('student'), updatTodo);

module.exports = router;