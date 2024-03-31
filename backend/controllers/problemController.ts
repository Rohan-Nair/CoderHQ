import { Request, Response } from "express";
import ProblemModel from "../models/problemModel";
import { LANGS } from "../constants/lang";
import axios from "axios";
import UserModel from "../models/userModel";
import SubmissionModel from "../models/submissionModel";

export const addProblem = async (req: Request, res: Response) => {
    const { title, question, input, output, username } = req.body;
    const problemExists = await ProblemModel.findOne({
        title
    });
    const questionExists = await ProblemModel.findOne({
        question
    });
    if (problemExists || questionExists) {
        res.status(201).json({ message: "Problem already exists" });
        return;
    }
    try {
        const problemDoc = await ProblemModel.create({
            name: username,
            title,
            description: question,
            input,
            output,
        });
        res.status(200).json({ message: "Question added successfully" });
    } catch (err) {
        res.status(400).json({ message: "Something went wrong" });
    }
}

export const getProblems = async (req: Request, res: Response) => {
    try {
        const problems = await ProblemModel.find({});
        res.status(200).json({ problems });
    } catch (err) {
        res.status(400).json({ message: "Something went wrong" });
    }
}

export const getSingleProblem = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const problem = await ProblemModel.findById(id);
        res.status(200).json({ problem });
    } catch (err) {
        res.status(400).json({ message: "Something went wrong" });
    }
}

export const runCode = async (req: Request, res: Response) => {
    console.log("runCode function")
    const { code, language, inp } = req.body;
    try {
        const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
            "language": language,
            "version": LANGS[language as keyof typeof LANGS],
            "files": [
                {
                    "content": code,
                }
            ],
            "stdin": inp ? inp : "",
        });
        return res.status(200).json(response.data);
    } catch (e) {
        console.log("piston call failed")
        console.log(e);
    }
}

export const submitCode = async (req: Request, res: Response) => {
    console.log("submitCode function");
    const { code, language, problemId, user } = req.body;
    const problem = await ProblemModel.findById(problemId);
    const userGet = await UserModel.findOne({ name: user.name });
    const { input, output } = problem;
    try {
        const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
            "language": language,
            "version": LANGS[language as keyof typeof LANGS],
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
        } else if (run.stderr) {
            message = "Runtime Error";
            res.status(200).json({ message: message, error: run.stderr });
        } else if (run.stdout === output) {
            message = "Correct Answer";
            res.status(200).json({ message: message });
        } else {
            message = "Wrong Answer";
            res.status(200).json({ message: message });
        }



        const newSubmission = {
            problemId: problemId,
            problemName: problem.title,
            userId: userGet.name,
            code: code,
            language: language,
            status: message,
        }
        await SubmissionModel.create(newSubmission);
        return res;

    } catch (e) {
        console.log("piston call failed")
        console.log(e);
    }
}