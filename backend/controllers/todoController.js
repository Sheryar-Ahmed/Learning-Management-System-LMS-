const expressAsyncHandler = require('express-async-handler');
const Todo = require('../models/todo');



const todos = expressAsyncHandler(async (req, res) => {
    if (!req.body) {
        res.status(400);
        throw new Error("Nothing in body");
    };
    const { todo } = req.body;
    if (!todo) {
        res.status(400);
        throw new Error("Todo can't be invalid");
    }
    req.body.user = req.user.id; //getting from auth and setting into object

    const newTodo = await Todo.create(req.body);
    if (!newTodo) {
        res.status(400);
        throw new Error("Try again");
    };

    res.status(201).json({
        success: true,
        todo: newTodo
    });
});
const getAllTodos = expressAsyncHandler(async (req, res) => {
    const id = req.user.id;
    const alltodo = await Todo.find({ 'user': id });
    if (!alltodo) {
        res.status(400);
        throw new Error("Todos not Found");
    };

    res.status(200).json({
        success: true,
        todosList: alltodo
    })
});

//updating todo
const updatTodo = expressAsyncHandler(async (req, res) => {
    if (!req.body) {
        res.status(400);
        throw new Error("Request is empty");
    };
    const isFound = await Todo.findOne({'_id':req.params.id});
    if (!isFound) {
        res.status(404);
        throw new Error(`Todo not found with this id : ${req.params.id}`);
    };
    const updateTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!updateTodo) {
        res.status(400);
        throw new Error("Todo is not updated, try again");
    };

    res.status(200).json({
        success: true,
        newTodo: updateTodo
    })
});
module.exports = { todos, getAllTodos, updatTodo };