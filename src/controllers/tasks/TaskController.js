const { InexistentDataError } = require("../../model/errors/errors");
const { MissingKeysInObjectError } = require('../errors/errors');

const { ContainsKeyInObjectOrThrow } = require('../helpers/methods/ContainsKeyInObjectOrThrow');
const { TaskView } = require("../../view/task/TaskView");
const TaskModel = require("../../model/task/TaskModel");

module.exports = {
    async handleCreateTask(createTaskParams) {
        try{
            ContainsKeyInObjectOrThrow(createTaskParams, ['title']);
            const { user, title, subtitle, description, completed, end_date } = createTaskParams;
            
            const task = await TaskModel.createTask({
                title,
                endDate: end_date,
                completed,
                subtitle,
                description,
                userID: user.id,
            });
            return TaskView(task);
        } catch(err) {
            console.log(`LOGGER (TASK CONTROLLER @CREATE TASK): ${err.message}`);
            if(err instanceof MissingKeysInObjectError) {
                throw { status: 400, error: err.message };
            } else {
                throw { status: 500 };
            }
        }
    },

    async handleDeleteTask(deleteTaskParams) {
        try{
            ContainsKeyInObjectOrThrow(deleteTaskParams, ['task_id']);
            const { task_id, user } = deleteTaskParams;
            const task = await TaskModel.deleteTask({userID: user.id, taskID: task_id});
            return TaskView(task);
        } catch(err) {
            console.log(`LOGGER (TASK CONTROLLER @DELETE TASK): ${err.message}`);
            if(err instanceof MissingKeysInObjectError) {
                throw { status: 400, error: err.message };
            } else if(err instanceof InexistentDataError) {
                throw { status: 400, error: err.message };
            }  else {
                throw { status: 500 };
            }
        }
    },

    async handleGetTasks(getTasksParams) {
        try{
            const { user } = getTasksParams;
            const task = await TaskModel.getTaskByUserId({userID: user.id});
            return task.tasks.map((task) => TaskView(task));
        } catch(err) {
            console.log(`LOGGER (TASK CONTROLLER @CREATE TASK): ${err.message}`);
            if(err instanceof MissingKeysInObjectError) {
                throw { status: 400, error: err.message };
            } else {
                throw { status: 500 };
            }
        }
    },

    async handleGetTaskByID(getTaskByIDParams) {
        try{
            const { user, task_id } = getTaskByIDParams;
            const task = await TaskModel.getTaskById({userID: user.id, taskID: task_id});
            return task;
        } catch(err) {
            console.log(`LOGGER (TASK CONTROLLER @GET TASK BY ID): ${err.message}`);
            if(err instanceof MissingKeysInObjectError) {
                throw { status: 400, error: err.message };
            } else if(err instanceof InexistentDataError) {
                throw { status: 400, error: err.message };
            }  else {
                throw { status: 500 };
            }
        }
    },

    async handleUpdateTaskByID(updateTaskByIDParams) {
        try{
            ContainsKeyInObjectOrThrow(updateTaskByIDParams, ['task_id']);
            const { user, task_id } = updateTaskByIDParams;
            const { title, subtitle, end_date, description, completed } = updateTaskByIDParams;
            const tasks = await TaskModel.updateTask({
                userID: user.id,
                taskID: task_id,
                endDate: end_date,
                title, subtitle, description, completed
            });
            return tasks.tasks.map((task) => TaskView(task));
        } catch(err) {
            console.log(`LOGGER (TASK CONTROLLER @UPDATE TASK): ${err.message}`);
            if(err instanceof MissingKeysInObjectError) {
                throw { status: 400, error: err.message };
            } else if(err instanceof InexistentDataError) {
                throw { status: 400, error: err.message };
            } else {
                throw { status: 500 };
            }
        }
    }
}