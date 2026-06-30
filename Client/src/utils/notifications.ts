import Swal from "sweetalert2";

export async function successfullNotification(message: string) {
	await Swal.fire({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timerProgressBar: true,
		timer: 5000,
		title: message,
		icon: "success",
	});
}

export async function failedNotification(message: string) {
	await Swal.fire({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timerProgressBar: true,
		timer: 5000,
		title: message,
		icon: "error",
	});
}
