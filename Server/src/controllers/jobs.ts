import { Router } from "express";
import {
	checkJobId,
	createJob,
	deleteJob,
	editJob,
	getAllJobsForCompany,
	getJobById,
	paginateJobs,
} from "../services/jobs";
import { checkCompanyId } from "../services/companies";
import { isAdmin } from "../middlewares/guard";
import { body, validationResult } from "express-validator";
import { parseError } from "../utils/errorParser";

const jobsRouter = Router();

jobsRouter.get("/:jobId", async (req, res) => {
	try {
		const jobId = req.params.jobId;
		const job = await getJobById(jobId);
		res.json(job);
	} catch (err) {
		if (err instanceof Error) {
			res.status(404).json({ message: err.message });
		} else {
			res.status(500).json({ message: "Unknown error occurd!" });
		}
	}
});

jobsRouter.get("/paginate/:page", async (req, res) => {
	try {
		const page = Number(req.params.page);
		const filter = req.query.filter as "type" | "level";
		const value = req.query.value as string;
		const jobs = await paginateJobs(page, filter, value);
		res.json(jobs);
	} catch (err) {
		if (err instanceof Error) {
			res.status(400).json({ message: err.message });
		} else {
			res.status(500).json({ message: "Unknown error occurd!" });
		}
	}
});

jobsRouter.get("/for-company/:companyId", async (req, res) => {
	try {
		const companyId = req.params.companyId;
		const isValid = await checkCompanyId(companyId);
		if (!isValid) {
			return res.status(404).json({ message: "Resource not found!" });
		}
		const jobs = await getAllJobsForCompany(companyId);
		res.json(jobs);
	} catch (err) {
		if (err instanceof Error) {
			res.status(400).json({ message: err.message });
		} else {
			res.status(500).json({ message: "Unknown error occurd!" });
		}
	}
});

jobsRouter.post(
	"/in-company/:companyId",
	isAdmin(),
	body("title")
		.notEmpty()
		.isLength({ min: 3 })
		.withMessage("Title must be at least 3 symbols long!"),
	body("description")
		.notEmpty()
		.isLength({ min: 10 })
		.withMessage("Description must be at least 10 symbols long!"),
	body("level")
		.isIn(["junior", "mid", "senior"])
		.withMessage("Level must be junior, mid or senior!"),
	body("type")
		.isIn(["remote", "on-site", "hybrid"])
		.withMessage("Type must be remote, on-site or hybrid!"),
	body("salary")
		.isInt({ min: 0 })
		.withMessage("Salary must be a positive integer!"),
	async (req, res) => {
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
            fields.description = fields.description.split("\n\n");
			const newJob = await createJob(companyId, fields);
			res.json(newJob);
		} catch (err) {
			if (err instanceof Error) {
				res.status(400).json({ message: err.message });
			} else {
				res.status(500).json({ message: "Unknown error occurd!" });
			}
		}
	},
);

jobsRouter.delete(
	"/:jobId/in-company/:companyId",
	isAdmin(),
	async (req, res) => {
		try {
			const jobId = req.params.jobId as string;
			const isValidJob = await checkJobId(jobId);
			const companyId = req.params.companyId as string;
			const isValidCompany = await checkCompanyId(companyId);
			if (!isValidJob || !isValidCompany) {
				return res.status(404).json({ message: "Resource not found!" });
			}
			await deleteJob(companyId, jobId);
			res.json({ message: "Resource deleted successfully!" });
		} catch (err) {
			if (err instanceof Error) {
				res.status(400).json({ message: err.message });
			} else {
				res.status(500).json({ message: "Unknown error occurd!" });
			}
		}
	},
);

jobsRouter.put(
	"/:jobId",
	isAdmin(),
	body("title")
		.notEmpty()
		.isLength({ min: 3 })
		.withMessage("Title must be at least 3 symbols long!"),
	body("description")
		.notEmpty()
		.isLength({ min: 10 })
		.withMessage("Description must be at least 10 symbols long!"),
	body("level")
		.isIn(["junior", "mid", "senior"])
		.withMessage("Level must be junior, mid or senior!"),
	body("type")
		.isIn(["remote", "on-site", "hybrid"])
		.withMessage("Type must be remote, on-site or hybrid!"),
	body("salary")
		.isInt({ min: 0 })
		.withMessage("Salary must be a positive integer!"),
	async (req, res) => {
		try {
			const jobId = req.params.jobId as string;
			const isValid = await checkJobId(jobId);
			if (!isValid) {
				return res.status(404).json({ message: "Resource not found!" });
			}
			const results = validationResult(req);
			if (!results.isEmpty()) {
				throw new Error(parseError(results));
			}
			const fields = req.body;
            fields.description = fields.description.split("\n\n");
			const updatedJob = await editJob(jobId, fields);
			res.json(updatedJob);
		} catch (err) {
			if (err instanceof Error) {
				res.status(400).json({ message: err.message });
			} else {
				res.status(500).json({ message: "Unknown error occurd!" });
			}
		}
	},
);

export { jobsRouter };
