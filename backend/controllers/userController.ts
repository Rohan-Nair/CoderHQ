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
    const udetails = JSON.parse(req.body.udetails);
    const localfilepath = req.file!.path;
    try {
        const checkifProfilePhotoexists = await ProfileModel.findOne({ email: udetails.email });
        if (checkifProfilePhotoexists) {
            // upload to cloudinary here
            const pfpUrlCloudinary = await uploadToCloudinary(localfilepath);
            await ProfileModel.findOneAndUpdate({ email: udetails.email }, { pfpUrl: pfpUrlCloudinary });
            const updatedProfile = await ProfileModel.findOne({ email: udetails.email });
            const updatedProfileData = {
                name: updatedProfile.name,
                email: updatedProfile.email,
                pfpUrl: updatedProfile.pfpUrl
            }
            res.status(200).json({ updatedProfileData });
        } else {
            res.status(401).json({ error: "Couldn't find the user" });
            return;
        }
    } catch (e) {
        console.error(e); // Log the error
        return res.status(500).json({ error: "Something went wrong" });
    } finally {
        fs.unlinkSync(localfilepath);
    }
}