import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; 

const Reminder = sequelize.define('Reminder', {
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'reminders',
    timestamps: true,
});

export default Reminder;
