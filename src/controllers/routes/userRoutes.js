const { executeHandlerController } = require('../helpers/methods/ExecuteHandlerController');
const UserController = require('../user/UserController');

module.exports = (app) => {
    app.post('/user/register', async (req, res) => {
        executeHandlerController(req, res)(() => UserController.handleRegister(req.body));
    });
    app.post('/user/login', async (req, res) => {
        executeHandlerController(req, res)(() => UserController.handleLogin(req.body));
    });
}