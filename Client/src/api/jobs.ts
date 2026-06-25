import type { Job } from "../types/jobs";
import { del, get, post, put } from "./requester";

const endpoint = "jobs";

export async function getJobById(jobId: string) {
	const job = await get(`${endpoint}/${jobId}`);
	return job as Job;
}

export async function paginateJobs(
	page: number,
	filter?: "type" | "level" | "",
	value?: string,
) {
	const jobs = await get(
		`${endpoint}/paginate/${page}${filter && value ? `?filter=${encodeURIComponent(filter)}&value=${encodeURIComponent(value)}` : ""}`,
	);
	return jobs as { jobs: Job[]; totalPages: number };
}

export async function getJobsForCompany(companyId: string) {
	const jobs = await get(`${endpoint}/for-company/${companyId}`);
	return jobs as Job[];
}

export async function createJob(companyId: string | undefined, data: object) {
	const newJob = await post(`${endpoint}/in-company/${companyId}`, data);
	return newJob as Job;
}

export async function deleteJob(companyId: string | undefined, jobId: string | undefined) {
	await del(`${endpoint}/${jobId}/in-company/${companyId}`);
}

export async function editJob(jobId: string | undefined, data: object) {
	const updatedJob = await put(`${endpoint}/${jobId}`, data);
	return updatedJob as Job;
}
