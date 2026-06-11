import { UserAttributes } from "./users";
import { Request } from "express";

export interface MyRequest extends Request {
	user?: UserAttributes | null;
}
