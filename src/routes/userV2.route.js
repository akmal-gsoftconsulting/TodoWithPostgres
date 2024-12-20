import express from "express";
import { getUserForPassport  } from '../controllers/user.controller.js';
import passport from 'passport';

const isPassAuthenticated = passport.authenticate('jwt', { session: false });

const router = express.Router();

router.get("/profile", isPassAuthenticated ,getUserForPassport);


export default router;