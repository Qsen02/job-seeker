import { Router } from "express";
import { body, validationResult } from "express-validator";
import { parseError } from "../utils/errorParser";
import {
	changePassword,
	checkUserId,
	editUser,
	getUserById,
	login,
	register,
} from "../services/users";
import { setToken } from "../services/token";
import { isUser } from "../middlewares/guard";

const userRouter = Router();

userRouter.post(
	"/register",
	body("fullName")
		.trim()
		.isLength({ min: 3 })
		.withMessage("Full name must be at least 3 symbols long!"),
	body("email").trim().isEmail().withMessage("Email must be vaild!"),
	body("password")
		.trim()
		.matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/)
		.withMessage(
			"Password must be at least 6 symbols long and must contain digits, captial letter and special symbol!",
		),
	body("repass")
		.trim()
		.custom((value, { req }) => req.body.password === value)
		.withMessage("Password must match!"),
	async (req, res) => {
		try {
			const results = validationResult(req);
			if (!results.isEmpty()) {
				throw new Error(parseError(results));
			}
			const fields = req.body;
			const newUser = await register(
				fields.fullName,
				fields.email,
				fields.password,
			);
			const token = setToken(newUser);
			res.cookie("token", token, {
				httpOnly: true,
				secure: true,
				sameSite: "none",
			});
			res.status(200).json({
				id: newUser._id,
				email: newUser.email,
				fullName: newUser.fullName,
				role: newUser.role,
			});
		} catch (err) {
			if (err instanceof Error) {
				res.status(400).json({ message: err.message });
			} else {
				res.status(500).json({ message: "Unknown error occurd!" });
			}
		}
	},
);

userRouter.post(
	"/login",
	body("email")
		.trim()
		.isEmail()
		.withMessage("Password or email don't match!"),
	body("password")
		.trim()
		.matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/)
		.withMessage("Password or email don't match!"),
	async (req, res) => {
		try {
			const results = validationResult(req);
			if (!results.isEmpty()) {
				throw new Error(parseError(results));
			}
			const fields = req.body;
			const user = await login(fields.email, fields.password);
			const token = setToken(user);
			res.cookie("token", token, {
				httpOnly: true,
				secure: true,
				sameSite: "none",
			});
			res.status(200).json({
				id: user._id,
				email: user.email,
				fullName: user.fullName,
				role: user.role,
			});
		} catch (err) {
			if (err instanceof Error) {
				res.status(400).json({ message: err.message });
			} else {
				res.status(500).json({ message: "Unknown error occurd!" });
			}
		}
	},
);

userRouter.get("/logout", async (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ message: "Logout was successfull!" });
});

userRouter.get("/:userId", async (req, res) => { 
    try {
        const userId = req?.params?.userId as string;
		const isValid = await checkUserId(userId);
		if (!isValid) {
			return res.status(400).json({ message: "User not found!" });
        }
        const user = await getUserById(userId);
        res.json(user);
    } catch (err) {
        if (err instanceof Error) {
			res.status(404).json({ message: err.message });
		} else {
			res.status(500).json({ message: "Unknown error occurd!" });
		}
    }
})

userRouter.put(
	"/edit/:userId",
	isUser(),
	body("fullName")
		.trim()
		.isLength({ min: 3 })
		.withMessage("Full name must be at least 3 symbols long!"),
	body("email").trim().isEmail().withMessage("Email must be vaild!"),
	async (req, res) => {
		try {
			const userId = req?.params?.userId as string;
			const isValid = await checkUserId(userId);
			if (!isValid) {
				return res.status(400).json({ message: "User not found!" });
			}
			const results = validationResult(req);
			if (!results.isEmpty()) {
				throw new Error(parseError(results));
			}
			const fields = req.body;
			const updatedUser = await editUser(
				userId,
				fields.fullName,
				fields.email,
			);
			res.status(200).json(updatedUser);
		} catch (err) {
			if (err instanceof Error) {
				res.status(400).json({ message: err.message });
			} else {
				res.status(500).json({ message: "Unknown error occurd!" });
			}
		}
	},
);

userRouter.put(
	"/change-password/:userId",
	isUser(),
	body("password")
		.trim()
		.matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/)
		.withMessage("Password or email don't match!"),
	async (req, res) => {
		try {
			const userId = req?.params?.userId as string;
			const isValid = await checkUserId(userId);
			if (!isValid) {
				return res.status(400).json({ message: "User not found!" });
			}
			const results = validationResult(req);
			if (!results.isEmpty()) {
				throw new Error(parseError(results));
			}
			const fields = req.body;
			const updatedUser = await changePassword(userId, fields.password);
			res.status(200).json(updatedUser);
		} catch (err) {
			if (err instanceof Error) {
				res.status(400).json({ message: err.message });
			} else {
				res.status(500).json({ message: "Unknown error occurd!" });
			}
		}
	},
);

export { userRouter };
