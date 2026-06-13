import { Types } from "mongoose";
import { FileType } from "./companies";

export interface User {
    _id: Types.ObjectId;
    email: string;
    password: string;
    fullName: string;
    role: "admin" | "user";
    profileImage: FileType;
    phoneNumber: string;
}

export interface UserAttributes {
	_id: string;
	email: string;
	fullName: string;
	role: "admin" | "user";
	profileImage: FileType;
	phoneNumber: string;
}