import sequelize from '../config/db.js';
import User from './user.js';
import TodoItem from './todoItem.js';
import Analytics from './Analytics.js';




// Define relationships
User.hasMany(TodoItem, { foreignKey: 'userId', onDelete: 'CASCADE' });
TodoItem.belongsTo(User, { foreignKey: 'userId' });


User.hasMany(Analytics , { foreignKey: 'userId', onDelete: 'CASCADE' });
Analytics.belongsTo(User , { foreignKey: 'userId' });

TodoItem.hasMany(Analytics , { foreignKey: 'todoId'  , onDelete: 'CASCADE'});
Analytics.belongsTo(TodoItem , { foreignKey: 'todoId'});


// Sync models with database
(async () => {
  try {
    await sequelize.sync();
    console.log('Models synchronized with database.');
  } catch (error) {
    console.error('Error synchronizing models:', error);
  }
})();

export { User, TodoItem  , Analytics};
