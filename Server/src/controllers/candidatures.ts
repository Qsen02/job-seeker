import { Router } from "express";
import { checkJobId } from "../services/jobs";
import {
	changeCandidatureStatus,
	checkCandidatureId,
	createCandidature,
	deleteCandidature,
	editCandidature,
	getAllCandidaturesForJob,
	getAllCandidaturesForUser,
	getCandidatureById,
} from "../services/candidatures";
import { checkUserId } from "../services/users";
import { body, validationResult } from "express-validator";
import { parseError } from "../utils/errorParser";
import { MyRequest } from "../types/express";
import { deleteFromCloudinary } from "../config/cloudinary";
import { isAdmin, isUser } from "../middlewares/guard";

const candidaturesRouter = Router();

candidaturesRouter.get("/in-job/:jobId", isUser(), async (req, res) => {
	try {
		const jobId = req.params.jobId as string;
		const isValid = await checkJobId(jobId);
		if (!isValid) {
			return res.status(404).json({ message: "Resource not found!" });
		}
		const candidatures = await getAllCandidaturesForJob(jobId);
		res.json(candidatures);
	} catch (err) {
		if (err instanceof Error) {
			res.status(400).json({ message: err.message });
		} else {
			res.status(500).json({ message: "Unknown error occurd!" });
		}
	}
});

candidaturesRouter.get("/for-user/:userId", isUser(), async (req, res) => {
	try {
		const userId = req.params.userId as string;
		const isValid = await checkUserId(userId);
		if (!isValid) {
			return res.status(404).json({ message: "Resource not found!" });
		}
		const candidatures = await getAllCandidaturesForUser(userId);
		res.json(candidatures);
	} catch (err) {
		if (err instanceof Error) {
			res.status(400).json({ message: err.message });
		} else {
			res.status(500).json({ message: "Unknown error occurd!" });
		}
	}
});

candidaturesRouter.get("/:candidatureId", isUser(), async (req, res) => {
	try {
		const candidatureId = req.params.candidatureId as string;
		const candidature = await getCandidatureById(candidatureId);
		res.json(candidature);
	} catch (err) {
		if (err instanceof Error) {
			res.status(404).json({ message: err.message });
		} else {
			res.status(500).json({ message: "Unknown error occurd!" });
		}
	}
});
candidaturesRouter.post(
	"/in-job/:jobId",
	isUser(),
	body("link")
		.matches(/^https?:\/\//)
		.withMessage("Link must be valid")
		.optional(),
	body("description")
		.notEmpty()
		.isLength({ min: 10 })
		.withMessage("Description must be at least 10 symbols long!"),
	body("cvPublicId").notEmpty().withMessage("CV public id required!"),
	body("cvUrl").notEmpty().withMessage("CV url required!"),
	async (req: MyRequest, res) => {
		try {
			const jobId = req.params?.jobId as string;
			const isValid = await checkJobId(jobId);
			if (!isValid) {
				return res.status(404).json({ message: "Resource not found!" });
			}
			const results = validationResult(req);
			if (!results.isEmpty()) {
				throw new Error(parseError(results));
			}
			const fields = req.body;
			const user = req.user;
			const cv = {
				publicId: fields.cvPublicId,
				url: fields.cvUrl,
			};
			const newCandidature = await createCandidature(
				user,
				jobId,
				fields,
				cv,
			);
			res.json(newCandidature);
		} catch (err) {
			if (err instanceof Error) {
				res.status(400).json({ message: err.message });
			} else {
				res.status(500).json({ message: "Unknown error occurd!" });
			}
		}
	},
);

candidaturesRouter.delete(
	"/:candidatureId/in-job/:jobId",
	isUser(),
	async (req, res) => {
		try {
			const candidatureId = req.params.candidatureId as string;
			const jobId = req.params.jobId as string;
			const isValidCandidature = await checkCandidatureId(candidatureId);
			const isValidJob = await checkJobId(jobId);
			if (!isValidCandidature || !isValidJob) {
				return res.status(404).json({ message: "Resource not found!" });
			}
			const curCandidature = await getCandidatureById(candidatureId);
			if (curCandidature && curCandidature.cv.publicId) {
				await deleteFromCloudinary(curCandidature.cv.publicId, "raw");
			}
			await deleteCandidature(jobId, candidatureId);
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

candidaturesRouter.put(
	"/:candidatureId",
	isUser(),
	body("link")
		.optional()
		.matches(/^https?:\/\//)
		.withMessage("Link must be valid"),
	body("description")
		.notEmpty()
		.isLength({ min: 10 })
		.withMessage("Description must be at least 10 symbols long!"),
	body("cvPublicId")
		.optional()
		.notEmpty()
		.withMessage("CV public id required!"),
	body("cvUrl").optional().notEmpty().withMessage("CV url required!"),
	async (req: MyRequest, res) => {
		try {
			const candidatureId = req.params?.candidatureId as string;
			const isValid = await checkCandidatureId(candidatureId);
			if (!isValid) {
				return res.status(404).json({ message: "Resource not found!" });
			}
			const results = validationResult(req);
			if (!results.isEmpty()) {
				throw new Error(parseError(results));
			}
			const fields = req.body;
			let cv = null;
			if (fields.logoPublicId && fields.logoUrl) {
				const curCandidature = await getCandidatureById(candidatureId);
				if (curCandidature && curCandidature.cv.publicId) {
					await deleteFromCloudinary(
						curCandidature.cv.publicId,
						"raw",
					);
				}
				cv = {
					publicId: fields.cvPublicId,
					url: fields.cvUrl,
				};
			}
			const curCandidature = await getCandidatureById(candidatureId);
			if (curCandidature && curCandidature.cv.publicId) {
				await deleteFromCloudinary(curCandidature.cv.publicId, "raw");
			}
			const newCandidature = await editCandidature(
				candidatureId,
				fields,
				cv,
			);
			res.json(newCandidature);
		} catch (err) {
			if (err instanceof Error) {
				res.status(400).json({ message: err.message });
			} else {
				res.status(500).json({ message: "Unknown error occurd!" });
			}
		}
	},
);

candidaturesRouter.put(
	"/change-status/:candidatureId",
	isAdmin(),
	body("status")
		.isIn(["pending", "accepted", "rejected"])
		.withMessage("Status must be pending, accepted or rejected!"),
	async (req, res) => {
		try {
			const candidatureId = req.params?.candidatureId as string;
			const isValid = await checkCandidatureId(candidatureId);
			if (!isValid) {
				return res.status(404).json({ message: "Resource not found!" });
			}
			const results = validationResult(req);
			if (!results.isEmpty()) {
				throw new Error(parseError(results));
			}
			const fields = req.body;
			const updatedCandidature = await changeCandidatureStatus(
				candidatureId,
				fields.status,
			);
			res.json(updatedCandidature);
		} catch (err) {
			if (err instanceof Error) {
				res.status(400).json({ message: err.message });
			} else {
				res.status(500).json({ message: "Unknown error occurd!" });
			}
		}
	},
);

export { candidaturesRouter };
