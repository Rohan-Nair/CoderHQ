import { Request, Response } from "express";
import ProblemModel from "../models/problemModel";

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

