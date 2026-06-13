import type { Company } from "../types/companies";
import { del, get, post, put } from "./requester";

const endpoint = "companies";

export async function getAllCompanies() {
	const companies = await get(endpoint);
	return companies as Company[];
}

export async function getCompanyById(companyId: string) {
	const company = await get(`${endpoint}/${companyId}`);
	return company as Company;
}

export async function createCompany(data: object) {
	const newCompany = await post(endpoint, data);
	return newCompany as Company;
}

export async function deleteCompany(companyId: string) {
	await del(`${endpoint}/${companyId}`);
}

export async function editCompany(companyId:string,data: object) {
	const updatedCompany = await put(`${endpoint}/${companyId}`, data);
	return updatedCompany as Company;
}