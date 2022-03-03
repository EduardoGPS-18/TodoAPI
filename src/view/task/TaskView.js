module.exports = {
    TaskView({id, title, subtitle, end_date, description, completed}) {
        return {
            id,
            title,
            subtitle,
            end_date: end_date,
            description,
            completed
        };
    }
}