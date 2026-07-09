"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCompanies = getAllCompanies;
exports.getCompanyById = getCompanyById;
exports.getAllCompaniesForOwner = getAllCompaniesForOwner;
exports.checkCompanyId = checkCompanyId;
exports.createCompany = createCompany;
exports.editCompany = editCompany;
exports.deleteCompany = deleteCompany;
const companies_1 = __importDefault(require("../models/companies"));
const jobs_1 = __importDefault(require("../models/jobs"));
function getAllCompanies() {
    return __awaiter(this, void 0, void 0, function* () {
        const companies = yield companies_1.default.find().lean();
        return companies;
    });
}
function getCompanyById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const company = yield companies_1.default.findById(id)
            .populate("owner")
            .populate("jobs")
            .lean();
        if (!company) {
            throw new Error("Company not found!");
        }
        return company;
    });
}
function getAllCompaniesForOwner(ownerId) {
    return __awaiter(this, void 0, void 0, function* () {
        const companies = yield companies_1.default.find({ owner: ownerId }).lean();
        return companies;
    });
}
function checkCompanyId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const isValid = yield companies_1.default.findById(id);
        if (isValid) {
            return true;
        }
        return false;
    });
}
function createCompany(user, companyData, logo) {
    return __awaiter(this, void 0, void 0, function* () {
        const company = new companies_1.default({
            name: companyData.name,
            description: companyData.description,
            location: companyData.location,
            logo: logo,
            phone: companyData.phone,
            email: companyData.email,
            address: companyData.address,
            owner: user === null || user === void 0 ? void 0 : user._id,
        });
        yield company.save();
        return company;
    });
}
function editCompany(id, companyData, logo) {
    return __awaiter(this, void 0, void 0, function* () {
        const updateData = Object.assign({}, companyData);
        if (logo) {
            updateData.logo = logo;
        }
        const updatedCompany = yield companies_1.default.findByIdAndUpdate(id, {
            $set: updateData,
        }, { returnDocument: "after" })
            .populate("jobs")
            .populate("owner")
            .lean();
        return updatedCompany;
    });
}
function deleteCompany(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield companies_1.default.findByIdAndDelete(id);
        yield jobs_1.default.deleteMany({ companyId: id });
    });
}
