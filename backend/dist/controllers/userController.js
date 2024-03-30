"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadController = void 0;
const fs_1 = __importDefault(require("fs"));
const fileupload_1 = require("../utils/fileupload");
const profileModel_1 = __importDefault(require("../models/profileModel"));
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
const uploadController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const udetails = JSON.parse(req.body.udetails);
    const localfilepath = req.file.path;
    try {
        const checkifProfilePhotoexists = yield profileModel_1.default.findOne({ email: udetails.email });
        if (checkifProfilePhotoexists) {
            // upload to cloudinary here
            const pfpUrlCloudinary = yield (0, fileupload_1.uploadToCloudinary)(localfilepath);
            yield profileModel_1.default.findOneAndUpdate({ email: udetails.email }, { pfpUrl: pfpUrlCloudinary });
            const updatedProfile = yield profileModel_1.default.findOne({ email: udetails.email });
            const updatedProfileData = {
                name: updatedProfile.name,
                email: updatedProfile.email,
                pfpUrl: updatedProfile.pfpUrl
            };
            res.status(200).json({ updatedProfileData });
        }
        else {
            res.status(401).json({ error: "Couldn't find the user" });
            return;
        }
    }
    catch (e) {
        console.error(e); // Log the error
        return res.status(500).json({ error: "Something went wrong" });
    }
    finally {
        fs_1.default.unlinkSync(localfilepath);
    }
});
exports.uploadController = uploadController;
