import UserModel from "../models/users";
import bcrypt from "bcrypt";
import { FileType } from "../types/companies";
import { User } from "../types/users";

export async function register(
	fullname: string,
	email: string,
	password: string,
	phoneNumber: string,
	profileImage: FileType | null,
) {
	const isEmailExist = await UserModel.findOne({ email });
	if (isEmailExist) {
		throw new Error("User with this email already exists");
	}
	const user = new UserModel({
		fullName: fullname,
		email: email,
		password: await bcrypt.hash(password, 10),
		phoneNumber: phoneNumber,
		profileImage: !profileImage
			? {
					publicId: "",
					url: "",
				}
			: profileImage,
	});
	await user.save();
	return user;
}

export async function login(email: string, password: string) {
	const user = await UserModel.findOne({ email }).lean();
	if (!user) {
		throw new Error("Email or password not match!");
	}
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw new Error("Email or password not match!");
	}
	return user;
}

export async function getUserById(id: string) {
	const user = await UserModel.findById(id).lean();
	if (!user) {
		throw new Error("User not found!");
	}
	return user;
}

export async function checkUserId(id: string) {
	const user = await UserModel.findById(id).lean();
	if (user) {
		return true;
	}
	return false;
}

export async function editUser(
	id: string,
	fullname: string,
	email: string,
	phoneNumber: string,
	profileImage: FileType | null,
) {
	const updateData: Partial<User> = {
		fullName: fullname,
		email: email,
		phoneNumber: phoneNumber,
	};
	if (profileImage) { 
		updateData.profileImage = profileImage;
	}

	const updatedUser = await UserModel.findByIdAndUpdate(
		id,
		{
			$set: updateData,
		},
		{ returnDocument: "after" },
	).lean();

	return updatedUser;
}

export async function changePassword(id: string, newPassword: string) {
	const user = await UserModel.findById(id);
	if (!user) {
		throw new Error("User not found!");
	}
	const isOldPasswordMatch = await bcrypt.compare(newPassword, user.password);
	if (isOldPasswordMatch) {
		throw new Error("Password can not be the same as the old one!");
	}
	const hashedPassword = await bcrypt.hash(newPassword, 10);
	const updatedUser = await UserModel.findByIdAndUpdate(
		id,
		{
			$set: {
				password: hashedPassword,
			},
		},
		{ returnDocument: "after" },
	).lean();
	return updatedUser;
}
