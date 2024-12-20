import { Op } from 'sequelize';
import { TodoItem , Analytics } from '../common/models/index.js';
import sequelize from '../common/config/db.js';

class AnalyticsController {

    // Get analytics stats between startDate and endDate
    static async statsByDate(req, res) {
        try {
            const { startDate, endDate } = req.body;
            const userId = req.user.id;

            // Validate the input dates
            if (!startDate || !endDate) {
                return res.status(400).json({ message: 'Please provide both startDate and endDate' });
            }

            const start = new Date(startDate);
            const end = new Date(endDate);

            if (isNaN(start) || isNaN(end)) {
                return res.status(400).json({ message: 'Invalid date format' });
            }

            if (start > end) {
                return res.status(400).json({ message: 'Start date cannot be after end date' });
            }

            

            const analyticsData = await Analytics.findAll({
                attributes: [
                    'action',
                    [sequelize.fn('COUNT', sequelize.col('action')), 'count']
                ],
                where: {
                    actionDate: {
                        [Op.between]: [start, end]
                    },
                    userId
                },
                group: ['action']
            });


            const mostReadItem = await Analytics.findOne({
                attributes: [
                    'todoId',
                    [sequelize.fn('COUNT', sequelize.col('todoId')), 'readCount']
                ],
                where: {
                    actionDate: {
                        [Op.between]: [start, end]
                    },
                    action: 'read',
                    userId
                },
                group: ['todoId', 'TodoItem.id', 'TodoItem.title', 'TodoItem.description'], 
                order: [[sequelize.col('readCount'), 'DESC']],
                include: [
                    {
                        model: TodoItem,
                        as: 'TodoItem',
                        attributes: ['title', 'description']
                    }
                ],
                limit: 1
            });
            

            
            

            return res.status(200).json({
                status: 200,
                message: 'Analytics stats for provided date range',
                analyticsData,
                mostReadItem
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: 500,
                message: error.message
            });
        }
    }

    // Get stats for a logged-in user
    static async todoStats(req, res) {
        try {
            const userId = req.user.id;

            // Count completed TodoItem
            const completedTodoItemCount = await TodoItem.count({
                where: {
                    userId,
                    status: 'completed',
                }
            });

            // Count in-progress TodoItem
            const inProgressTodoItemCount = await TodoItem.count({
                where: {
                    userId,
                    status: 'in-progress',
                }
            });

            // Count pending TodoItem
            const pendingTodoItemCount = await TodoItem.count({
                where: {
                    userId,
                    status: 'pending',
                }
            });

            // Count overdue TodoItem
            const overdueTodoItemCount = await TodoItem.count({
                where: {
                    userId,
                    status: { [Op.ne]: 'completed' },
                    dueDate: { [Op.lt]: new Date() }
                }
            });

            const stats = {
                completedTodoItem: completedTodoItemCount,
                inProgressTodoItem: inProgressTodoItemCount,
                pendingTodoItem: pendingTodoItemCount,
                overdueTodoItem: overdueTodoItemCount
            };

            return res.status(200).json({
                status: 200,
                message: "Stats for logged-in user",
                stats
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: error.message
            });
        }
    }
}

export default AnalyticsController;
