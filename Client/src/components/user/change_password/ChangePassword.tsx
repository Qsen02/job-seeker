import { Form, Formik, type FormikHelpers } from "formik";
import { useLanguage } from "../../../store/language";
import CustomInput from "../../../commons/customInput";
import { Activity, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { changePasswordSchema } from "../../../schemas";
import {
	failedNotification,
	successfullNotification,
} from "../../../utils/notifications";
import type { UserOutletContext } from "../../../types/contexts";
import { useChangePassword } from "../../../hooks/useUsers";

interface InitValuesType {
	password: string;
}

export default function ChangePassword() {
	const initValues: InitValuesType = {
		password: "",
	};
	const { user } = useOutletContext<UserOutletContext>();
	const language = useLanguage((state) => state.language);
	const [showPassword, setShowPassword] = useState(false);
	const [changing, setChanging] = useState(false);
	const [isErr, setIsErr] = useState(false);
	const [errMessage, setErrMessage] = useState("");
	const changePassword = useChangePassword();
	const navigate = useNavigate();

	async function onChange(
		values: InitValuesType,
		action: FormikHelpers<InitValuesType>,
	) {
		try {
			setChanging(true);
			const password = values.password;

			await changePassword(user?._id, {
				password,
			});
			action.resetForm();
			navigate("/profile");
		} catch (err) {
			setChanging(false);
			setIsErr(true);
			if (err instanceof Error) {
				setErrMessage(err.message);
			}
			await failedNotification(
				language === "bg"
					? "Грешка при промяна на паролата"
					: "Error while changing the password!",
			);
			return;
		} finally {
			setChanging(false);
			await successfullNotification(
				language === "bg"
					? "Паролата е променена успешно"
					: "Password was changed successfully!",
			);
		}
	}

	return (
		<div className="modal">
			<Formik
				key={language}
				initialValues={initValues}
				onSubmit={onChange}
				validationSchema={changePasswordSchema(language)}
			>
				{(props) => (
					<Form className="form">
						<h1>
							{language === "bg"
								? "Променете паролата си от тук"
								: "Change your password here"}
						</h1>
						<Activity mode={isErr ? "visible" : "hidden"}>
							<p className="inputError">{errMessage}</p>
						</Activity>
						<div className="input">
							<CustomInput
								type={showPassword ? "text" : "password"}
								name="password"
								label={
									language === "bg" ? "Парола" : "Password"
								}
								id="password"
								autoComplete="on"
								required
							/>
							<Activity
								mode={showPassword ? "visible" : "hidden"}
							>
								<i
									className="fa-regular fa-eye"
									onClick={() => setShowPassword(false)}
								></i>
							</Activity>
							<Activity
								mode={!showPassword ? "visible" : "hidden"}
							>
								<i
									className="fa-regular fa-eye-slash"
									onClick={() => setShowPassword(true)}
								></i>
							</Activity>
						</div>
						<div className="buttons">
							<Activity mode={changing ? "visible" : "hidden"}>
								<button
									type="submit"
									disabled={changing}
									className={changing ? "onLoading" : ""}
								>
									{language === "bg"
										? "Променяне"
										: "Changing"}{" "}
									<span className="normal-loader"></span>
								</button>
							</Activity>
							<Activity mode={!changing ? "visible" : "hidden"}>
								<button type="submit">
									{language === "bg" ? "Запази" : "Save"}
								</button>
							</Activity>
							<button
								type="button"
								onClick={() => navigate("/profile")}
								disabled={changing}
								className={changing ? "onLoading" : ""}
							>
								{language === "bg" ? "Отмени" : "Cancel"}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
}
