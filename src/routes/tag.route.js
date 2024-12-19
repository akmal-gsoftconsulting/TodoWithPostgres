import express from "express";

import TagController
from "../controllers/tag.controller.js";

import { isAuthenticated } from "../common/middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", isAuthenticated ,TagController.createTag);
router.get("/", isAuthenticated , TagController.getTags);
router.put("/:id", isAuthenticated , TagController.updateTag);
router.delete("/:id", isAuthenticated , TagController.deleteOrUpdate);


export default router;