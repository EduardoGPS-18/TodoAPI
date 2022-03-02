const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const PGConnection = require('./db/connection/connection');
const setUserRoutes = require('./routes/userRoutes');
const setTaskRoutes = require('./routes/tasksRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use((_req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

setUserRoutes(app);
setTaskRoutes(app);

PGConnection.connect().then(() => {
    const port = process.env.SERVER_PORT;
    app.listen(port, () => console.log(`Server rodando na porta ${port}`))
});
