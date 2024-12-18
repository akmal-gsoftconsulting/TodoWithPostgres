import express from "express";

import { createTodo, getTodo, getTodoById, updateTodo, deleteTodo } 
from "../controllers/todoItems.controller.js";


import { isAuthenticated } from "../common/middlewares/auth.middleware.js";

const router = express.Router();


router.post("/", isAuthenticated, createTodo);
router.get("/", isAuthenticated, getTodo);
router.get("/:id", isAuthenticated, getTodoById);
router.put("/:id", isAuthenticated, updateTodo);
router.delete("/:id", isAuthenticated, deleteTodo);

export default router;