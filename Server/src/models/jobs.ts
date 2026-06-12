import mongoose, { Types } from "mongoose";
import { Job } from "../types/jobs";

const jobSchema = new mongoose.Schema<Job>(
	{
		title: { type: String, required: true },
		description: {
			type: [String],
			required: true,
		},
		level: {
			type: String,
			enum: ["junior", "mid", "senior"],
			required: true,
		},
		companyId: { type: Types.ObjectId, ref: "Companies", required: true },
		candidatures: {
			type: [Types.ObjectId],
			ref: "Candidatures",
			default: [],
		},
		type: {
			type: String,
			enum: ["remote", "on-site", "hybrid"],
			required: true,
		},
		salary: { type: Number, required: true },
	},
	{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } },
);

const JobModel = mongoose.model<Job>("Jobs", jobSchema);

export default JobModel;
