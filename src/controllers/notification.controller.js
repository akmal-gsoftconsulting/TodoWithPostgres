import { Notification } from "../common/models/index.js";
import { Op } from 'sequelize';

class NotificationController {
   
    static async fetchUnreadNotifications(req, res) {
        try {
            const userId = req.user.id;
            const notifications = await Notification.findAll({
                where: {
                    userId,
                    isRead: false,
                },
                attributes: ['type', 'message', 'isRead', 'createdAt'],
                order: [['createdAt', 'DESC']]
            });
            res.status(200).json({
                status: 200,
                message: "All unread notifications for the logged-in user",
                notifications,
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

   
    static async markNotificationAsRead(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.id;
            const [result] = await Notification.update(
                { isRead: true },
                { where: { id , userId } }
            );
            if (!result) {
                return res.status(404).json({ message: "Notification not found" }); 
            }
            res.status(200).json({
                status: 200,
                message: "Notification marked as read",
                result,
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async removeNotification(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            
            

            const result = await Notification.destroy({
                where: { id , userId },
            });            

            if (!result) {
                return res.status(404).json({ message: "Notification not found" }); 
            }
            res.status(200).json({
                status: 200,
                message: "Notification deleted",
                result,
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async createNotification(req, res) {
        try {
            const { message, type = 'reminder' } = req.body;
            const userId = req.user.id;
            const notification = await Notification.create({ userId, type, message });
            res.status(200).json({
                status: 200,
                message: "Notification created successfully",
                notification,
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

export default NotificationController;
