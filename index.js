import dotenv from "dotenv";
import express from "express";

import { User, TodoItem } from './src/common/models/index.js';

import authRoutes from './src/routes/auth.route.js';
import userRoutes from './src/routes/user.route.js';
import todoItemsRoutes from './src/routes/todoItems.route.js';
import listsRoutes from './src/routes/lists.route.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());


app.use('/api/auth' , authRoutes );
app.use('/api/user' , userRoutes );
app.use('/api/todoItems' , todoItemsRoutes );
app.use('/api/lists' , listsRoutes );

app.use('/', (req, res) => {
  res.send('Welcome to the To-Do App!');
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

