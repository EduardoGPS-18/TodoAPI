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

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server rodando na porta ${port}`);
    PGConnection.connect().then(() => console.log('Conectado ao banco!'));
});