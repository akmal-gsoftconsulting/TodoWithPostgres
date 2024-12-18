import express from "express";
import {getUser, updateUser  } from '../controllers/user.controller.js';
import { isAuthenticated } from "../common/middlewares/auth.middleware.js";

const router = express.Router();

router.get("/profile", isAuthenticated ,getUser);
router.put("/profile", isAuthenticated ,updateUser);


export default router;