import { DataTypes } from 'sequelize';
import  sequelize  from '../config/db.js';

const Analytics = sequelize.define('Analytics', {
  action: { 
    type: DataTypes.ENUM('create', 'update', 'read'),
    allowNull: false 
  },
  actionDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    tableName: 'analytics',
    timestamps: true,
  }
);

export default Analytics;
