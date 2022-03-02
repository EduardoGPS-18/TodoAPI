const { client } = require("../../db/connection/connection");
const { ModelErrorsFactory } = require("../errors/errors");

const taskTable = 'tasks';
module.exports = {
    async createTask({userID, title, subtitle, description, completed}) {
        const sql = `INSERT INTO ${taskTable}(user_id, title, subtitle, description, completed) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
        const queryValues = [userID, title, subtitle, description, completed ?? false];

        const task = (await client.query(sql, queryValues)).rows[0];
        return task;
    },

    async getTaskByUserId({userID}) {
        const sql = `SELECT * FROM ${taskTable} WHERE user_id = $1;`;
        const queryValues = [userID];

        const tasksData = await client.query(sql, queryValues);
        return {count: tasksData.rowCount, tasks: tasksData.rows};
    },

    async deleteTask({userID, taskID}) {
        const task = await this.getTaskById({taskID, userID});
        const sql = `DELETE FROM ${taskTable} WHERE user_id=$1 AND id=$2;`;
        const queryValues = [userID, taskID];
        if(!task) {
            ModelErrorsFactory.inexistentDataError('Não existe essa tarefa!');
        } else {
            await client.query(sql, queryValues);
            return task;
        }
    },

    async updateTask({userID, taskID, title, subtitle, description, completed}) {
        const task = await this.getTaskById({userID, taskID});
        const sql = `UPDATE ${taskTable} SET title=$1, subtitle=$2, description=$3, completed=$4 WHERE user_id=$5 AND id=$6 RETURNING *;`;
        const queryValues = [
            title ?? task.title,
            subtitle ?? task.subtitle,
            description ?? task.description,
            completed ?? task.completed,
            userID,
            taskID
        ];        
        const updatedTask = (await client.query(sql, queryValues)).rows[0];
        return updatedTask;
    },

    async getTaskById({userID, taskID}){
        const sql = `SELECT * FROM ${taskTable} WHERE id = $1 AND user_id = $2;`;
        const queryValues = [taskID, userID];

        const task = (await client.query(sql, queryValues)).rows[0];
        if(!task) {
            ModelErrorsFactory.inexistentDataError('Não existe esta tarefa!');
        }
        return task;
    },
}