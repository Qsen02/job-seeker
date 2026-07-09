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
exports.candidaturesRouter = void 0;
const express_1 = require("express");
const jobs_1 = require("../services/jobs");
const candidatures_1 = require("../services/candidatures");
const users_1 = require("../services/users");
const express_validator_1 = require("express-validator");
const errorParser_1 = require("../utils/errorParser");
const cloudinary_1 = require("../config/cloudinary");
const guard_1 = require("../middlewares/guard");
const candidaturesRouter = (0, express_1.Router)();
exports.candidaturesRouter = candidaturesRouter;
candidaturesRouter.get("/in-job/:jobId", (0, guard_1.isUser)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobId = req.params.jobId;
        const isValid = yield (0, jobs_1.checkJobId)(jobId);
        if (!isValid) {
            return res.status(404).json({ message: "Resource not found!" });
        }
        const candidatures = yield (0, candidatures_1.getAllCandidaturesForJob)(jobId);
        res.json(candidatures);
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
candidaturesRouter.get("/for-user/:userId", (0, guard_1.isUser)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const isValid = yield (0, users_1.checkUserId)(userId);
        if (!isValid) {
            return res.status(404).json({ message: "Resource not found!" });
        }
        const candidatures = yield (0, candidatures_1.getAllCandidaturesForUser)(userId);
        res.json(candidatures);
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
candidaturesRouter.get("/:candidatureId", (0, guard_1.isUser)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candidatureId = req.params.candidatureId;
        const candidature = yield (0, candidatures_1.getCandidatureById)(candidatureId);
        res.json(candidature);
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
candidaturesRouter.post("/in-job/:jobId", (0, guard_1.isUser)(), (0, express_validator_1.body)("link").optional(), (0, express_validator_1.body)("description")
    .notEmpty()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 symbols long!"), (0, express_validator_1.body)("cvPublicId").notEmpty().withMessage("CV public id required!"), (0, express_validator_1.body)("cvUrl").notEmpty().withMessage("CV url required!"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const jobId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.jobId;
        const isValid = yield (0, jobs_1.checkJobId)(jobId);
        if (!isValid) {
            return res.status(404).json({ message: "Resource not found!" });
        }
        const results = (0, express_validator_1.validationResult)(req);
        if (!results.isEmpty()) {
            throw new Error((0, errorParser_1.parseError)(results));
        }
        const fields = req.body;
        const user = req.user;
        const cv = {
            publicId: fields.cvPublicId,
            url: fields.cvUrl,
        };
        const updatedJob = yield (0, candidatures_1.createCandidature)(user, jobId, fields, cv);
        res.json(updatedJob);
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
candidaturesRouter.delete("/:candidatureId/in-job/:jobId", (0, guard_1.isUser)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candidatureId = req.params.candidatureId;
        const jobId = req.params.jobId;
        const isValidCandidature = yield (0, candidatures_1.checkCandidatureId)(candidatureId);
        const isValidJob = yield (0, jobs_1.checkJobId)(jobId);
        if (!isValidCandidature || !isValidJob) {
            return res.status(404).json({ message: "Resource not found!" });
        }
        const curCandidature = yield (0, candidatures_1.getCandidatureById)(candidatureId);
        if (curCandidature && curCandidature.cv.publicId) {
            yield (0, cloudinary_1.deleteFromCloudinary)(curCandidature.cv.publicId, "raw");
        }
        yield (0, candidatures_1.deleteCandidature)(jobId, candidatureId);
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
candidaturesRouter.put("/:candidatureId", (0, guard_1.isUser)(), (0, express_validator_1.body)("link").optional(), (0, express_validator_1.body)("description")
    .notEmpty()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 symbols long!"), (0, express_validator_1.body)("cvPublicId")
    .optional()
    .notEmpty()
    .withMessage("CV public id required!"), (0, express_validator_1.body)("cvUrl").optional().notEmpty().withMessage("CV url required!"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const candidatureId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.candidatureId;
        const isValid = yield (0, candidatures_1.checkCandidatureId)(candidatureId);
        if (!isValid) {
            return res.status(404).json({ message: "Resource not found!" });
        }
        const results = (0, express_validator_1.validationResult)(req);
        if (!results.isEmpty()) {
            throw new Error((0, errorParser_1.parseError)(results));
        }
        const fields = req.body;
        let cv = null;
        if (fields.logoPublicId && fields.logoUrl) {
            const curCandidature = yield (0, candidatures_1.getCandidatureById)(candidatureId);
            if (curCandidature && curCandidature.cv.publicId) {
                yield (0, cloudinary_1.deleteFromCloudinary)(curCandidature.cv.publicId, "raw");
            }
            cv = {
                publicId: fields.cvPublicId,
                url: fields.cvUrl,
            };
        }
        const curCandidature = yield (0, candidatures_1.getCandidatureById)(candidatureId);
        if (curCandidature && curCandidature.cv.publicId) {
            yield (0, cloudinary_1.deleteFromCloudinary)(curCandidature.cv.publicId, "raw");
        }
        const newCandidature = yield (0, candidatures_1.editCandidature)(candidatureId, fields, cv);
        res.json(newCandidature);
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
candidaturesRouter.put("/change-status/:candidatureId", (0, guard_1.isAdmin)(), (0, express_validator_1.body)("status")
    .isIn(["pending", "accepted", "rejected"])
    .withMessage("Status must be pending, accepted or rejected!"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const candidatureId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.candidatureId;
        const isValid = yield (0, candidatures_1.checkCandidatureId)(candidatureId);
        if (!isValid) {
            return res.status(404).json({ message: "Resource not found!" });
        }
        const results = (0, express_validator_1.validationResult)(req);
        if (!results.isEmpty()) {
            throw new Error((0, errorParser_1.parseError)(results));
        }
        const fields = req.body;
        const updatedCandidature = yield (0, candidatures_1.changeCandidatureStatus)(candidatureId, fields.status);
        res.json(updatedCandidature);
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
