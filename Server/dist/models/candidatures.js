"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const candidatureSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Users", required: true },
    jobId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Jobs", required: true },
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
    description: { type: String, required: true },
    link: { type: String },
    cv: {
        publicId: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
const CandidatureModel = mongoose_1.default.model("Candidatures", candidatureSchema);
exports.default = CandidatureModel;
