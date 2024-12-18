import sequelize from '../config/db.js';
import User from './user.js';
import TodoItem from './todoItem.js';



// Define relationships
User.hasMany(TodoItem, { foreignKey: 'userId', onDelete: 'CASCADE' });
TodoItem.belongsTo(User, { foreignKey: 'userId' });

// Sync models with database
(async () => {
  try {
    await sequelize.sync();
    console.log('Models synchronized with database.');
  } catch (error) {
    console.error('Error synchronizing models:', error);
  }
})();

export { User, TodoItem };
