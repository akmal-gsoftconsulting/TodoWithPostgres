import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; 

const Notification = sequelize.define('Notification', {
    
    type: {
        type: DataTypes.ENUM('reminder', 'update'), 
        defaultValue: 'reminder',
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    tableName: 'notifications',
    timestamps: true,
});

export default Notification;
