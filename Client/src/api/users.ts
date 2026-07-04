import type { User, UserAttributes } from "../types/users";
import { get, post, put } from "./requester";

const endpoint = "users";

export async function getUserById(userId: string | undefined) { 
    const user = await get(`${endpoint}/${userId}`);
    return user as User; 
}

export async function checkUser() { 
	const isUser = await get(`${endpoint}/me`);
	return isUser as UserAttributes | null;
}

export async function register(data: object) { 
    const user = await post(`${endpoint}/register`, data);
    return user as UserAttributes;
}

export async function login(data: object) {
	const user = await post(`${endpoint}/login`, data);
	return user as UserAttributes;
}

export async function logout() {
	await get(`${endpoint}/logout`);
}

export async function editUser(userId:string | undefined,data: object) {
	const user = await put(`${endpoint}/edit/${userId}`, data);
	return user as User;
}

export async function changePassword(userId: string, data: object) {
	const user = await put(`${endpoint}/change-password/${userId}`, data);
	return user as User;
}
