import { uploadLogo, uploadProfileImage } from "../api/cloudinary";

export function useUploadProfileImage() {
	return async function (file: File) {
		return await uploadProfileImage(file);
	};
}

export function useUploadLogo() {
	return async function (file: File) {
		return await uploadLogo(file);
	};
}