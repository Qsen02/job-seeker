import { Form, Formik, type FormikHelpers } from "formik";
import { useLanguage } from "../../../store/language";
import CustomInput from "../../../commons/customInput";
import { Activity, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { editUserSchema } from "../../../schemas";
import { useEditUser, useGetUserById } from "../../../hooks/useUsers";
import { useUploadProfileImage } from "../../../hooks/useCloudinary";
import { useUser } from "../../../store/user";
import type { UserOutletContext } from "../../../types/contexts";
import Loader from "../../../commons/loader/Loader";
import ErrorMessage from "../../../commons/error_message/ErrorMessage";
import { failedNotification, successfullNotification } from "../../../utils/notifications";

interface InitValuesType {
	fullName: string;
	email: string;
	phoneNumber: string;
	profileImage: File | null;
}

export default function EditUser() {
	const changeUser = useUser((state) => state.setUserState);
	const { user: curUser, setUser } = useOutletContext<UserOutletContext>();
	const { user, loading, error } = useGetUserById(null, curUser?._id);
	const initValues: InitValuesType = {
		fullName: user?.fullName || "",
		email: user?.email || "",
		phoneNumber: user?.phoneNumber || "",
		profileImage: null,
	};
	const language = useLanguage((state) => state.language);
	const [editing, setEditing] = useState(false);
	const [isErr, setIsErr] = useState(false);
	const [errMessage, setErrMessage] = useState("");
	const editUser = useEditUser();
	const uploadProfileImage = useUploadProfileImage();
	const navigate = useNavigate();

	async function onEdit(
		values: InitValuesType,
		action: FormikHelpers<InitValuesType>,
	) {
		try {
			setEditing(true);
			const fullName = values.fullName;
			const email = values.email;
			const phoneNumber = values.phoneNumber;
			const profileImage = values.profileImage;
			let profileImagePubliId = "";
			let profileImageUrl = "";

			if (profileImage) {
				const result = await uploadProfileImage(profileImage);
				profileImagePubliId = result.public_id;
				profileImageUrl = result.secure_url;
			}
			const updatedUser = await editUser(curUser?._id, {
				fullName,
				email,
				phoneNumber,
				profileImagePubliId,
				profileImageUrl,
			});
			setUser(updatedUser);
			changeUser({
				_id: updatedUser._id,
				email: updatedUser.email,
				fullName: updatedUser.fullName,
				role: updatedUser.role,
				profileImage: updatedUser.profileImage,
				phoneNumber: updatedUser.phoneNumber,
			});
			action.resetForm();
			navigate("/profile");
			await successfullNotification(
				language === "bg"
					? "Успешно редактирахте профила си!"
					: "Your profile was edited successfully!",
			);
		} catch (err) {
			setEditing(false);
			setIsErr(true);
			if (err instanceof Error) {
				setErrMessage(err.message);
            }
            await failedNotification(
				language === "bg"
					? "Грешка при редактиране на профила!"
					: "Error while editing the profile!",
			);
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
				<Formik
					key={language}
					initialValues={initValues}
					onSubmit={onEdit}
					validationSchema={editUserSchema(language)}
				>
					{(props) => (
						<div className="modal">
							<Form className="form">
								<h1>
									{language === "bg"
										? "Редактирай профила си тук"
										: "Edit your profile here"}
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
										label={
											language === "bg"
												? "Имейл"
												: "Email"
										}
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
												? "Запази промените"
												: "Save Changes"}
										</button>
									</Activity>

									<button
										type="button"
										onClick={() => navigate("/profile")}
										disabled={editing}
										className={editing ? "onLoading" : ""}
									>
										{language === "bg"
											? "Отмени"
											: "Cancel"}
									</button>
								</div>
							</Form>
						</div>
					)}
				</Formik>
			)}
		</>
	);
}
