import { Reminder, TodoItem } from '../common/models/index.js';
import { Op } from 'sequelize';

class ReminderController {
    static async setReminder(req, res) {
        try {
            const { message, time, todoId } = req.body;
            const userId = req.user.id;
            const testingTodo = await TodoItem.findOne({where : {id: todoId , userId}});
            if (!testingTodo) {
                return res.status(404).json({ status: 404, message: "todoitem not found" });
            }
            const reminder = await Reminder.create({  message, time , userId, todoId});
            res.status(200).json({
                status: 200,
                message: "Reminder created successfully",
                result: reminder,
            });
        } catch (error) {
            res.status(500).json({ status: 500, error: error.message });
        }
    }

    static async fetchActiveReminders(req, res) {
        try {
            const userId = req.user.id;
            const reminders = await Reminder.findAll({
                where: {
                    userId,
                    time: { [Op.gt]: new Date() }, 
                },
                attributes: ['id', 'message', 'time', 'createdAt'],
                order: [['time', 'ASC']],
            });
            res.status(200).json({
                status: 200,
                message: "Active reminders for the logged-in user",
                result: reminders,
            });
        } catch (error) {
            res.status(500).json({ status: 500, error: error.message });
        }
    }
    
    static async deleteReminder(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.id;
            const result = await Reminder.destroy({
                where: { id , userId },
            });
            if (result === 0) {
                return res.status(404).json({ status: 404, message: "Reminder not found" });
            }
            res.status(200).json({
                status: 200,
                message: "Reminder deleted successfully",
                result,
            });
        } catch (error) {
            res.status(500).json({ status: 500, error: error.message });
        }
    }
}

export default ReminderController;
