import { Request, Response } from "express";
import SubmissionModel from "../models/submissionModel"

export const getSubmissions = async (req: Request, res: Response) => {
    const { user } = req.body;
    try {
        const submissions = await SubmissionModel.find({ userId: user.name });
        const sendData = submissions.map((submission) => ({
            problemName: submission.problemName,
            status: submission.status,
            language: submission.language,
            id: submission.timeSubmitted,
        }));

        return res.status(200).json({ submissions: sendData });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "internal" });
    }
}

export const getCurrentSubmission = async (req: Request, res: Response) => {
    const { id } = req.body;
    console.log(id);
    try {
        const submission = await SubmissionModel.findOne({ timeSubmitted: id });
        return res.status(200).json({ submission });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "internal" });
    }
}