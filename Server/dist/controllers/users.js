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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const errorParser_1 = require("../utils/errorParser");
const users_1 = require("../services/users");
const token_1 = require("../services/token");
const guard_1 = require("../middlewares/guard");
const cloudinary_1 = require("../config/cloudinary");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.get("/me", (req, res) => {
    var _a;
    const user = req.user;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    if (token) {
        res.json(user);
        return;
    }
    res.json(null);
});
userRouter.post("/register", (0, express_validator_1.body)("fullName")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Full name must be at least 3 symbols long!"), (0, express_validator_1.body)("email").trim().isEmail().withMessage("Email must be vaild!"), (0, express_validator_1.body)("password")
    .trim()
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/)
    .withMessage("Password must be at least 6 symbols long and must contain digits, captial letter and special symbol!"), (0, express_validator_1.body)("repass")
    .trim()
    .custom((value, { req }) => req.body.password === value)
    .withMessage("Password must match!"), (0, express_validator_1.body)("phoneNumber")
    .isMobilePhone("bg-BG")
    .withMessage("Phone number must be in valid format!"), (0, express_validator_1.body)("profileImagePubliId")
    .optional(), (0, express_validator_1.body)("profileImageUrl")
    .optional(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = (0, express_validator_1.validationResult)(req);
        if (!results.isEmpty()) {
            throw new Error((0, errorParser_1.parseError)(results));
        }
        const fields = req.body;
        let imageData = null;
        if (fields.profileImagePubliId && fields.profileImageUrl) {
            imageData = {
                publicId: fields.profileImagePubliId,
                url: fields.profileImageUrl,
            };
        }
        const newUser = yield (0, users_1.register)(fields.fullName, fields.email, fields.password, fields.phoneNumber, imageData);
        const token = (0, token_1.setToken)(newUser);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        res.status(200).json({
            _id: newUser._id,
            email: newUser.email,
            fullName: newUser.fullName,
            role: newUser.role,
            profileImage: newUser.profileImage,
            phoneNumber: newUser.phoneNumber
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ message: err.message });
        }
        else {
            res.status(500).json({ message: "Unknown error occurd!" });
        }
    }
}));
userRouter.post("/login", (0, express_validator_1.body)("email")
    .trim()
    .isEmail()
    .withMessage("Password or email don't match!"), (0, express_validator_1.body)("password")
    .trim()
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/)
    .withMessage("Password or email don't match!"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = (0, express_validator_1.validationResult)(req);
        if (!results.isEmpty()) {
            throw new Error((0, errorParser_1.parseError)(results));
        }
        const fields = req.body;
        const user = yield (0, users_1.login)(fields.email, fields.password);
        const token = (0, token_1.setToken)(user);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        res.status(200).json({
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
            profileImage: user.profileImage,
            phoneNumber: user.phoneNumber
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ message: err.message });
        }
        else {
            res.status(500).json({ message: "Unknown error occurd!" });
        }
    }
}));
userRouter.get("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout was successfull!" });
}));
userRouter.get("/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.userId;
        const isValid = yield (0, users_1.checkUserId)(userId);
        if (!isValid) {
            return res.status(400).json({ message: "User not found!" });
        }
        const user = yield (0, users_1.getUserById)(userId);
        res.json(user);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(404).json({ message: err.message });
        }
        else {
            res.status(500).json({ message: "Unknown error occurd!" });
        }
    }
}));
userRouter.put("/edit/:userId", (0, guard_1.isUser)(), (0, express_validator_1.body)("fullName")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Full name must be at least 3 symbols long!"), (0, express_validator_1.body)("email").trim().isEmail().withMessage("Email must be vaild!"), (0, express_validator_1.body)("phoneNumber")
    .isMobilePhone("bg-BG")
    .withMessage("Phone number must be in valid format!"), (0, express_validator_1.body)("profileImagePubliId")
    .optional(), (0, express_validator_1.body)("profileImageUrl")
    .optional(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.userId;
        const isValid = yield (0, users_1.checkUserId)(userId);
        if (!isValid) {
            return res.status(400).json({ message: "User not found!" });
        }
        const results = (0, express_validator_1.validationResult)(req);
        if (!results.isEmpty()) {
            throw new Error((0, errorParser_1.parseError)(results));
        }
        const fields = req.body;
        let imageData = null;
        if (fields.profileImagePubliId && fields.profileImageUrl) {
            const curUser = yield (0, users_1.getUserById)(userId);
            if (curUser && curUser.profileImage.publicId) {
                yield (0, cloudinary_1.deleteFromCloudinary)(curUser.profileImage.publicId, "image");
            }
            imageData = {
                publicId: fields.profileImagePubliId,
                url: fields.profileImageUrl,
            };
        }
        const updatedUser = yield (0, users_1.editUser)(userId, fields.fullName, fields.email, fields.phoneNumber, imageData);
        res.status(200).json(updatedUser);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ message: err.message });
        }
        else {
            res.status(500).json({ message: "Unknown error occurd!" });
        }
    }
}));
userRouter.put("/change-password/:userId", (0, guard_1.isUser)(), (0, express_validator_1.body)("password")
    .trim()
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/)
    .withMessage("Password or email don't match!"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.userId;
        const isValid = yield (0, users_1.checkUserId)(userId);
        if (!isValid) {
            return res.status(400).json({ message: "User not found!" });
        }
        const results = (0, express_validator_1.validationResult)(req);
        if (!results.isEmpty()) {
            throw new Error((0, errorParser_1.parseError)(results));
        }
        const fields = req.body;
        const updatedUser = yield (0, users_1.changePassword)(userId, fields.password);
        res.status(200).json(updatedUser);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ message: err.message });
        }
        else {
            res.status(500).json({ message: "Unknown error occurd!" });
        }
    }
}));
