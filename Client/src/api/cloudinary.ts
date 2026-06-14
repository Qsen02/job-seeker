async function request(data: FormData, type: "image" | "raw") {
	const response = await fetch(
		`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/${type}/upload`,
		{
			method: "POST",
			body: data,
		},
	);
	return response.json();
}

export async function uploadProfileImage(file: File) {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("upload_preset", "job-profile-images-upload");
	const data = await request(formData, "image");
	return data;
}

export async function uploadCV(file: File) {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("upload_preset", "cvs-upload");
	const data = await request(formData, "raw");
	return data;
}

export async function uploadLogo(file: File) {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("upload_preset", "logos-upload");
	const data = await request(formData, "image");
	return data;
}