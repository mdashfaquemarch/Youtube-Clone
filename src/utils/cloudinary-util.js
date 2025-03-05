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


// Function to delete an image from Cloudinary using publicId
const deleteFromCloudinary = async (publicId) => {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      console.log("Delete Result:", result);
      return result;
    } catch (error) {
      console.error("Error deleting image:", error);
      return { error: error.message };
    }
  };


export {
    uploadOnCloudinary,
    deleteFromCloudinary
}