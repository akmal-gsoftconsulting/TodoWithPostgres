import express from "express";

import TodoController
from "../controllers/analytics.controller.js" ;

import { isAuthenticated } from "../common/middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", isAuthenticated ,  TodoController.todoStats);
router.get("/date", isAuthenticated ,  TodoController.statsByDate);


export default router;