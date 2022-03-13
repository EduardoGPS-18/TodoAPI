const { executeHandlerController } = require('../controllers/helpers/methods/ExecuteHandlerController');
const TaskController = require("../controllers/tasks/TaskController");

module.exports = app => {
    app.get('/tasks', async (req, res) => {
        executeHandlerController(req, res)((user) => TaskController.handleGetTasks({user}));
    });
    app.post('/task', async (req, res) => {
        executeHandlerController(req, res)((user) => TaskController.handleCreateTask({user, ...req.body}));
    });
    app.delete('/task/:task_id', async (req, res) => {
        executeHandlerController(req, res)((user) => TaskController.handleDeleteTask({user, ...req.params}));
    });
    app.put('/task/:task_id', async (req, res) => {
        executeHandlerController(req, res)((user) => TaskController.handleUpdateTaskByID({user, ...req.params, ...req.body}));
    });
}
