const express = require('express');
require('dotenv').config();
const studentRoute = require('./routes/routeStudent');
const notesRoute = require('./routes/routeNotes');
const routeHomeWork = require('./routes/routeHomeWork');
const routeTodo = require('./routes/routeTodo');

const errorHandler = require('./middleware/errorMiddleware');
const cookieParser = require('cookie-parser');
const app = express();
//middleware
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1', studentRoute);
app.use('/api/v1', notesRoute);
app.use('/api/v1', routeHomeWork);
app.use('/api/v1/students', routeTodo)

app.use(errorHandler);
module.exports = app;