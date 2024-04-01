import { Request, Response } from "express";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';
import ProfileModel from "../models/profileModel";

export const signup = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const userExists = await ProfileModel.findOne({
        email
    });
    if (userExists) {
        res.status(201).json({ message: "User already exists" });
        return;
    }
    const usernameExists = await ProfileModel.findOne({
        name
    });
    if (usernameExists) {
        res.status(202).json({ message: "Please choose a different username" });
        return;
    }
    try {
        const salt = await bcryptjs.genSalt(10)
        const hashedpwd = await bcryptjs.hash(password, salt)
        await ProfileModel.create({
            name,
            email,
            password: hashedpwd,
            pfpUrl: "",
            problemsSolved: 0,
        });
        res.status(200).json({ message: "User created successfully" });
    } catch (e: any) {
        res.status(500).json({ message: "error", er: e });
    }

}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await ProfileModel.findOne({
        email
    });
    if (!user) {
        console.log("user not found");
        res.status(404).json({ message: "User not found" });
        return;
    }
    try {
        const valid = await bcryptjs.compare(password, user.password);
        if (!valid) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        const tokenData = {
            email: user.email,
            id: user._id
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET!);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, secure: true, sameSite: 'none' });
        res.status(200).json({ message: "success" });
    } catch (e: any) {
        res.status(500).json({ message: "error" });
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const token = req.cookies['jwt'];
        if (!token) {
            res.status(201).json({ message: "Unauthorized" });
            return;
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
        const user = await ProfileModel.findOne({
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
        }
        res.status(200).json({ info });
    } catch (e: any) {
        console.log(e);
        res.status(500).json({ message: "error" });
    }
}


export const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie('jwt');
        res.status(200).json({ message: "success" });
    } catch (e: any) {
        res.status(500).json({ message: "error" });
    }
}