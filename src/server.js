const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const PGConnection = require('./model/db/connection/connection');
const setUserRoutes = require('./controllers/routes/userRoutes');
const setTaskRoutes = require('./controllers/routes/tasksRoutes');

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
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
});
