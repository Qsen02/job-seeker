"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    profileImage: {
        publicId: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    phoneNumber: {
        type: String,
        required: true,
    },
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
const UserModel = mongoose_1.default.model("Users", userSchema);
exports.default = UserModel;
