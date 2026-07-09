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
exports.jobsRouter = void 0;
const express_1 = require("express");
const jobs_1 = require("../services/jobs");
const companies_1 = require("../services/companies");
const guard_1 = require("../middlewares/guard");
const express_validator_1 = require("express-validator");
const errorParser_1 = require("../utils/errorParser");
const jobsRouter = (0, express_1.Router)();
exports.jobsRouter = jobsRouter;
jobsRouter.get("/:jobId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobId = req.params.jobId;
        const job = yield (0, jobs_1.getJobById)(jobId);
        res.json(job);
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
jobsRouter.get("/paginate/:page", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.params.page);
        const filter = req.query.filter;
        const value = req.query.value;
        const jobs = yield (0, jobs_1.paginateJobs)(page, filter, value);
        res.json(jobs);
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
jobsRouter.get("/for-company/:companyId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companyId = req.params.companyId;
        const isValid = yield (0, companies_1.checkCompanyId)(companyId);
        if (!isValid) {
            return res.status(404).json({ message: "Resource not found!" });
        }
        const jobs = yield (0, jobs_1.getAllJobsForCompany)(companyId);
        res.json(jobs);
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
jobsRouter.get("/for-user/:userId", (0, guard_1.isUser)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const jobs = yield (0, jobs_1.getUserAppliedJobs)(userId);
        res.json(jobs);
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
jobsRouter.post("/in-company/:companyId", (0, guard_1.isAdmin)(), (0, express_validator_1.body)("title")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 symbols long!"), (0, express_validator_1.body)("description")
    .notEmpty()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 symbols long!"), (0, express_validator_1.body)("level")
    .isIn(["junior", "mid", "senior"])
    .withMessage("Level must be junior, mid or senior!"), (0, express_validator_1.body)("type")
    .isIn(["remote", "on-site", "hybrid"])
    .withMessage("Type must be remote, on-site or hybrid!"), (0, express_validator_1.body)("salary")
    .isInt({ min: 0 })
    .withMessage("Salary must be a positive integer!"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        fields.description = fields.description.split("\n");
        const newJob = yield (0, jobs_1.createJob)(companyId, fields);
        res.json(newJob);
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
jobsRouter.delete("/:jobId/in-company/:companyId", (0, guard_1.isAdmin)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobId = req.params.jobId;
        const isValidJob = yield (0, jobs_1.checkJobId)(jobId);
        const companyId = req.params.companyId;
        const isValidCompany = yield (0, companies_1.checkCompanyId)(companyId);
        if (!isValidJob || !isValidCompany) {
            return res.status(404).json({ message: "Resource not found!" });
        }
        yield (0, jobs_1.deleteJob)(companyId, jobId);
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
jobsRouter.put("/:jobId", (0, guard_1.isAdmin)(), (0, express_validator_1.body)("title")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 symbols long!"), (0, express_validator_1.body)("description")
    .notEmpty()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 symbols long!"), (0, express_validator_1.body)("level")
    .isIn(["junior", "mid", "senior"])
    .withMessage("Level must be junior, mid or senior!"), (0, express_validator_1.body)("type")
    .isIn(["remote", "on-site", "hybrid"])
    .withMessage("Type must be remote, on-site or hybrid!"), (0, express_validator_1.body)("salary")
    .isInt({ min: 0 })
    .withMessage("Salary must be a positive integer!"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobId = req.params.jobId;
        const isValid = yield (0, jobs_1.checkJobId)(jobId);
        if (!isValid) {
            return res.status(404).json({ message: "Resource not found!" });
        }
        const results = (0, express_validator_1.validationResult)(req);
        if (!results.isEmpty()) {
            throw new Error((0, errorParser_1.parseError)(results));
        }
        const fields = req.body;
        fields.description = fields.description.split("\n");
        const updatedJob = yield (0, jobs_1.editJob)(jobId, fields);
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
