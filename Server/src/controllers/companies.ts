import { Router } from "express";
import {
	checkCompanyId,
	createCompany,
	deleteCompany,
	editCompany,
	getAllCompanies,
	getCompanyById,
} from "../services/companies";
import { isAdmin } from "../middlewares/guard";
import { body, validationResult } from "express-validator";
import { MyRequest } from "../types/express";
import { parseError } from "../utils/errorParser";
import { deleteFromCloudinary } from "../config/cloudinary";

const companyRouter = Router();

companyRouter.get("/", async (req, res) => {
	try {
		const companies = await getAllCompanies();
		res.json(companies);
	} catch (err) {
		if (err instanceof Error) {
			res.status(400).json({ message: err.message });
		} else {
			res.status(500).json({ message: "Unknown error occurd!" });
		}
	}
});

companyRouter.get("/:companyId", async (req, res) => {
	try {
		const companyId = req.params.companyId;
		const company = await getCompanyById(companyId);
		res.json(company);
	} catch (err) {
		if (err instanceof Error) {
			res.status(404).json({ message: err.message });
		} else {
			res.status(500).json({ message: "Unknown error occurd!" });
		}
	}
});

companyRouter.post(
	"/",
	isAdmin(),
	body("name")
		.notEmpty()
		.isLength({ min: 3 })
		.withMessage("Name must be at least 3 symbols long!"),
	body("description")
		.notEmpty()
		.isLength({ min: 10 })
		.withMessage("Description must be at least 10 symbols long!"),
	body("location")
		.notEmpty()
		.isLength({ min: 5 })
		.withMessage("Location must be at least 5 symbols long!"),
	body("logoPublicId").notEmpty().withMessage("Logo public id required!"),
	body("logoUrl").notEmpty().withMessage("Logo url required!"),
	body("phone")
		.isMobilePhone("bg-BG")
		.withMessage("Phone must be in valid format!"),
	body("email").notEmpty().isEmail().withMessage("Email must be valid!"),
	body("address")
		.notEmpty()
		.isLength({ min: 5 })
		.withMessage("Address must be at least 5 symbols long!"),
	async (req: MyRequest, res) => {
		try {
			const results = validationResult(req);
			if (!results.isEmpty()) {
				throw new Error(parseError(results));
			}
			const user = req.user;
			const fields = req.body;
			const logo = {
				publicId: fields.logoPublicId,
				url: fields.logoUrl,
			};
			const newCompany = await createCompany(user, fields, logo);
			res.json(newCompany);
		} catch (err) {
			if (err instanceof Error) {
				res.status(400).json({ message: err.message });
			} else {
				res.status(500).json({ message: "Unknown error occurd!" });
			}
		}
	},
);

companyRouter.delete("/:companyId", isAdmin(), async (req, res) => {
	try {
		const companyId = req.params.companyId as string;
		const isValid = await checkCompanyId(companyId);
		if (!isValid) {
			return res.status(404).json({ message: "Resource not found!" });
		}
		const curCompany = await getCompanyById(companyId);
		if (curCompany && curCompany.logo.publicId) {
			await deleteFromCloudinary(curCompany.logo.publicId, "image");
		}
		await deleteCompany(companyId);
		res.json({ message: "Resource deleted successfully!" });
	} catch (err) {
		if (err instanceof Error) {
			res.status(400).json({ message: err.message });
		} else {
			res.status(500).json({ message: "Unknown error occurd!" });
		}
	}
});

companyRouter.put(
	"/:companyId",
	isAdmin(),
	body("name")
		.notEmpty()
		.isLength({ min: 3 })
		.withMessage("Name must be at least 3 symbols long!"),
	body("description")
		.notEmpty()
		.isLength({ min: 10 })
		.withMessage("Description must be at least 10 symbols long!"),
	body("location")
		.notEmpty()
		.isLength({ min: 5 })
		.withMessage("Location must be at least 5 symbols long!"),
	body("logoPublicId").optional(),
	body("logoUrl").optional(),
	body("phone")
		.isMobilePhone("bg-BG")
		.withMessage("Phone must be in valid format!"),
	body("email").notEmpty().isEmail().withMessage("Email must be valid!"),
	body("address")
		.notEmpty()
		.isLength({ min: 5 })
		.withMessage("Address must be at least 5 symbols long!"),
	async (req: MyRequest, res) => {
		try {
			const companyId = req.params.companyId as string;
			const isValid = await checkCompanyId(companyId);
			if (!isValid) {
				return res.status(404).json({ message: "Resource not found!" });
			}
			const results = validationResult(req);
			if (!results.isEmpty()) {
				throw new Error(parseError(results));
			}
			const fields = req.body;
			let logo = null;
			if (fields.logoPublicId && fields.logoUrl) {
				const curCompany = await getCompanyById(companyId);
				if (curCompany && curCompany.logo.publicId) {
					await deleteFromCloudinary(
						curCompany.logo.publicId,
						"image",
					);
				}
				logo = {
					publicId: fields.logoPublicId,
					url: fields.logoUrl,
				};
			}
			const curCompany = await getCompanyById(companyId);
			if (curCompany && curCompany.logo.publicId) {
				await deleteFromCloudinary(curCompany.logo.publicId, "image");
			}
			const updateCompany = await editCompany(companyId, fields, logo);
			res.json(updateCompany);
		} catch (err) {
			if (err instanceof Error) {
				res.status(400).json({ message: err.message });
			} else {
				res.status(500).json({ message: "Unknown error occurd!" });
			}
		}
	},
);

export { companyRouter };
