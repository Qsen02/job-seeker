import { Result, ValidationError } from "express-validator";

export function parseError(errors: Result<ValidationError>) {
	return errors
		.array()
		.map((el) => el.msg)
		.join("\n");
}
