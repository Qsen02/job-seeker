import { Form, Formik, type FormikHelpers } from "formik";
import { useLanguage } from "../../../store/language";
import CustomInput from "../../../commons/customInput";
import { Activity, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUploadLogo } from "../../../hooks/useCloudinary";

import CustomTextarea from "../../../commons/customTextarea";
import { useCreateCompany } from "../../../hooks/useCompanies";
import { companySchema } from "../../../schemas";

interface InitValuesType {
	name: string;
	description: string;
	location: string;
	phone: string;
	email: string;
	address: string;
	logo: File | null;
}

export default function RegisterCompany() {
	const initValues: InitValuesType = {
		name: "",
		description: "",
		location: "",
		phone: "",
		email: "",
		address: "",
		logo: null,
	};
	const language = useLanguage((state) => state.language);
	const [registrating, setRegistrating] = useState(false);
	const [isErr, setIsErr] = useState(false);
	const [errMessage, setErrMessage] = useState("");
	const createCompany = useCreateCompany();
	const uploadLogo = useUploadLogo();
	const navigate = useNavigate();

	async function onRegister(
		values: InitValuesType,
		action: FormikHelpers<InitValuesType>,
	) {
		try {
			setRegistrating(true);
			const name = values.name;
			const description = values.description;
			const phone = values.phone;
			const email = values.email;
			const address = values.address;
			const logo = values.logo;
			const location = values.location;

			if (!logo) {
				throw new Error(
					language === "bg"
						? "Логото е задължително!"
						: "Logo are required!",
				);
			}
			const uploadedLogo = await uploadLogo(logo);
			const logoPublicId = uploadedLogo.public_id;
			const logoUrl = uploadedLogo.secure_url;

			await createCompany({
				name,
				description,
				phone,
				email,
				address,
				logoPublicId,
				logoUrl,
				location,
			});

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
			validationSchema={companySchema(language)}
		>
			{(props) => (
				<Form className="form">
					<h1>
						{language === "bg"
							? "Регистрирай своята фирма тук"
							: "Register your company here"}
					</h1>
					<Activity mode={isErr ? "visible" : "hidden"}>
						<p className="inputError">{errMessage}</p>
					</Activity>
					<div className="input">
						<CustomInput
							type="text"
							name="name"
							label={language === "bg" ? "Име" : "Name"}
							id="name"
							required
							placeholder="Fintech"
						/>
					</div>
					<div className="input">
						<CustomInput
							type="text"
							name="email"
							label={language === "bg" ? "Имейл" : "Email"}
							id="email"
							required
							placeholder="fintech@gmail.com"
						/>
					</div>
					<div className="input">
						<CustomInput
							type="text"
							name="phone"
							label={
								language === "bg"
									? "Телефонен номер"
									: "Phone number"
							}
							id="phone"
							required
							placeholder="0874738493"
						/>
					</div>
					<div className="input">
						<CustomInput
							type="file"
							name="logo"
							label={
								language === "bg"
									? "Лого на фирма"
									: "Company logo"
							}
							id="logo"
							required
						/>
					</div>
					<div className="input">
						<CustomTextarea
							name="description"
							label={
								language === "bg"
									? "Описание на фирмата"
									: "Company description"
							}
							id="description"
							required
							placeholder={
								language === "bg"
									? "Fintech е компания за IT услуги с дългогодишен опит."
									: "Fintech is company for IT services with many years of experience."
							}
						/>
					</div>
					<div className="input">
						<CustomInput
							type="text"
							name="location"
							label={language === "bg" ? "Локация" : "Location"}
							id="location"
							required
							placeholder={
								language === "bg"
									? "Бургас, България"
									: "Burgas, Bulgaria"
							}
						/>
					</div>
					<div className="input">
						<CustomInput
							type="text"
							name="address"
							label={language === "bg" ? "Адрес" : "Address"}
							id="address"
							required
							placeholder={
								language === "bg"
									? "жк.Възраждане, ул.Любен Каравелов 42"
									: "Vazrazhdane district, 42 Lyuben Karavelov street"
							}
						/>
					</div>
					<Activity mode={registrating ? "visible" : "hidden"}>
						<button
							type="submit"
							disabled={registrating}
							className={registrating ? "onLoading" : ""}
						>
							{language === "bg"
								? "Регистриране"
								: "Registrating"}{" "}
							<span className="normal-loader"></span>
						</button>
					</Activity>
					<Activity mode={!registrating ? "visible" : "hidden"}>
						<button
							type="submit"
						>
							{language === "bg" ? "Регистрирай" : "Register"}
						</button>
					</Activity>
				</Form>
			)}
		</Formik>
	);
}
