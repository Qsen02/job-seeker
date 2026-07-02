import CompanyModel from "../models/companies";
import JobModel from "../models/jobs";
import { Company, FileType } from "../types/companies";
import { UserAttributes } from "../types/users";

export async function getAllCompanies() {
	const companies = await CompanyModel.find().lean();
	return companies;
}

export async function getCompanyById(id: string) {
	const company = await CompanyModel.findById(id)
		.populate("owner")
		.populate("jobs")
		.lean();
	if (!company) {
		throw new Error("Company not found!");
	}
	return company;
}

export async function getAllCompaniesForOwner(ownerId: string) {
	const companies = await CompanyModel.find({ owner: ownerId }).lean();
	console.log(companies);
	return companies;
}

export async function checkCompanyId(id: string) {
	const isValid = await CompanyModel.findById(id);
	if (isValid) {
		return true;
	}
	return false;
}

export async function createCompany(
	user: UserAttributes | null | undefined,
	companyData: Company,
	logo: FileType,
) {
	const company = new CompanyModel({
		name: companyData.name,
		description: companyData.description,
		location: companyData.location,
		logo: logo,
		phone: companyData.phone,
		email: companyData.email,
		address: companyData.address,
		owner: user?._id,
	});
	await company.save();
	return company;
}

export async function editCompany(
	id: string,
	companyData: Partial<Company>,
	logo: FileType | null,
) {
	const updateData: Partial<Company> = { ...companyData };
	if (logo) {
		updateData.logo = logo;
	}
	const updatedCompany = await CompanyModel.findByIdAndUpdate(
		id,
		{
			$set: updateData,
		},
		{ returnDocument: "after" },
	)
		.populate("jobs")
		.populate("owner")
		.lean();

	return updatedCompany;
}

export async function deleteCompany(id: string) {
	await CompanyModel.findByIdAndDelete(id);
	await JobModel.deleteMany({ companyId: id });
}
