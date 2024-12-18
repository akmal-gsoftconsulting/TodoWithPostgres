import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const List = sequelize.define('List', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'List name cannot be empty' },
      len: {
        args: [3, 50],
        msg: 'List name must be between 3 and 50 characters',
      },
    },
  },
}, {
  tableName: 'lists'
});

export default List;
