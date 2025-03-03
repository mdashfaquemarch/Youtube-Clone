import {v2 as cloudinary} from 'cloudinary';
import { config } from '../config/server-config.js';
import fs from 'fs'

const uploadOnCloudinary = async (localFilePath) => {
    try {
        cloudinary.config(
            {
                cloud_name: config.CLOUDINARY_CLOUD_NAME,
                api_key:  config.CLOUDINARY_API_KEY,
                api_secret: config.CLOUDINARY_API_SECRET
            }
        )

        if (!localFilePath) return null;

        const uploadResult = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        console.log(`🌨️ 🌤️ file uploaded successfully on cloudinary 🌧️ 🌧️ : `, uploadResult);
        fs.unlinkSync(localFilePath);

        return uploadResult;

    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null;
    }
}


const deleteFromCloudinary = async (publicId) => {
    try {
        
    } catch (error) {
        throw new Error("Error while deleting file from Cloudinary");
    }
}


export {
    uploadOnCloudinary,
    deleteFromCloudinary
}