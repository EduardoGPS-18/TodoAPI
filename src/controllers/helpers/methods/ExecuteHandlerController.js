const UserController = require("../../user/UserController");

module.exports = {
    executeHandlerController(req, res) {
        return async (handlerController) => {
            try {
                const controllerResult = await handlerController();
                res.status(200).json(controllerResult);
            } catch(err) {
                if(err.error){
                    res.status(err.status).json({error: err.error});
                } else {
                    res.status(err.status).send();
                }
            }
        }
    },
    onlyLoggedUserAlloyExecuteHandler(req, res) {
        return async (handlerController) => {
            try {
                const user = await UserController.handleVerifyAuthorization(req.headers);
                const controllerResult = await handlerController(user);
                res.status(200).json(controllerResult);
            } catch(err) {
                if(err.error){
                    res.status(err.status).json({error: err.error});
                } else {
                    res.status(err.status).send();
                }
            }
        }
    }
}