import { Types } from "mongoose";

export interface User {
    _id: Types.ObjectId;
    email: string;
    password: string;
    fullName: string;
    role: "admin" | "user";
}

export interface UserAttributes {
    _id: string;
    email: string;
    fullName: string;
    role: "admin" | "user";
    accessToken: string;
}