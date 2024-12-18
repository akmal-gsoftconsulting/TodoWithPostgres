import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const TodoItem = sequelize.define('TodoItem', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Title cannot be empty',
      },
      len: {
        args: [3, 100],
        msg: 'Title must be between 3 and 100 characters',
      },
    },
  },
  description: {
    type: DataTypes.TEXT,
    validate: {
      len: {
        args: [0, 500],
        msg: 'Description can be up to 500 characters long',
      },
    },
  },
  dueDate: {
    type: DataTypes.DATE,
    validate: {
      isDate: {
        msg: 'Due date must be a valid date',
      },
      isAfterToday(value) {
        if (value && new Date(value) < new Date()) {
          throw new Error('Due date cannot be in the past');
        }
      },
    },
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high'),
    defaultValue: 'medium',
    validate: {
      isIn: {
        args: [['low', 'medium', 'high']],
        msg: 'Priority must be one of: low, medium, high',
      },
    },
  },
  status: {
    type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
    defaultValue: 'pending',
    validate: {
      isIn: {
        args: [['pending', 'in-progress', 'completed']],
        msg: 'Status must be one of: pending, in-progress, completed',
      },
    },
  },
}, {
  tableName: 'todo_items',
  timestamps: true,
});


export default TodoItem;
