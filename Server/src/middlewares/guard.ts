import { NextFunction, Request, Response } from "express";
import { MyRequest } from "../types/express";

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

export function isAdmin() {
	return function (req: MyRequest, res: Response, next: NextFunction) {
		if (!req.cookies.token || req.user?.role !== "admin") {
			res.status(401).json({
				message: "This resource requires administrative rights!",
			});
			return;
		}
		next();
	};
}
