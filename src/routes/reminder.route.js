import express from "express";


import ReminderController from "../controllers/reminder.controller.js";

import { isAuthenticated } from "../common/middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", isAuthenticated ,ReminderController.setReminder);
router.get("/", isAuthenticated , ReminderController.fetchActiveReminders); 
router.delete("/:id", isAuthenticated , ReminderController.deleteReminder);


export default router;