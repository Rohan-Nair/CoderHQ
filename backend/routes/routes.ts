const router = require('express').Router();
import { Request, Response } from "express";
import { getUser, login, logout, signup } from "../controllers/authController";
require('dotenv').config()

router.post('/signup', signup);

router.post('/login', login);

router.get('/user', getUser);

router.post('/logout', logout);

router.get('/', async (req: Request, res: Response) => res.send("running")) // this is a test route to be removed in production

export default router;