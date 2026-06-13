import type { FileType } from "./companies";

export interface User {
	_id: string;
	email: string;
	password: string;
	fullName: string;
	role: "admin" | "user";
	profileImage: FileType;
	phoneNumber: string;
}

export interface UserAttributes {
	id: string;
	email: string;
	fullName: string;
	role: "admin" | "user";
	profileImage: FileType;
	phoneNumber: string;
}
