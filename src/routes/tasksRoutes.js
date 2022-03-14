const { onlyLoggedUserAlloyExecuteHandler } = require('../controllers/helpers/methods/ExecuteHandlerController');
const TaskController = require("../controllers/tasks/TaskController");

module.exports = app => {
    app.get('/tasks', async (req, res) => {
        onlyLoggedUserAlloyExecuteHandler(req, res)((user) => TaskController.handleGetTasks({user}));
    });
    app.get('/task/:task_id', async (req, res) => {
        onlyLoggedUserAlloyExecuteHandler(req, res)((user) => TaskController.handleGetTaskByID({user, ...req.params}));
    });
    app.get('/info', async (req, res) => {
        onlyLoggedUserAlloyExecuteHandler(req, res)((user) => TaskController.handleGetTaskInfo({user}));
    });
    app.post('/task', async (req, res) => {
        onlyLoggedUserAlloyExecuteHandler(req, res)((user) => TaskController.handleCreateTask({user, ...req.body}));
    });
    app.delete('/task/:task_id', async (req, res) => {
        onlyLoggedUserAlloyExecuteHandler(req, res)((user) => TaskController.handleDeleteTask({user, ...req.params}));
    });
    app.put('/task/:task_id', async (req, res) => {
        onlyLoggedUserAlloyExecuteHandler(req, res)((user) => TaskController.handleUpdateTaskByID({user, ...req.params, ...req.body}));
    });
}
