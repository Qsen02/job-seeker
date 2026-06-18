import { Form, Formik } from "formik";
import { useLanguage } from "../../../store/language";
import CustomInput from "../../../commons/customInput";
import { Activity, useState } from "react";
import { Link } from "react-router-dom";
import { registerSchema } from "../../../schemas";

interface InitValuesType {
	fullName: string;
	email: string;
	phoneNumber: string;
	password: string;
	repass: string;
	profileImage: File | null;
}

export default function Register() {
	const initValues: InitValuesType = {
		fullName: "",
		email: "",
		phoneNumber: "",
		password: "",
		repass: "",
		profileImage: null,
	};
	const language = useLanguage((state) => state.language);
	const [showPassword, setShowPassword] = useState(false);
	const [showRepass, setShowRepass] = useState(false);

	async function onRegister() {}

	return (
		<Formik
			key={language}
			initialValues={initValues}
			onSubmit={onRegister}
			validationSchema={registerSchema(language)}
		>
			{(props) => (
				<Form className="form">
					<h1>
						{language === "bg"
							? "Създай своя акаунт тук"
							: "Create your account here"}
					</h1>
					<div className="input">
						<CustomInput
							type="text"
							name="fullName"
							label={
								language === "bg"
									? "Име и фамилия"
									: "First name and last name"
							}
							id="fullName"
						/>
					</div>
					<div className="input">
						<CustomInput
							type="text"
							name="email"
							label={language === "bg" ? "Имейл" : "Email"}
							id="email"
						/>
					</div>
					<div className="input">
						<CustomInput
							type="text"
							name="phoneNumber"
							label={
								language === "bg"
									? "Телефонен номер"
									: "Phone number"
							}
							id="phoneNumber"
						/>
					</div>
					<div className="input">
						<CustomInput
							type="file"
							name="profileImage"
							label={
								language === "bg"
									? "Профилна снимка"
									: "Profile image"
							}
							id="profileImage"
						/>
					</div>
					<div className="input">
						<CustomInput
							type={showPassword ? "text" : "password"}
							name="password"
							label={language === "bg" ? "Парола" : "Password"}
							id="password"
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
					<div className="input">
						<CustomInput
							type={showRepass ? "text" : "password"}
							name="repass"
							label={
								language === "bg"
									? "Повтори парола"
									: "Repeat password"
							}
							id="repass"
						/>
						<Activity mode={showRepass ? "visible" : "hidden"}>
							<i
								className="fa-regular fa-eye"
								onClick={() => setShowRepass(false)}
							></i>
						</Activity>
						<Activity mode={!showRepass ? "visible" : "hidden"}>
							<i
								className="fa-regular fa-eye-slash"
								onClick={() => setShowRepass(true)}
							></i>
						</Activity>
					</div>
					<button type="submit">
						{language === "bg" ? "Регистрирай се" : "Register"}
					</button>
					<Activity mode={language === "bg" ? "visible" : "hidden"}>
						<p>
							Вече имате акаунта? <Link to="/login">Влезте</Link>{" "}
							от тук.
						</p>
					</Activity>
					<Activity mode={language === "en" ? "visible" : "hidden"}>
						<p>
							Already have an account?{" "}
							<Link to="/login">Login</Link> here.
						</p>
					</Activity>
				</Form>
			)}
		</Formik>
	);
}
