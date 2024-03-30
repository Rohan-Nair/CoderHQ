"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require('express').Router();
const authController_1 = require("../controllers/authController");
const problemController_1 = require("../controllers/problemController");
const userController_1 = require("../controllers/userController");
// import { upload } from "../middleware/multer.middleware";
// import multer from "multer";
const multer_middleware_1 = require("../middleware/multer.middleware");
require('dotenv').config();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return res.json; })); // this is a test route to be removed in production
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
// test routes
exports.default = router;
