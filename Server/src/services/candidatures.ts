import CandidatureModel from "../models/candidatures";
import JobModel from "../models/jobs";
import { Candidature } from "../types/candidatures";
import { Job } from "../types/jobs";
import { User } from "../types/users";

export async function getAllCandidaturesForJob(jobId: string) {
	const candidatures = await CandidatureModel.find({ jobId }).lean();
	return candidatures;
}

export async function getAllCandidaturesForUser(userId: string) {
	const candidatures = await CandidatureModel.find({ userId }).lean();
	return candidatures;
}

export async function getCandidatureById(id: string) {
	const candidature = await CandidatureModel.findById(id)
		.populate("userId")
		.populate("jobId")
		.lean();
	if (!candidature) {
		throw new Error("Candidature not found!");
	}
	return candidature;
}

export async function createCandidature(
	user: User,
	job: Job,
	candidatureData: Candidature,
) {
	const newCandidature = new CandidatureModel({
		cv: candidatureData.cv,
		description: candidatureData.description,
		userId: user._id,
		jobId: job._id,
		link: candidatureData.link,
	});
	await newCandidature.save();
	await JobModel.findByIdAndUpdate(job._id, {
		$push: { candidatures: newCandidature._id },
	});
	return newCandidature;
}

export async function editCandidature(
	id: string,
	candidatureData: Partial<Candidature>,
) {
	const updatedCandidature = await CandidatureModel.findByIdAndUpdate(
		id,
		{
			$set: { candidatureData },
		},
		{ returnDocument: "after" },
	)
		.populate("userId")
		.populate("jobId")
		.lean();

	return updatedCandidature;
}

export async function deleteCandidature(jobId: string, candidatureId: string) {
	await JobModel.findByIdAndUpdate(jobId, {
		$pull: { candidatures: candidatureId },
	});
	await CandidatureModel.findByIdAndDelete(candidatureId);
}

export async function checkCandidatureId(id: string) {
	const isValid = await CandidatureModel.findById(id);
	if (isValid) {
		return true;
	}
	return false;
}
