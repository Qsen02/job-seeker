import mongoose from "mongoose";
import { Candidature } from "../types/candidatures";

const candidatureSchema = new mongoose.Schema<Candidature>(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
        jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Jobs", required: true },
		status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
		description: { type: String, required: true },
		link: { type: String, required: true },
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
	},
	{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } },
);

const CandidatureModel = mongoose.model<Candidature>("Candidatures", candidatureSchema);

export default CandidatureModel;
