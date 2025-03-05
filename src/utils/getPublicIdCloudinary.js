function getCloudinaryPublicId(url) {
    try {
      // Split the URL into parts
      const parts = url.split("/");
  
      // Find the index of "upload", which comes before the public ID
      const uploadIndex = parts.indexOf("upload");
      if (uploadIndex === -1) throw new Error("Invalid Cloudinary URL");
  
      // Extract everything after "upload/", ignoring the version
      let publicIdWithVersion = parts.slice(uploadIndex + 1).join("/");
  
      // Remove versioning (e.g., v1741118111/)
      publicIdWithVersion = publicIdWithVersion.replace(/^v\d+\//, "");
  
      // Remove file extension (.jpg, .png, etc.)
      const publicId = publicIdWithVersion.replace(/\.[^/.]+$/, "");
  
      return publicId;
    } catch (error) {
      console.error("Error extracting public ID:", error.message);
      return null;
    }
  }

  
  export {getCloudinaryPublicId}