import CandidatureModel from "../models/candidatures";
import JobModel from "../models/jobs";
import { Candidature, CandidatureStatus } from "../types/candidatures";
import { FileType } from "../types/companies";
import { UserAttributes } from "../types/users";

export async function getAllCandidaturesForJob(jobId: string) {
	const candidatures = await CandidatureModel.find({ jobId })
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
}

export async function getAllCandidaturesForUser(userId: string) {
	const candidatures = await CandidatureModel.find({ userId }).lean();
	return candidatures;
}

export async function getCandidatureById(id: string) {
	const candidature = await CandidatureModel.findById(id)
		.populate("userId")
		.populate({
			path: "jobId",
			populate: {
				path:"companyId"
			}
		})
		.lean();
	if (!candidature) {
		throw new Error("Candidature not found!");
	}
	return candidature;
}

export async function createCandidature(
	user: UserAttributes | null | undefined,
	jobId: string,
	candidatureData: Candidature,
	cv: FileType,
) {
	const newCandidature = new CandidatureModel({
		cv: cv,
		description: candidatureData.description,
		userId: user?._id,
		jobId: jobId,
		link: candidatureData.link,
	});
	await newCandidature.save();
	await JobModel.findByIdAndUpdate(jobId, {
		$push: { candidatures: newCandidature._id },
	});
	return newCandidature;
}

export async function editCandidature(
	id: string,
	candidatureData: Partial<Candidature>,
	cv: FileType | null,
) {
	const updateData: Partial<Candidature> = { ...candidatureData };
	if (cv) {
		updateData.cv = cv;
	}
	const updatedCandidature = await CandidatureModel.findByIdAndUpdate(
		id,
		{
			$set: updateData,
		},
		{ returnDocument: "after" },
	)
		.populate("userId")
		.populate({
			path: "jobId",
			populate: {
				path: "companyId",
			},
		})
		.lean();

	return updatedCandidature;
}

export async function deleteCandidature(jobId: string, candidatureId: string) {
	await JobModel.findByIdAndUpdate(jobId, {
		$pull: { candidatures: candidatureId },
	});
	await CandidatureModel.findByIdAndDelete(candidatureId);
}

export async function changeCandidatureStatus(
	candidatureId: string,
	status: CandidatureStatus,
) {
	const updateCandidature = await CandidatureModel.findByIdAndUpdate(
		candidatureId,
		{ $set: { status: status } },
		{ returnDocument: "after" },
	)
		.populate("userId")
		.populate({
			path: "jobId",
			populate: {
				path: "companyId",
			},
		})
		.lean();
	return updateCandidature;
}

export async function checkCandidatureId(id: string) {
	const isValid = await CandidatureModel.findById(id);
	if (isValid) {
		return true;
	}
	return false;
}
