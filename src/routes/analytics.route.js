import express from "express";

import AnalyticsController
from "../controllers/analytics.controller.js" ;

import { isAuthenticated } from "../common/middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", isAuthenticated ,  AnalyticsController.todoStats);
router.get("/date", isAuthenticated ,  AnalyticsController.statsByDate);


export default router;