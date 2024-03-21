import { Request, Response } from "express";
import UserModel from "../models/userModel";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const userExists = await UserModel.findOne({
        email
    });
    if (userExists) {
        res.status(201).json({ message: "User already exists" });
        return;
    }
    try {
        const salt = await bcryptjs.genSalt(10)
        const hashedpwd = await bcryptjs.hash(password, salt)
        const userDoc = await UserModel.create({
            name,
            email,
            password: hashedpwd
        });
        res.status(200).json({ message: "User created successfully" });
    } catch (e: any) {
        res.status(500).json({ message: "error" });
    }

}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({
        email
    });
    if (!user) {
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
        res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
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
        const user = await UserModel.findOne({
            email: verified.email,
        });
        const info = {
            name: user.name,
            email: user.email
        }
        res.status(200).json({ info });
    } catch (e: any) {
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