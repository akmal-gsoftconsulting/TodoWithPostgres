import express from "express";

import NotificationController
from "../controllers/notification.controller.js ";

import { isAuthenticated } from "../common/middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", isAuthenticated, NotificationController.fetchUnreadNotifications);
router.put("/:id", isAuthenticated, NotificationController.markNotificationAsRead);
router.delete("/:id", isAuthenticated, NotificationController.removeNotification);
router.post("/", isAuthenticated, NotificationController.createNotification);

export default router;