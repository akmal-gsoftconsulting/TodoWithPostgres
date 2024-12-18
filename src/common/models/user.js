import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';


const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Name cannot be empty',
      },
      len: {
        args: [3, 50],
        msg: 'Name must be between 3 and 50 characters',
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: 'Email must be unique',
    },
    validate: {
      isEmail: {
        msg: 'Must be a valid email address',
      },
      notEmpty: {
        msg: 'Email cannot be empty',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Password cannot be empty',
      },
      len: {
        args: [8, 100],
        msg: 'Password must be at least 8 characters long',
      },
      isStrongPassword(value) {
        if (!/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/[0-9]/.test(value)) {
          throw new Error('Password must include uppercase, lowercase, and a number.');
        }
      },
    },
  },
  resetToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  resetTokenExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
  },

}, {
  tableName: 'users',
  timestamps: true, // createdAt and updatedAt
});

export default User;
