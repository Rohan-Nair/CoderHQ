const router = require('express').Router();
import { Request, Response } from "express";
import { getUser, login, logout, signup } from "../controllers/authController";
import { addProblem, getProblems, getSingleProblem, runCode, submitCode } from "../controllers/problemController";
import { uploadController } from "../controllers/userController";
// import { upload } from "../middleware/multer.middleware";
// import multer from "multer";
import { upload } from "../middleware/multer.middleware";
import { getSubmissions } from "../controllers/submissionsController";
require('dotenv').config()

// test route to be removed in production
router.get('/test', (req: Request, res: Response) => {
    res.send('Hello yadav ji');
});

// auth routes
router.post('/signup', signup);

router.post('/login', login);

router.get('/user', getUser);

router.post('/logout', logout);

// problem routes
router.post('/add', addProblem);

router.get('/problems', getProblems);

router.get('/problems/:id', getSingleProblem);

router.post('/run', runCode);

// submissions routes 
router.post('/submit', submitCode);

router.get('/submissions', getSubmissions);

// user pfp route 
// photos middleware 
// const photosMiddleware = multer({ dest: 'uploads/' });
// router.post('/upload', photosMiddleware.single('pfp'), uploadController);
router.post('/upload', upload.single('pfp'), uploadController);

export default router;