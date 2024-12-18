import express from "express";


import CollaboratorController
 from "../controllers/collaborator.controller.js";


import { isAuthenticated } from "../common/middlewares/auth.middleware.js";

const router = express.Router();


router.post("/", isAuthenticated, CollaboratorController.generate);
router.delete("/:listid", isAuthenticated, CollaboratorController.remove);
router.get("/:listid", isAuthenticated, CollaboratorController.get);

export default router;