import { Form, Formik, type FormikHelpers } from "formik";
import { useLanguage } from "../../../store/language";
import CustomInput from "../../../commons/customInput";
import { Activity, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema, registerSchema } from "../../../schemas";
import { useLogin } from "../../../hooks/useUsers";
import { useUser } from "../../../store/user";

interface InitValuesType {
	email: string;
	password: string;
}

export default function Login() {
	const initValues: InitValuesType = {
		email: "",
		password: "",
	};
	const setUser = useUser((state) => state.setUserState);
	const language = useLanguage((state) => state.language);
	const [showPassword, setShowPassword] = useState(false);
	const [registrating, setRegistrating] = useState(false);
	const [isErr, setIsErr] = useState(false);
	const [errMessage, setErrMessage] = useState("");
	const login = useLogin();
	const navigate = useNavigate();

	async function onLogin(
		values: InitValuesType,
		action: FormikHelpers<InitValuesType>,
	) {
		try {
			setRegistrating(true);
			const email = values.email;
			const password = values.password;

			const newUser = await login({
				email,
				password,
			});
			setUser(newUser);
			action.resetForm();
			navigate("/");
		} catch (err) {
			setRegistrating(false);
			setIsErr(true);
			if (err instanceof Error) {
				setErrMessage(err.message);
			}
			return;
		} finally {
			setRegistrating(false);
		}
	}

	return (
		<Formik
			key={language}
			initialValues={initValues}
			onSubmit={onLogin}
			validationSchema={loginSchema(language)}
		>
			{(props) => (
				<Form className="form">
					<h1>
						{language === "bg"
							? "Влез в своя акаунт тук"
							: "Login to your account here"}
					</h1>
					<Activity mode={isErr ? "visible" : "hidden"}>
						<p className="inputError">{errMessage}</p>
					</Activity>
					<div className="input">
						<CustomInput
							type="text"
							name="email"
							label={language === "bg" ? "Имейл" : "Email"}
							id="email"
							autoComplete="on"
							required
						/>
					</div>
					<div className="input">
						<CustomInput
							type={showPassword ? "text" : "password"}
							name="password"
							label={language === "bg" ? "Парола" : "Password"}
							id="password"
							autoComplete="on"
							required
						/>
						<Activity mode={showPassword ? "visible" : "hidden"}>
							<i
								className="fa-regular fa-eye"
								onClick={() => setShowPassword(false)}
							></i>
						</Activity>
						<Activity mode={!showPassword ? "visible" : "hidden"}>
							<i
								className="fa-regular fa-eye-slash"
								onClick={() => setShowPassword(true)}
							></i>
						</Activity>
					</div>
					<Activity mode={registrating ? "visible" : "hidden"}>
						<button type="submit">
							{language === "bg"
								? "Влизане"
								: "Loging in"}{" "}
							<span className="normal-loader"></span>
						</button>
					</Activity>
					<Activity mode={!registrating ? "visible" : "hidden"}>
						<button type="submit">
							{language === "bg" ? "Влез" : "Login"}
						</button>
					</Activity>
					<Activity mode={language === "bg" ? "visible" : "hidden"}>
						<p>
							Нямате акаунт все още? <Link to="/register">Регистрирайте се</Link>{" "}
							от тук.
						</p>
					</Activity>
					<Activity mode={language === "en" ? "visible" : "hidden"}>
						<p>
							Don't have an account yet?{" "}
							<Link to="/register">Register</Link> here.
						</p>
					</Activity>
				</Form>
			)}
		</Formik>
	);
}
