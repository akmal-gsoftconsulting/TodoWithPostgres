import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Collaborator = sequelize.define('Collaborator', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },
}, {
  tableName: 'collaborator'
});


export default Collaborator;
