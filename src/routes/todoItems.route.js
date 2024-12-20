import express from "express";

import { createTodo, getTodo, getTodoById, updateTodo, deleteTodo  , getTodoForFilters} 
from "../controllers/todoItems.controller.js";


import { TodoItem  } from '../common/models/index.js';
import { applyQuery } from "../common/components/pagination-filter.js";


import { isAuthenticated } from "../common/middlewares/auth.middleware.js";

const router = express.Router();


router.post("/", isAuthenticated, createTodo);
router.get("/", isAuthenticated, applyQuery(TodoItem), getTodoForFilters);
router.get("/:id", isAuthenticated, getTodoById);
router.put("/:id", isAuthenticated, updateTodo);
router.delete("/:id", isAuthenticated, deleteTodo);

export default router;