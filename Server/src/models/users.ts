import mongoose from "mongoose";
import { User } from "../types/users";

const userSchema = new mongoose.Schema<User>(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		fullName: { type: String, required: true },
		role: { type: String, enum: ["admin", "user"], default: "user" },
	},
	{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } },
);

const UserModel = mongoose.model<User>("Users", userSchema);

export default UserModel;
