"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
exports.getUserById = getUserById;
exports.checkUserId = checkUserId;
exports.editUser = editUser;
exports.changePassword = changePassword;
const users_1 = __importDefault(require("../models/users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function register(fullname, email, password, phoneNumber, profileImage) {
    return __awaiter(this, void 0, void 0, function* () {
        const isEmailExist = yield users_1.default.findOne({ email });
        if (isEmailExist) {
            throw new Error("User with this email already exists");
        }
        const user = new users_1.default({
            fullName: fullname,
            email: email,
            password: yield bcrypt_1.default.hash(password, 10),
            phoneNumber: phoneNumber,
            profileImage: !profileImage
                ? {
                    publicId: "",
                    url: "",
                }
                : profileImage,
        });
        yield user.save();
        return user;
    });
}
function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield users_1.default.findOne({ email }).lean();
        if (!user) {
            throw new Error("Email or password not match!");
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Email or password not match!");
        }
        return user;
    });
}
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield users_1.default.findById(id).lean();
        if (!user) {
            throw new Error("User not found!");
        }
        return user;
    });
}
function checkUserId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield users_1.default.findById(id).lean();
        if (user) {
            return true;
        }
        return false;
    });
}
function editUser(id, fullname, email, phoneNumber, profileImage) {
    return __awaiter(this, void 0, void 0, function* () {
        const updateData = {
            fullName: fullname,
            email: email,
            phoneNumber: phoneNumber,
        };
        if (profileImage) {
            updateData.profileImage = profileImage;
        }
        const updatedUser = yield users_1.default.findByIdAndUpdate(id, {
            $set: updateData,
        }, { returnDocument: "after" }).lean();
        return updatedUser;
    });
}
function changePassword(id, newPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield users_1.default.findById(id);
        if (!user) {
            throw new Error("User not found!");
        }
        const isOldPasswordMatch = yield bcrypt_1.default.compare(newPassword, user.password);
        if (isOldPasswordMatch) {
            throw new Error("Password can not be the same as the old one!");
        }
        const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
        const updatedUser = yield users_1.default.findByIdAndUpdate(id, {
            $set: {
                password: hashedPassword,
            },
        }, { returnDocument: "after" }).lean();
        return updatedUser;
    });
}
