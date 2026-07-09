"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setToken = setToken;
exports.verifyToken = verifyToken;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function setToken(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role
    };
    const token = jsonwebtoken_1.default.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1d" });
    return token;
}
function verifyToken(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        return decoded;
    }
    catch (error) {
        return null;
    }
}
