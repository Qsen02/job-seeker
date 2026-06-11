import { NextFunction, Request, Response } from "express";

export function isUser() {
	return function (req: Request, res: Response, next: NextFunction) {
		if (!req.cookies.token) {
			res.status(401).json({
				message: "You don't have credentials for this resource!",
			});
			return;
		}
		next();
	};
}
