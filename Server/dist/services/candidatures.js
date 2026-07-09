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
exports.getAllCandidaturesForJob = getAllCandidaturesForJob;
exports.getAllCandidaturesForUser = getAllCandidaturesForUser;
exports.getCandidatureById = getCandidatureById;
exports.createCandidature = createCandidature;
exports.editCandidature = editCandidature;
exports.deleteCandidature = deleteCandidature;
exports.changeCandidatureStatus = changeCandidatureStatus;
exports.checkCandidatureId = checkCandidatureId;
const candidatures_1 = __importDefault(require("../models/candidatures"));
const jobs_1 = __importDefault(require("../models/jobs"));
function getAllCandidaturesForJob(jobId) {
    return __awaiter(this, void 0, void 0, function* () {
        const candidatures = yield candidatures_1.default.find({ jobId })
            .populate([
            {
                path: "jobId",
            },
            {
                path: "userId",
            },
        ])
            .lean();
        return candidatures;
    });
}
function getAllCandidaturesForUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const candidatures = yield candidatures_1.default.find({ userId })
            .populate({
            path: "jobId",
            populate: {
                path: "companyId",
            },
        })
            .lean();
        return candidatures;
    });
}
function getCandidatureById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const candidature = yield candidatures_1.default.findById(id)
            .populate("userId")
            .populate({
            path: "jobId",
            populate: {
                path: "companyId",
            },
        })
            .lean();
        if (!candidature) {
            throw new Error("Candidature not found!");
        }
        return candidature;
    });
}
function createCandidature(user, jobId, candidatureData, cv) {
    return __awaiter(this, void 0, void 0, function* () {
        const newCandidature = new candidatures_1.default({
            cv: cv,
            description: candidatureData.description,
            userId: user === null || user === void 0 ? void 0 : user._id,
            jobId: jobId,
            link: candidatureData.link,
        });
        yield newCandidature.save();
        const updatedJob = yield jobs_1.default.findByIdAndUpdate(jobId, {
            $push: { candidatures: newCandidature._id },
        }, { returnDocument: "after" })
            .populate("companyId")
            .populate("candidatures")
            .lean();
        return updatedJob;
    });
}
function editCandidature(id, candidatureData, cv) {
    return __awaiter(this, void 0, void 0, function* () {
        const updateData = Object.assign({}, candidatureData);
        if (cv) {
            updateData.cv = cv;
        }
        const updatedCandidature = yield candidatures_1.default.findByIdAndUpdate(id, {
            $set: updateData,
        }, { returnDocument: "after" })
            .populate("userId")
            .populate({
            path: "jobId",
            populate: {
                path: "companyId",
            },
        })
            .lean();
        return updatedCandidature;
    });
}
function deleteCandidature(jobId, candidatureId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield jobs_1.default.findByIdAndUpdate(jobId, {
            $pull: { candidatures: candidatureId },
        });
        yield candidatures_1.default.findByIdAndDelete(candidatureId);
    });
}
function changeCandidatureStatus(candidatureId, status) {
    return __awaiter(this, void 0, void 0, function* () {
        const updateCandidature = yield candidatures_1.default.findByIdAndUpdate(candidatureId, { $set: { status: status } }, { returnDocument: "after" })
            .populate("userId")
            .populate({
            path: "jobId",
            populate: {
                path: "companyId",
            },
        })
            .lean();
        return updateCandidature;
    });
}
function checkCandidatureId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const isValid = yield candidatures_1.default.findById(id);
        if (isValid) {
            return true;
        }
        return false;
    });
}
