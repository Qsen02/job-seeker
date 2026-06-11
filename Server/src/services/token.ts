import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User, UserAttributes } from "../types/users";

export function setToken(user: User) {
    const payload = {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role
    }

    const token = jwt.sign(payload, process.env.TOKEN_SECRET!, { expiresIn: "1d" });
    return token;
}

export function verifyToken(token: string) {
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decoded as UserAttributes;
    } catch (error) {
        return null;
    }
}