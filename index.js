import dotenv from "dotenv";
import express from "express";

import { User, TodoItem } from './src/common/models/index.js';
import authRoutes from './src/routes/auth.route.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());


app.use('/api/auth' , authRoutes );

app.get('/', (req, res) => {
  res.send('Welcome to the To-Do App!');
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

