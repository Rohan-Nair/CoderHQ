const router = require('express').Router();
import { Request, Response } from "express";
import { getUser, login, logout, signup } from "../controllers/authController";
import { addProblem, getProblems } from "../controllers/problemController";
import { upload } from "../controllers/userController";
require('dotenv').config()

// auth routes
router.post('/signup', signup);

router.post('/login', login);

router.get('/user', getUser);

router.post('/logout', logout);

// problem routes
router.post('/add', addProblem);

router.get('/problems', getProblems);

// user pfp route 
router.post('/upload', upload);

// test routes
router.get('/', async (req: Request, res: Response) => res.send("running")) // this is a test route to be removed in production

export default router;