import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import passport from "passport";

import passportStrategy from './src/common/middlewares/authPassport.middleware.js'

import userV2Routes from './src/routes/userV2.route.js';

import authRoutes from './src/routes/auth.route.js';
import userRoutes from './src/routes/user.route.js';
import todoItemsRoutes from './src/routes/todoItems.route.js';
import listsRoutes from './src/routes/lists.route.js';
import collaboratorRoutes from './src/routes/collaborator.route.js';
import notificationRoutes from './src/routes/notification.route.js';
import reminderRoutes from './src/routes/reminder.route.js';
import tagRoutes from './src/routes/tag.route.js';
import filterRoutes from './src/routes/filter.route.js';
import analyticsRoutes from './src/routes/analytics.route.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use(bodyParser.json());
app.use(passport.initialize());
passportStrategy(passport);


app.use('/api/v2/user' , userV2Routes );

app.use('/api/auth' , authRoutes );
app.use('/api/user' , userRoutes );
app.use('/api/todoItems' , todoItemsRoutes );
app.use('/api/lists' , listsRoutes );
app.use('/api/collaborators' , collaboratorRoutes );
app.use('/api/notifications' , notificationRoutes );
app.use('/api/reminders' , reminderRoutes );
app.use('/api/tags' , tagRoutes );
app.use('/api/filter' , filterRoutes );
app.use('/api/analytics' , analyticsRoutes );

app.use('/', (req, res) => {
  res.send('Welcome to the To-Do App!');
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

