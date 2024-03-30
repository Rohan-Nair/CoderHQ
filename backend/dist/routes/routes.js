"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require('express').Router();
const authController_1 = require("../controllers/authController");
const problemController_1 = require("../controllers/problemController");
const userController_1 = require("../controllers/userController");
// import { upload } from "../middleware/multer.middleware";
// import multer from "multer";
const multer_middleware_1 = require("../middleware/multer.middleware");
require('dotenv').config();
// test route to be removed in production
router.get('/test', (req, res) => {
    res.send('Hello yadav ji');
});
// auth routes
router.post('/signup', authController_1.signup);
router.post('/login', authController_1.login);
router.get('/user', authController_1.getUser);
router.post('/logout', authController_1.logout);
// problem routes
router.post('/add', problemController_1.addProblem);
router.get('/problems', problemController_1.getProblems);
router.get('/problems/:id', problemController_1.getSingleProblem);
// user pfp route 
// photos middleware 
// const photosMiddleware = multer({ dest: 'uploads/' });
// router.post('/upload', photosMiddleware.single('pfp'), uploadController);
router.post('/upload', multer_middleware_1.upload.single('pfp'), userController_1.uploadController);
exports.default = router;
