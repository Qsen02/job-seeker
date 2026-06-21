import { Form, Formik, type FormikHelpers } from "formik";
import { useLanguage } from "../../../store/language";
import CustomInput from "../../../commons/customInput";
import { Activity, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "../../../schemas";
import { useRegister } from "../../../hooks/useUsers";
import { useUploadProfileImage } from "../../../hooks/useCloudinary";
import { useUser } from "../../../store/user";

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
	const setUser = useUser((state) => state.setUserState);
	const language = useLanguage((state) => state.language);
	const [showPassword, setShowPassword] = useState(false);
	const [showRepass, setShowRepass] = useState(false);
	const [registrating, setRegistrating] = useState(false);
	const [isErr, setIsErr] = useState(false);
	const [errMessage, setErrMessage] = useState("");
	const register = useRegister();
	const uploadProfileImage = useUploadProfileImage();
	const navigate = useNavigate();

	async function onRegister(
		values: InitValuesType,
		action: FormikHelpers<InitValuesType>,
	) {
		try {
			setRegistrating(true);
			const fullName = values.fullName;
			const email = values.email;
			const phoneNumber = values.phoneNumber;
			const password = values.password;
			const repass = values.repass;
			const profileImage = values.profileImage;
			let profileImagePubliId = "";
			let profileImageUrl = "";

			if (profileImage) {
				const result = await uploadProfileImage(profileImage);
				profileImagePubliId = result.public_id;
				profileImageUrl = result.secure_url;
			}
			const newUser = await register({
				fullName,
				email,
				phoneNumber,
				password,
				repass,
				profileImagePubliId,
				profileImageUrl,
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
					<Activity mode={isErr ? "visible" : "hidden"}>
						<p className="inputError">{errMessage}</p>
					</Activity>
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
							required
						/>
					</div>
					<div className="input">
						<CustomInput
							type="text"
							name="email"
							label={language === "bg" ? "Имейл" : "Email"}
							id="email"
							required
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
							required
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
							required
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
					<Activity mode={registrating ? "visible" : "hidden"}>
						<button type="submit">
							{language === "bg"
								? "Регистриране"
								: "Registrating"}{" "}
							<span className="normal-loader"></span>
						</button>
					</Activity>
					<Activity mode={!registrating ? "visible" : "hidden"}>
						<button type="submit">
							{language === "bg" ? "Регистрирай се" : "Register"}
						</button>
					</Activity>
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
