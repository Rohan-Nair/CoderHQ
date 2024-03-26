import { NextFunction, Request, Response } from "express";
import fs from "fs";
import { uploadToCloudinary } from "../utils/fileupload";
import ProfileModel from "../models/profileModel";

interface requestincoming extends Request {
    file: any
}

// export const uploadController = (req: requestincoming, res: Response) => {
//     const file = req.file;
//     if (!file) {
//         res.status(400).json({ error: "No file uploaded" });
//         return;
//     }
//     console.log(file);


//     const { path, originalname } = file;
//     const parts = originalname.split('.');
//     const ext = parts[parts.length - 1];
//     const newPath = path + '.' + ext;
//     fs.renameSync(path, newPath);
//     const pfpFilePath = newPath.replace('uploads', '');



//     res.json({ pfp: pfpFilePath });
// }

export const uploadController = async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req);
    const localfilepath = req.file!.path;
    try {
        // upload to cloudinary here
        const pfpUrlCloudinary = await uploadToCloudinary(localfilepath);
        const checkifProfilePhotoexists = await ProfileModel.findOne({ email: req.body.udetails.email });
        if (checkifProfilePhotoexists) {
            await ProfileModel.findOneAndUpdate({ email: req.body.udetails.email }, { pfp: pfpUrlCloudinary });
        } else {
            await ProfileModel.create({
                email: req.body.udetails.email,
                pfp: pfpUrlCloudinary, 
                name: req.body.udetails.name, 
                problemsSolved: 0
            });
        }
        console.log("file uploaded successfully to cloudinary");
    } catch (e) {
        console.error(e); // Log the error
        fs.unlinkSync(localfilepath);
        return res.status(500).json({ error: "Something went wrong" });
    }
    res.json({ message: "Profile Image Updated" });
}