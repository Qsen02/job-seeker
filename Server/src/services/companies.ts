import CompanyModel from "../models/companies";
import JobModel from "../models/jobs";
import { Company } from "../types/companies";
import { User } from "../types/users";

export async function getAllCompanies() {
    const companies = await CompanyModel.find().lean();
    return companies;
}

export async function getCompanyById(id: string) {
    const company = await CompanyModel.findById(id).populate("owner").populate("jobs").lean();
    if (!company) {
        throw new Error("Company not found!");
    }   
    return company;
}

export async function createCompany(user: User, companyData:Company) {
    const company = new CompanyModel({
        name: companyData.name,
        description: companyData.description,
        location: companyData.location,
        logo: companyData.logo,
        phone: companyData.phone,
        email: companyData.email,
        address: companyData.address,
        owner: user._id,
    });
    await company.save();
    return company;
}

export async function editCompany(id: string, companyData: Partial<Company>) {
    const updatedCompany = await CompanyModel.findByIdAndUpdate(
		id,
		{
			$set: companyData,
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