import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; 

const Tag = sequelize.define('Tag', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'tags',
    timestamps: true,
});

export default Tag;