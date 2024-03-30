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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.getUser = exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const profileModel_1 = __importDefault(require("../models/profileModel"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const userExists = yield profileModel_1.default.findOne({
        email
    });
    if (userExists) {
        res.status(201).json({ message: "User already exists" });
        return;
    }
    const usernameExists = yield profileModel_1.default.findOne({
        name
    });
    if (usernameExists) {
        res.status(202).json({ message: "Please choose a different username" });
        return;
    }
    try {
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedpwd = yield bcryptjs_1.default.hash(password, salt);
        yield profileModel_1.default.create({
            name,
            email,
            password: hashedpwd,
            pfpUrl: "",
            problemsSolved: 0,
        });
        res.status(200).json({ message: "User created successfully" });
    }
    catch (e) {
        res.status(500).json({ message: "error" });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(email, password);
    const user = yield profileModel_1.default.findOne({
        email
    });
    if (!user) {
        console.log("user not found");
        res.status(404).json({ message: "User not found" });
        return;
    }
    try {
        const valid = yield bcryptjs_1.default.compare(password, user.password);
        if (!valid) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        const tokenData = {
            email: user.email,
            id: user._id
        };
        const token = jsonwebtoken_1.default.sign(tokenData, process.env.JWT_SECRET);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({ message: "success" });
    }
    catch (e) {
        res.status(500).json({ message: "error" });
    }
});
exports.login = login;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies['jwt'];
        if (!token) {
            res.status(201).json({ message: "Unauthorized" });
            return;
        }
        const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = yield profileModel_1.default.findOne({
            email: verified.email,
        });
        if (!user) {
            res.status(201).json({ message: "Unauthorized" });
            return;
        }
        const info = {
            name: user.name,
            email: user.email,
            pfpUrl: user.pfpUrl,
            problemsSolved: user.problemsSolved
        };
        res.status(200).json({ info });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "error" });
    }
});
exports.getUser = getUser;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie('jwt');
        res.status(200).json({ message: "success" });
    }
    catch (e) {
        res.status(500).json({ message: "error" });
    }
});
exports.logout = logout;
