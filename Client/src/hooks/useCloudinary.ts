import { uploadProfileImage } from "../api/cloudinary"

export function useUploadProfileImage() { 
    return async function (file:File) { 
        return await uploadProfileImage(file);
    }
}