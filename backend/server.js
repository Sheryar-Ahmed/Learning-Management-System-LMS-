const app = require('./app');
const dbConnection = require('./config/db');
const PORT = process.env.NODE_PORT || 5000;

dbConnection();

app.listen(PORT, (req, res) => console.log(`server is running on ${PORT}`));