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
exports.submitCode = exports.runCode = exports.getSingleProblem = exports.getProblems = exports.addProblem = void 0;
const problemModel_1 = __importDefault(require("../models/problemModel"));
const lang_1 = require("../constants/lang");
const axios_1 = __importDefault(require("axios"));
const submissionModel_1 = __importDefault(require("../models/submissionModel"));
const profileModel_1 = __importDefault(require("../models/profileModel"));
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
const runCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("runCode function");
    const { code, language, inp } = req.body;
    try {
        const response = yield axios_1.default.post("https://emkc.org/api/v2/piston/execute", {
            "language": language,
            "version": lang_1.LANGS[language],
            "files": [
                {
                    "content": code,
                }
            ],
            "stdin": inp ? inp : "",
        });
        return res.status(200).json(response.data);
    }
    catch (e) {
        console.log("piston call failed");
        console.log(e);
    }
});
exports.runCode = runCode;
const updateCountifNeeded = (user, problem) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("updateCountifNeeded function");
    console.log(user);
    console.log(problem);
    const correctSubmissions = yield submissionModel_1.default.find({ userId: user.name, problemId: problem._id, status: "Correct Answer" });
    if (correctSubmissions.length === 0) {
        yield profileModel_1.default.updateOne({ name: user.name }, { $inc: { problemsSolved: 1 } });
    }
    return;
});
const submitCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("submitCode function");
    const { code, language, problemId, user } = req.body;
    const problem = yield problemModel_1.default.findById(problemId);
    const userGet = yield profileModel_1.default.findOne({ name: user.name });
    const { input, output } = problem;
    try {
        const response = yield axios_1.default.post("https://emkc.org/api/v2/piston/execute", {
            "language": language,
            "version": lang_1.LANGS[language],
            "files": [
                {
                    "content": code,
                }
            ],
            "stdin": input,
        });
        const { run, compile } = response.data;
        let message = "";
        if (compile.stderr) {
            message = "Compilation Error";
            res.status(200).json({ message: message, error: compile.stderr });
        }
        else if (run.stderr) {
            message = "Runtime Error";
            res.status(200).json({ message: message, error: run.stderr });
        }
        else if (run.stdout === output) {
            message = "Correct Answer";
            res.status(200).json({ message: message });
            yield updateCountifNeeded(userGet, problem);
        }
        else {
            message = "Wrong Answer";
            res.status(200).json({ message: message });
        }
        const newTime = new Date().getTime().toString();
        const newSubmission = {
            problemId: problemId,
            problemName: problem.title,
            userId: userGet.name,
            code: code,
            language: language,
            status: message,
            timeSubmitted: newTime,
        };
        yield submissionModel_1.default.create(newSubmission);
        return res;
    }
    catch (e) {
        console.log("piston call failed");
        console.log(e);
    }
});
exports.submitCode = submitCode;
