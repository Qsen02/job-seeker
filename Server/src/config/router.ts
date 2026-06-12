import { Express } from "express";
import { userRouter } from "../controllers/users";
import { companyRouter } from "../controllers/companies";

export function routerConfig(app: Express) {
	app.use("/users", userRouter);

	app.use("/companies", companyRouter);

	app.use((req, res) => {
		res.status(404).json({ message: "Resource not found!" });
	});
}
