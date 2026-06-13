import type { Candidature } from "../types/candidatures";
import { del, get, post, put } from "./requester";

const endpoint = "candidatures";

export async function getCandidaturesForJob(jobId: string) {
	const candidatures = await get(`${endpoint}/in-job/${jobId}`);
	return candidatures as Candidature[];
}

export async function getCandidaturesForUser(userId: string) {
	const candidatures = await get(`${endpoint}/for-user/${userId}`);
	return candidatures as Candidature[];
}

export async function getCandidatureById(candidatureId: string) {
	const candidature = await get(`${endpoint}/${candidatureId}`);
	return candidature as Candidature;
}

export async function createCandidature(jobId: string, data: object) {
	const newCandidature = await post(`${endpoint}/in-job/${jobId}`, data);
	return newCandidature as Candidature;
}

export async function deleteCandidature(candidatureId: string, jobId: string) {
	await del(`${endpoint}/${candidatureId}/in-job/${jobId}`);
}

export async function editCandidature(candidatureId: string, data: object) {
	const updatedCandidature = await put(`${endpoint}/${candidatureId}`, data);
	return updatedCandidature as Candidature;
}

export async function changeStatus(candidatureId: string, data: object) {
	const updatedCandidature = await put(`${endpoint}/change-status/${candidatureId}`, data);
	return updatedCandidature as Candidature;
}
