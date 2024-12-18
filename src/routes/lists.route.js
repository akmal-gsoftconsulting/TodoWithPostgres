import express from "express";

import ListController from "../controllers/lists.controller.js";
import { isAuthenticated } from "../common/middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", isAuthenticated, ListController.create);
router.get("/", isAuthenticated, ListController.getAll);
router.get("/:id", isAuthenticated, ListController.getOne);
router.put("/:id", isAuthenticated, ListController.update);
router.delete("/:id", isAuthenticated, ListController.deleteOne);

export default router;