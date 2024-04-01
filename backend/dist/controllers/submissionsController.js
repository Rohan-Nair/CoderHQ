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
exports.getCurrentSubmission = exports.getSubmissions = void 0;
const submissionModel_1 = __importDefault(require("../models/submissionModel"));
const getSubmissions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.body;
    try {
        const submissions = yield submissionModel_1.default.find({ userId: user.name });
        const sendData = submissions.map((submission) => ({
            problemName: submission.problemName,
            status: submission.status,
            language: submission.language,
            id: submission.timeSubmitted,
        }));
        return res.status(200).json({ submissions: sendData });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "internal" });
    }
});
exports.getSubmissions = getSubmissions;
const getCurrentSubmission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const submission = yield submissionModel_1.default.findOne({ timeSubmitted: id });
        return res.status(200).json({ submission });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "internal" });
    }
});
exports.getCurrentSubmission = getCurrentSubmission;
