import express from "express";
import {getUser, updateUser  } from '../controllers/user.controller.js';
import passport from 'passport';

const isPassAuthenticated = passport.authenticate('jwt', { session: false });

const router = express.Router();

router.get("/profile", isPassAuthenticated ,getUser);
router.put("/profile", isPassAuthenticated ,updateUser);

export default router;