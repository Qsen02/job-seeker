import { Form, Formik, type FormikHelpers } from "formik";
import { useLanguage } from "../../../store/language";
import CustomInput from "../../../commons/customInput";
import { Activity, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useUploadLogo } from "../../../hooks/useCloudinary";

import CustomTextarea from "../../../commons/customTextarea";
import { useEditCompany, useGetCompanyById } from "../../../hooks/useCompanies";
import { companySchema } from "../../../schemas";
import type { CompanyOutletContext } from "../../../types/contexts";
import ErrorMessage from "../../../commons/error_message/ErrorMessage";
import Loader from "../../../commons/loader/Loader";
import { useHideScroller } from "../../../hooks/useLoadingError";
import { successfullNotification } from "../../../utils/notifications";

interface InitValuesType {
	name: string;
	description: string;
	location: string;
	phone: string;
	email: string;
	address: string;
	logo: File | null;
}

export default function EditCompany() {
	useHideScroller();
	const { companyId } = useParams();
	const { setCompany } = useOutletContext<CompanyOutletContext>();
	const { company, loading, error } = useGetCompanyById(null, companyId);
	const initValues: InitValuesType = {
		name: company?.name || "",
		description: company?.description || "",
		location: company?.location || "",
		phone: company?.phone || "",
		email: company?.email || "",
		address: company?.address || "",
		logo: null,
	};
	const language = useLanguage((state) => state.language);
	const [editing, setEditing] = useState(false);
	const [isErr, setIsErr] = useState(false);
	const [errMessage, setErrMessage] = useState("");
	const editCompany = useEditCompany();
	const uploadLogo = useUploadLogo();
	const navigate = useNavigate();

	async function onEdit(
		values: InitValuesType,
		action: FormikHelpers<InitValuesType>,
	) {
		try {
			setEditing(true);
			const name = values.name;
			const description = values.description;
			const phone = values.phone;
			const email = values.email;
			const address = values.address;
			const logo = values.logo;
			const location = values.location;
			let logoPublicId = null;
			let logoUrl = null;

			if (logo) {
				const uploadedLogo = await uploadLogo(logo);
				logoPublicId = uploadedLogo.public_id;
				logoUrl = uploadedLogo.secure_url;
			}

			const updatedCompany = await editCompany(companyId, {
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
			setCompany(updatedCompany);
			await successfullNotification(language==="bg"?"Компанията е редактирана успешно!":"The company was edited successfully!")
			navigate(`/companies/${companyId}`);
		} catch (err) {
			setEditing(false);
			setIsErr(true);
			if (err instanceof Error) {
				setErrMessage(err.message);
			}
			return;
		} finally {
			setEditing(false);
		}
	}

	return (
		<>
			{loading && !error ? (
				<Loader />
			) : error ? (
				<ErrorMessage />
			) : (
				<div className="modal">
					<Formik
						key={language}
						initialValues={initValues}
						onSubmit={onEdit}
						validationSchema={companySchema(language)}
					>
						{(props) => (
							<Form className="form modal-form">
								<h1>
									{language === "bg"
										? `Редактирай компания ${company?.name} тук`
										: `Edit company ${company?.name} here`}
								</h1>
								<Activity mode={isErr ? "visible" : "hidden"}>
									<p className="inputError">{errMessage}</p>
								</Activity>
								<div className="input">
									<CustomInput
										type="text"
										name="name"
										label={
											language === "bg" ? "Име" : "Name"
										}
										id="name"
										required
										placeholder="Fintech"
									/>
								</div>
								<div className="input">
									<CustomInput
										type="text"
										name="email"
										label={
											language === "bg"
												? "Имейл"
												: "Email"
										}
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
										label={
											language === "bg"
												? "Локация"
												: "Location"
										}
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
										label={
											language === "bg"
												? "Адрес"
												: "Address"
										}
										id="address"
										required
										placeholder={
											language === "bg"
												? "жк.Възраждане, ул.Любен Каравелов 42"
												: "Vazrazhdane district, 42 Lyuben Karavelov street"
										}
									/>
								</div>
								<div className="buttons">
									<Activity
										mode={editing ? "visible" : "hidden"}
									>
										<button
											type="submit"
											disabled={editing}
											className={
												editing ? "onLoading" : ""
											}
										>
											{language === "bg"
												? "Редактиране"
												: "Editing"}{" "}
											<span className="normal-loader"></span>
										</button>
									</Activity>
									<Activity
										mode={!editing ? "visible" : "hidden"}
									>
										<button type="submit">
											{language === "bg"
												? "Запази"
												: "Save"}
										</button>
									</Activity>
									<button
										type="button"
										disabled={editing}
										className={editing ? "onLoading" : ""}
										onClick={() => history.back()}
									>
										{language === "bg"
											? "Отмени"
											: "Cancel"}
									</button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			)}
		</>
	);
}
