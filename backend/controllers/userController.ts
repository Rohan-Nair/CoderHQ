import { Request, Response } from "express";
import fs from "fs";

interface requestincoming extends Request {
    file: any
}

export const upload = (req: requestincoming, res: Response) => {
    const file = req.file;
    if (!file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
    }
    console.log(file);

    const { path, originalname } = file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    const pfpFilePath = newPath.replace('uploads', '');



    res.json({ pfp: pfpFilePath });
}