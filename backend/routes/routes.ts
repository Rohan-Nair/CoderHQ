const router = require('express').Router();
import { Request, Response } from "express";
import { getUser, login, logout, signup } from "../controllers/authController";
import { addProblem, getProblems } from "../controllers/problemController";
import { uploadController } from "../controllers/userController";
// import { upload } from "../middleware/multer.middleware";
// import multer from "multer";
import { upload } from "../middleware/multer.middleware";
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
// photos middleware 
// const photosMiddleware = multer({ dest: 'uploads/' });
// router.post('/upload', photosMiddleware.single('pfp'), uploadController);
router.post('/upload', upload.single('pfp'), uploadController);


// test routes
router.get('/', async (req: Request, res: Response) => res.send("running")) // this is a test route to be removed in production

export default router;