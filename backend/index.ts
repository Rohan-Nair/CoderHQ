import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs'
import UserModel from './models/userModel';
import { connect } from './dbConfig/dbConfig';
require('dotenv').config()


const app = express();
app.use(express.json());
app.use(cors());

connect();


app.post('/signup', async (req: Request, res: Response) => {
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
        console.log(hashedpwd)
        const userDoc = await UserModel.create({
            name,
            email,
            password: hashedpwd
        });
        res.status(200).json({ message: "User created successfully" });
    } catch (e: any) {
        res.status(500).json({ message: "error" });
    }

});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
