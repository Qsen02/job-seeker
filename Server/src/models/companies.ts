import mongoose, { Types } from "mongoose";
import { Company } from "../types/companies";

const companiesSchema = new mongoose.Schema<Company>(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		logo: {
			publicId: {
				type: String,
				required: true,
			},
			url: {
				type: String,
				required: true,
			},
		},
		email: { type: String, required: true },
		phone: { type: String, required: true },
		address: { type: String, required: true },
		location: { type: String, required: true },
		owner: { type: Types.ObjectId, ref: "Users", required: true },
		jobs: { type: [Types.ObjectId], ref: "Jobs", default: [] },
	},
	{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } },
);

const CompanyModel = mongoose.model<Company>("Companies", companiesSchema);

export default CompanyModel;
