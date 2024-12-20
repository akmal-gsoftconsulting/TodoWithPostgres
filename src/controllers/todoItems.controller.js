import { TodoItem , Analytics } from '../common/models/index.js';
import sequelize from '../common/config/db.js';

export const createTodo = async (req, res) => {
    const { title, description, status, dueDate, priority } = req.body;

    const transaction = await sequelize.transaction();

    try {
        const taskExists = await TodoItem.findOne({ where: { title } });
        if (taskExists) {
            await transaction.rollback();
            return res.status(400).json({ status: 400, message: "Todo with the same title already exists" });
        }

        const newTask = await TodoItem.create({
            title,
            description,
            status,
            dueDate,
            priority,
            userId: req.user.id
        }, { transaction });

        await Analytics.create({
            userId: req.user.id,
            todoId: newTask.id,
            action: 'create'
        }, { transaction });

        await transaction.commit();

        res.status(201).json({ status: 201, message: "Todo item created successfully", task: newTask });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ status: 500, message: error.message });
    }
};

export const getTodoForFilters = async (req, res) => {
    try {
        // const userId = req.user.id; 
        // const tasks = await TodoItem.findAll({
        //     where: { userId },
        //     attributes: ['title', 'description', 'status', 'dueDate', 'priority']
        // });
        res.status(200).json({ status: 200, message : "this res come from filters" ,  data: req.data });
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
    }
    
};


export const getTodo = async (req, res) => {
    try {
        const userId = req.user.id; 
        const tasks = await TodoItem.findAll({
            where: { userId },
            attributes: ['title', 'description', 'status', 'dueDate', 'priority']
        });
        res.status(200).json({ status: 200, tasks });
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
    }
    
};

export const getTodoById = async (req, res) => {
    
    const transaction = await sequelize.transaction();
    try {
        
        const { id } = req.params;
        const userId = req.user.id;
        const task = await TodoItem.findOne({
            where: { id , userId },
            attributes: ['id', 'title', 'description', 'status', 'dueDate', 'priority']
        });

        if (!task) {
            await transaction.rollback();
            return res.status(404).json({ status: 404, message: 'Task not found' });
        }

        await Analytics.create({
            userId: req.user.id,
            action: 'read',
            todoId: task.id
        }, { transaction });

        await transaction.commit();

        res.status(200).json({ status: 200, task });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ status: 500, message: error.message });
    }
};


export const updateTodo = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const { id } = req.params;
        const userId = req.user.id;
        const { title, description, status, dueDate, priority } = req.body;

        const updateFields = {};
        if (title) updateFields.title = title;
        if (description) updateFields.description = description;
        if (status) updateFields.status = status;
        if (dueDate) updateFields.dueDate = dueDate;
        if (priority) updateFields.priority = priority;

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ status: 400, message: "No fields provided to update" });
        }

        const [updated] = await TodoItem.update(updateFields, { where: { id , userId }, transaction });

        if (!updated) {
            await transaction.rollback();
            return res.status(404).json({ status: 404, message: "Task not found or no fields updated" });
        }

        const task = await TodoItem.findOne({ where: { id , userId} });
        await Analytics.create({
            userId: req.user.id,
            action: 'update',
            todoId: task.id
        }, { transaction });

        await transaction.commit();

        res.status(200).json({ status: 200, message: "Task updated successfully", data: updateFields });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ status: 500, message: error.message });
    }
};



export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const deleted = await TodoItem.destroy({ where: { id , userId } });
        if (!deleted) {
            return res.status(404).json({ status: 404, message: "Task not found" });
        }
        res.status(200).json({ status: 200, message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
    }
};