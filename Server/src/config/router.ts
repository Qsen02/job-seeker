import { Express } from "express";
import { userRouter } from "../controllers/users";

export function routerConfig(app: Express) {
	app.use("/users", userRouter);

	app.use((req, res) => {
		res.status(404).json({ message: "Resource not found!" });
	});
}
