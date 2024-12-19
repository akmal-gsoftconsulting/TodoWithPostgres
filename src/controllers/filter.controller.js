import { TodoItem, Tag } from '../common/models/index.js';
import sequelize from '../common/config/db.js';
import { Op } from 'sequelize';


class TodoController {
    static async filterTodoItems(req, res) {
        try {
            const { status, priority, dueDate, tag, title } = req.query;
            const userId = req.user.id;

            if (!status && !priority && !dueDate && !tag && !title) {
                return res.status(400).send("No filter selected");
            }

            
            const filter = { userId };

            if (status) filter.status = status;
            if (priority) filter.priority = priority;
            if (dueDate) filter.dueDate = dueDate;
            if (tag) filter['$Tags.name$'] = tag; 
            if (title) filter.title = { [Op.iLike]: `%${title}%` };


    
            const tasks = await TodoItem.findAll({
                where: filter,
                attributes: ['id', 'title', 'description', 'status', 'dueDate', 'priority'],
                include: tag ? [{
                    model: Tag, 
                    where: { name: tag }, 
                    attributes: []
                }] : [],
            });

            return res.status(200).json({
                status: 200,
                message: "Todo items with given filters",
                tasks: tasks
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

export default TodoController;
