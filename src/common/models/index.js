import sequelize from '../config/db.js';
import User from './user.js';
import TodoItem from './todoItem.js';
import Analytics from './Analytics.js';
import List from './list.js';
import Collaborator from './collaborator.js';




// Define relationships
User.hasMany(TodoItem, { foreignKey: 'userId', onDelete: 'CASCADE' });
TodoItem.belongsTo(User, { foreignKey: 'userId' });


User.hasMany(Analytics , { foreignKey: 'userId', onDelete: 'CASCADE' });
Analytics.belongsTo(User , { foreignKey: 'userId' });

TodoItem.hasMany(Analytics , { foreignKey: 'todoId'  , onDelete: 'CASCADE'});
Analytics.belongsTo(TodoItem , { foreignKey: 'todoId'});

User.hasMany(List, { foreignKey: 'userId', onDelete: 'CASCADE' });
List.belongsTo(User, { foreignKey: 'userId' });


List.hasMany(TodoItem, { foreignKey: 'listId', onDelete: 'SET NULL' });
TodoItem.belongsTo(List, { foreignKey: 'listId' });

List.belongsToMany(User, { through: Collaborator });
User.belongsToMany(List, { through: Collaborator });


// Sync models with database
(async () => {
  try {
    await sequelize.sync();
    console.log('Models synchronized with database.');
  } catch (error) {
    console.error('Error synchronizing models:', error);
  }
})();

export { User, TodoItem  , Analytics , List , Collaborator};
