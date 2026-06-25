import { Express } from "express";
import { userRouter } from "../controllers/users";
import { companyRouter } from "../controllers/companies";
import { jobsRouter } from "../controllers/jobs";
import { candidaturesRouter } from "../controllers/candidatures";

export function routerConfig(app: Express) {
	app.use("/users", userRouter);

	app.use("/companies", companyRouter);

	app.use("/jobs", jobsRouter);

	app.use("/candidatures", candidaturesRouter);

	app.use((req, res) => {
		res.status(404).json({ message: "Resource not found!" });
	});
}
