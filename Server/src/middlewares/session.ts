import { NextFunction, Response } from "express";
import { verifyToken } from "../services/token";
import { MyRequest } from "../types/express";

export function session() { 
    return function (req: MyRequest, res: Response, next: NextFunction) {
        const token = req.cookies.token;
		if (token && typeof token == "string") {
			try {
				const payload = verifyToken(token);
				req.user = payload;
            } catch (err) {
                res.clearCookie("token");
				res.status(403).json({
					message:
						"You don't have credentials! Please login or register.",
				});
				return;
			}
		}
        next();
    }
}