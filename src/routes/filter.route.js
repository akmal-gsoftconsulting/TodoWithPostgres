import express from "express";


import TodoController
from "../controllers/filter.controller.js";


import { isAuthenticated } from "../common/middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", isAuthenticated, TodoController.filterTodoItems);

export default router;