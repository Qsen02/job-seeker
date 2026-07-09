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
exports.companyRouter = void 0;
const express_1 = require("express");
const companies_1 = require("../services/companies");
const guard_1 = require("../middlewares/guard");
const express_validator_1 = require("express-validator");
const errorParser_1 = require("../utils/errorParser");
const cloudinary_1 = require("../config/cloudinary");
const users_1 = require("../services/users");
const companyRouter = (0, express_1.Router)();
exports.companyRouter = companyRouter;
companyRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companies = yield (0, companies_1.getAllCompanies)();
        res.json(companies);
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
companyRouter.get("/:companyId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companyId = req.params.companyId;
        const company = yield (0, companies_1.getCompanyById)(companyId);
        res.json(company);
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
companyRouter.get("/for-owner/:ownerId", (0, guard_1.isAdmin)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ownerId = req.params.ownerId;
        const isValid = yield (0, users_1.checkUserId)(ownerId);
        if (!isValid) {
            return res.status(404).json({ message: "Resource not found!" });
        }
        const companies = yield (0, companies_1.getAllCompaniesForOwner)(ownerId);
        res.json(companies);
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
companyRouter.post("/", (0, guard_1.isAdmin)(), (0, express_validator_1.body)("name")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 symbols long!"), (0, express_validator_1.body)("description")
    .notEmpty()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 symbols long!"), (0, express_validator_1.body)("location")
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("Location must be at least 5 symbols long!"), (0, express_validator_1.body)("logoPublicId").notEmpty().withMessage("Logo public id required!"), (0, express_validator_1.body)("logoUrl").notEmpty().withMessage("Logo url required!"), (0, express_validator_1.body)("phone")
    .isMobilePhone("bg-BG")
    .withMessage("Phone must be in valid format!"), (0, express_validator_1.body)("email").notEmpty().isEmail().withMessage("Email must be valid!"), (0, express_validator_1.body)("address")
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("Address must be at least 5 symbols long!"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = (0, express_validator_1.validationResult)(req);
        if (!results.isEmpty()) {
            throw new Error((0, errorParser_1.parseError)(results));
        }
        const user = req.user;
        const fields = req.body;
        const logo = {
            publicId: fields.logoPublicId,
            url: fields.logoUrl,
        };
        const newCompany = yield (0, companies_1.createCompany)(user, fields, logo);
        res.json(newCompany);
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
companyRouter.delete("/:companyId", (0, guard_1.isAdmin)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companyId = req.params.companyId;
        const isValid = yield (0, companies_1.checkCompanyId)(companyId);
        if (!isValid) {
            return res.status(404).json({ message: "Resource not found!" });
        }
        const curCompany = yield (0, companies_1.getCompanyById)(companyId);
        if (curCompany && curCompany.logo.publicId) {
            yield (0, cloudinary_1.deleteFromCloudinary)(curCompany.logo.publicId, "image");
        }
        yield (0, companies_1.deleteCompany)(companyId);
        res.json({ message: "Resource deleted successfully!" });
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
companyRouter.put("/:companyId", (0, guard_1.isAdmin)(), (0, express_validator_1.body)("name")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 symbols long!"), (0, express_validator_1.body)("description")
    .notEmpty()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 symbols long!"), (0, express_validator_1.body)("location")
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("Location must be at least 5 symbols long!"), (0, express_validator_1.body)("logoPublicId").optional(), (0, express_validator_1.body)("logoUrl").optional(), (0, express_validator_1.body)("phone")
    .isMobilePhone("bg-BG")
    .withMessage("Phone must be in valid format!"), (0, express_validator_1.body)("email").notEmpty().isEmail().withMessage("Email must be valid!"), (0, express_validator_1.body)("address")
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("Address must be at least 5 symbols long!"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companyId = req.params.companyId;
        const isValid = yield (0, companies_1.checkCompanyId)(companyId);
        if (!isValid) {
            return res.status(404).json({ message: "Resource not found!" });
        }
        const results = (0, express_validator_1.validationResult)(req);
        if (!results.isEmpty()) {
            throw new Error((0, errorParser_1.parseError)(results));
        }
        const fields = req.body;
        let logo = null;
        if (fields.logoPublicId && fields.logoUrl) {
            const curCompany = yield (0, companies_1.getCompanyById)(companyId);
            if (curCompany && curCompany.logo.publicId) {
                yield (0, cloudinary_1.deleteFromCloudinary)(curCompany.logo.publicId, "image");
            }
            logo = {
                publicId: fields.logoPublicId,
                url: fields.logoUrl,
            };
        }
        const curCompany = yield (0, companies_1.getCompanyById)(companyId);
        if (curCompany && curCompany.logo.publicId) {
            yield (0, cloudinary_1.deleteFromCloudinary)(curCompany.logo.publicId, "image");
        }
        const updateCompany = yield (0, companies_1.editCompany)(companyId, fields, logo);
        res.json(updateCompany);
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
