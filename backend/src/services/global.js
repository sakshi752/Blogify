import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary";

export const optionsObject = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"
}

export const uploadRequiredFiles = (file) => {
    // take the local path
    const localPath = file?.path

    if (!localPath) {
        throw new ApiError(400, "File is required")
    }

    // upload it to cloudinary
    const uploadedFile = await uploadOnCloudinary(localPath);

    if (!uploadedFile) {
        throw new ApiError(400, "Error while uploading file on cloudinary")
    }
    return uploadedFile
}

export const deleteOldFile = (file) => {
    const publicId = file?.publicId;

    // Delete old avatar from cloudinary
    if (publicId) {
        const deleteData = await deleteOnCloudinary(publicId)

        if (!deleteData) {
            throw new ApiError(400, "Error in deleting old avatar from cloudinary")
        }
    }
}