import { Sequelize } from 'sequelize';


// Database configuration

const sequelize = new Sequelize('todo_app', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, 
});

// Test database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default sequelize;

