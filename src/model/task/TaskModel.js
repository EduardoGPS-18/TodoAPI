const { client } = require("../../db/connection/connection");
const { ModelErrorsFactory } = require("../errors/errors");
const { daysFromMilliseconds } = require('../helpers/getDaysFromMilliseconds');

const taskTable = 'tasks';
module.exports = {
    async createTask({userID, title, endDate, subtitle, description, completed}) {
        const sql = `INSERT INTO ${taskTable}(user_id, title, subtitle, description, completed, end_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
        
        const sevenDaysAheadOfToday = new Date(Date.now() + daysFromMilliseconds(7));
        const date = endDate ? endDate : sevenDaysAheadOfToday;
        const queryValues = [userID, title, subtitle, description, completed ?? false, date];
        return (await client.query(sql, queryValues)).rows[0];
    },

    async getTaskByUserId({userID}) {
        const sql = `SELECT * FROM ${taskTable} WHERE user_id = $1 ORDER BY end_date ASC;`;
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

    async updateTask({userID, taskID, title, subtitle, endDate, description, completed}) {
        const task = await this.getTaskById({userID, taskID});
        const sql = `UPDATE ${taskTable} SET title=$1, subtitle=$2, description=$3, completed=$4, end_date=$5 WHERE user_id=$6 AND id=$7 RETURNING *;`;

        const queryValues = [
            title ?? task.title,
            subtitle ?? task.subtitle,
            description ?? task.description,
            completed ?? task.completed,
            endDate ?? task.end_date,
            userID,
            taskID
        ];
        client.query(sql, queryValues)
        const tasks = await this.getTaskByUserId({userID})
        return tasks;
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