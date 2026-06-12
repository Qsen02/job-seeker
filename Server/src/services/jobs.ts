import CandidatureModel from "../models/candidatures";
import CompanyModel from "../models/companies";
import JobModel from "../models/jobs";
import { Company } from "../types/companies";
import { Job } from "../types/jobs";

export async function getJobById(id: string) {
	const job = await JobModel.findById(id)
		.populate("companyId")
		.populate("candidatures")
		.lean();
	if (!job) {
		throw new Error("Job not found!");
	}
	return job;
}

export async function checkJobId(id: string) {
	const isValid = await JobModel.findById(id);
	if (isValid) {
		return true;
	}
	return false;
}

export async function paginateJobs(
	page: number,
	filter: "level" | "type" | undefined,
	value: string | undefined,
) {
	const searchFilter: Partial<Job> = {};
	if (filter === "level") {
		searchFilter.level = value as Job["level"];
	}
	if (filter === "type") {
		searchFilter.type = value as Job["type"];
	}

	const limit = 20;
	const skip = (page - 1) * limit;
	const jobs = await JobModel.find(searchFilter)
		.skip(skip)
		.limit(limit)
		.lean();
	const totalJobs = await JobModel.countDocuments(searchFilter);
	const totalPages = Math.ceil(totalJobs / limit);
	return { jobs, totalPages };
}

export async function getAllJobsForCompany(companyId: string) {
	const jobs = await JobModel.find({ companyId }).lean();
	return jobs;
}

export async function createJob(companyId: string, jobData: Job) {
	const job = new JobModel({
		title: jobData.title,
		description: jobData.description,
		level: jobData.level,
		companyId: companyId,
		type: jobData.type,
		salary: jobData.salary,
	});
	await job.save();
	await CompanyModel.findByIdAndUpdate(companyId, {
		$push: { jobs: job._id },
	});
	return job;
}

export async function editJob(id: string, jobData: Partial<Job>) {
	const updatedJob = await JobModel.findByIdAndUpdate(
		id,
		{ $set: jobData },
		{ returnDocument: "after" },
	)
		.populate("companyId")
		.populate("candidatures")
		.lean();
	return updatedJob;
}

export async function deleteJob(companyId: string, jobId: string) {
	await CompanyModel.findByIdAndUpdate(companyId, { $pull: { jobs: jobId } });
	await JobModel.findByIdAndDelete(jobId);
	await CandidatureModel.deleteMany({ jobId: jobId });
}
