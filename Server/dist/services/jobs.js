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
exports.getJobById = getJobById;
exports.checkJobId = checkJobId;
exports.getUserAppliedJobs = getUserAppliedJobs;
exports.paginateJobs = paginateJobs;
exports.getAllJobsForCompany = getAllJobsForCompany;
exports.createJob = createJob;
exports.editJob = editJob;
exports.deleteJob = deleteJob;
const candidatures_1 = __importDefault(require("../models/candidatures"));
const companies_1 = __importDefault(require("../models/companies"));
const jobs_1 = __importDefault(require("../models/jobs"));
function getJobById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const job = yield jobs_1.default.findById(id)
            .populate("companyId")
            .populate("candidatures")
            .lean();
        if (!job) {
            throw new Error("Job not found!");
        }
        return job;
    });
}
function checkJobId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const isValid = yield jobs_1.default.findById(id);
        if (isValid) {
            return true;
        }
        return false;
    });
}
function getUserAppliedJobs(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const jobs = yield jobs_1.default.find({
            candidatures: { $in: yield candidatures_1.default.find({ userId }) },
        }).populate("companyId").lean();
        return jobs;
    });
}
function paginateJobs(page, filter, value) {
    return __awaiter(this, void 0, void 0, function* () {
        const searchFilter = {};
        if (filter === "level") {
            searchFilter.level = value;
        }
        if (filter === "type") {
            searchFilter.type = value;
        }
        const limit = 20;
        const skip = (page - 1) * limit;
        const jobs = yield jobs_1.default.find(searchFilter)
            .skip(skip)
            .limit(limit)
            .sort({ created_at: -1 })
            .populate("companyId")
            .lean();
        const totalJobs = yield jobs_1.default.countDocuments(searchFilter);
        const totalPages = Math.ceil(totalJobs / limit);
        return { jobs, totalPages };
    });
}
function getAllJobsForCompany(companyId) {
    return __awaiter(this, void 0, void 0, function* () {
        const jobs = yield jobs_1.default.find({ companyId })
            .sort({ created_at: -1 })
            .lean();
        return jobs;
    });
}
function createJob(companyId, jobData) {
    return __awaiter(this, void 0, void 0, function* () {
        const job = new jobs_1.default({
            title: jobData.title,
            description: jobData.description,
            level: jobData.level,
            companyId: companyId,
            type: jobData.type,
            salary: jobData.salary,
        });
        yield job.save();
        yield companies_1.default.findByIdAndUpdate(companyId, {
            $push: { jobs: job._id },
        });
        return job;
    });
}
function editJob(id, jobData) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedJob = yield jobs_1.default.findByIdAndUpdate(id, { $set: jobData }, { returnDocument: "after" })
            .populate("companyId")
            .populate("candidatures")
            .lean();
        return updatedJob;
    });
}
function deleteJob(companyId, jobId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield companies_1.default.findByIdAndUpdate(companyId, { $pull: { jobs: jobId } });
        yield jobs_1.default.findByIdAndDelete(jobId);
        yield candidatures_1.default.deleteMany({ jobId: jobId });
    });
}
