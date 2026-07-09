import { NextFunction, Request, Response } from "express";

export function setCors() {
	return function (req: Request, res: Response, next: NextFunction) {
		if (process.env.NODE_ENV === "development") {
			res.setHeader(
				"Access-Control-Allow-Origin",
				"http://localhost:5173",
			);
		} else {
			res.setHeader(
				"Access-Control-Allow-Origin",
				"https://job-seeker-gq5k.onrender.com",
			);
		}
		res.setHeader(
			"Access-Control-Allow-Methods",
			"OPTIONS,GET,POST,DELETE,PUT",
		);
		res.setHeader(
			"Access-Control-Allow-Headers",
			"Content-type,X-Authorization",
		);
		res.setHeader("Access-Control-Allow-Credentials", "true");
		next();
	};
}
