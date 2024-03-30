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
exports.getSingleProblem = exports.getProblems = exports.addProblem = void 0;
const problemModel_1 = __importDefault(require("../models/problemModel"));
const addProblem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, question, input, output, username } = req.body;
    const problemExists = yield problemModel_1.default.findOne({
        title
    });
    const questionExists = yield problemModel_1.default.findOne({
        question
    });
    if (problemExists || questionExists) {
        res.status(201).json({ message: "Problem already exists" });
        return;
    }
    try {
        const problemDoc = yield problemModel_1.default.create({
            name: username,
            title,
            description: question,
            input,
            output,
        });
        res.status(200).json({ message: "Question added successfully" });
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong" });
    }
});
exports.addProblem = addProblem;
const getProblems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const problems = yield problemModel_1.default.find({});
        res.status(200).json({ problems });
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong" });
    }
});
exports.getProblems = getProblems;
const getSingleProblem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const problem = yield problemModel_1.default.findById(id);
        res.status(200).json({ problem });
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong" });
    }
});
exports.getSingleProblem = getSingleProblem;
