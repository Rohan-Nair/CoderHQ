import { v2 as cloudinary } from "cloudinary"
import { NextFunction, Request, Response } from "express"
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const uploadToCloudinary = async (localfilepath: string) => {
    try {
        if (!localfilepath) {
            return null
        }
        const response = await cloudinary.uploader.upload(localfilepath, {
            resource_type: "auto",
        })
        console.log("file uploaded successfully to cloduinary")
        console.log(response);
        return response.secure_url;
    } catch (e) {
        fs.unlinkSync(localfilepath);
        console.error(e); // Log the error
    }
}

