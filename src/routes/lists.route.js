import express from "express";

import ListController from "../controllers/lists.controller.js";
import { isAuthenticated } from "../common/middlewares/auth.middleware.js";

import { List } from "../common/models/index.js";
import { applyQuery } from "../common/components/pagination-filter.js";

const router = express.Router();

router.post("/", isAuthenticated, ListController.create);
router.get("/", isAuthenticated, applyQuery(List) , ListController.getForFilter);
router.get("/:id", isAuthenticated, ListController.getOne);
router.put("/:id", isAuthenticated, ListController.update);
router.delete("/:id", isAuthenticated, ListController.deleteOne);

export default router;