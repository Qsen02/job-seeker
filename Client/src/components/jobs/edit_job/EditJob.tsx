import { Form, Formik, type FormikHelpers } from "formik";
import { useLanguage } from "../../../store/language";
import CustomInput from "../../../commons/customInput";
import { Activity, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import CustomTextarea from "../../../commons/customTextarea";
import { jobSchema } from "../../../schemas";
import type { JobLevelType, JobType } from "../../../types/jobs";
import { useHideScroller } from "../../../hooks/useLoadingError";
import CustomSelect from "../../../commons/customSelect";
import { jobLevels, jobTypes } from "../../../data/items";
import type { JobOutletContext } from "../../../types/contexts";
import { useEditJob, useGetJobById } from "../../../hooks/useJobs";
import Loader from "../../../commons/loader/Loader";
import ErrorMessage from "../../../commons/error_message/ErrorMessage";
import { successfullNotification } from "../../../utils/notifications";

interface InitValuesType {
	title: string;
	description: string;
	type: JobType | "default";
	salary: number;
	level: JobLevelType | "default";
}

export default function EditJob() {
	const { jobId } = useParams();
	const { job, loading, error } = useGetJobById(null, jobId);
	const initValues: InitValuesType = {
		title: job?.title || "",
		description: job?.description.join("\n") || "",
		type: job?.type || "default",
		salary: job?.salary || 0,
		level: job?.level || "default",
	};
	useHideScroller();
	const language = useLanguage((state) => state.language);
	const [editing, setEditing] = useState(false);
	const [isErr, setIsErr] = useState(false);
	const { setJob } = useOutletContext<JobOutletContext>();
	const [errMessage, setErrMessage] = useState("");
	const navigate = useNavigate();
	const editJob = useEditJob();

	async function onEdit(
		values: InitValuesType,
		action: FormikHelpers<InitValuesType>,
	) {
		try {
			setEditing(true);
			const title = values.title;
			const description = values.description;
			const type = values.type;
			const salary = values.salary;
			const level = values.level;

			const updatedJob = await editJob(jobId, {
				title,
				description,
				type,
				salary,
				level,
			});
			setJob(updatedJob);
			action.resetForm();
			navigate(`/jobs/${jobId}`);
			await successfullNotification(
				language === "bg"
					? "Обявата е редактирана успешно"
					: "The job was edited successfully!",
			);
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
						validationSchema={jobSchema(language)}
					>
						{(props) => (
							<Form className="form modal-form">
								<h1>
									{language === "bg"
										? `Редактирайте обявата ${job?.title} тук`
										: `Edit job ${job?.title} here`}
								</h1>
								<Activity mode={isErr ? "visible" : "hidden"}>
									<p className="inputError">{errMessage}</p>
								</Activity>
								<div className="input">
									<CustomInput
										type="text"
										name="title"
										label={
											language === "bg"
												? "Заглавие"
												: "Title"
										}
										id="name"
										required
									/>
								</div>
								<div className="input">
									<CustomTextarea
										name="description"
										label={
											language === "bg"
												? "Описание на обявата"
												: "Job description"
										}
										id="description"
										required
									/>
								</div>
								<div className="input">
									<CustomSelect
										defaultOption={
											language === "bg"
												? "Изберете тип"
												: "Choose type"
										}
										label={
											language === "bg" ? "Тип" : "Type"
										}
										name="type"
										id="type"
										required
									>
										{jobTypes.map((el) => (
											<option
												key={el.value}
												value={el.value}
											>
												{language === "bg"
													? el.labelBG
													: el.labelEN}
											</option>
										))}
									</CustomSelect>
								</div>
								<div className="input">
									<CustomSelect
										defaultOption={
											language === "bg"
												? "Изберете ниво"
												: "Choose level"
										}
										label={
											language === "bg" ? "Ниво" : "Level"
										}
										name="level"
										id="level"
										required
									>
										{jobLevels.map((el) => (
											<option
												key={el.value}
												value={el.value}
											>
												{el.label}
											</option>
										))}
									</CustomSelect>
								</div>
								<div className="input">
									<CustomInput
										type="number"
										name="salary"
										label={
											language === "bg"
												? "Заплата"
												: "Salary"
										}
										id="salary"
										required
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
