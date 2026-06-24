import { Form, Formik, type FormikHelpers } from "formik";
import { useLanguage } from "../../../store/language";
import CustomInput from "../../../commons/customInput";
import { Activity, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import CustomTextarea from "../../../commons/customTextarea";
import { companySchema, jobSchema } from "../../../schemas";
import type { JobLevelType, JobType } from "../../../types/jobs";
import { useHideScroller } from "../../../hooks/useLoadingError";
import CustomSelect from "../../../commons/customSelect";
import { jobLevels, jobTypes } from "../../../data/items";
import type { CompanyOutletContext } from "../../../types/contexts";
import { useCreateJob } from "../../../hooks/useJobs";

interface InitValuesType {
	title: string;
	description: string;
	type: JobType | "default";
	salary: number;
	level: JobLevelType | "default";
}

export default function CreateJob() {
	const initValues: InitValuesType = {
		title: "",
		description: "",
		type: "default",
		salary: 0,
		level: "default",
	};
	useHideScroller();
	const { companyId } = useParams();
	const language = useLanguage((state) => state.language);
	const [creating, setCreating] = useState(false);
	const [isErr, setIsErr] = useState(false);
	const { setCompany } = useOutletContext<CompanyOutletContext>();
	const [errMessage, setErrMessage] = useState("");
	const navigate = useNavigate();
	const createJob = useCreateJob();

	async function onCreate(
		values: InitValuesType,
		action: FormikHelpers<InitValuesType>,
	) {
		try {
			setCreating(true);
			const title = values.title;
			const description = values.description;
			const type = values.type;
			const salary = values.salary;
			const level = values.level;

			const newJob = await createJob(companyId, {
				title,
				description,
				type,
				salary,
				level,
			});
			setCompany((prev) => {
				if (prev?.jobs) {
					const jobs = prev.jobs;
					prev.jobs = [...jobs, newJob];
				}
				return prev;
			});
			action.resetForm();
			navigate(`/companies/${companyId}`);
		} catch (err) {
			setCreating(false);
			setIsErr(true);
			if (err instanceof Error) {
				setErrMessage(err.message);
			}
			return;
		} finally {
			setCreating(false);
		}
	}

	return (
		<div className="modal">
			<Formik
				key={language}
				initialValues={initValues}
				onSubmit={onCreate}
				validationSchema={jobSchema(language)}
			>
				{(props) => (
					<Form className="form modal-form">
						<h1>
							{language === "bg"
								? "Създайте нова обява тук"
								: "Create new job here"}
						</h1>
						<Activity mode={isErr ? "visible" : "hidden"}>
							<p className="inputError">{errMessage}</p>
						</Activity>
						<div className="input">
							<CustomInput
								type="text"
								name="title"
								label={language === "bg" ? "Заглавие" : "Title"}
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
								label={language === "bg" ? "Тип" : "Type"}
								name="type"
								id="type"
								required
							>
								{jobTypes.map((el) => (
									<option key={el.value} value={el.value}>
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
								label={language === "bg" ? "Ниво" : "Level"}
								name="level"
								id="level"
								required
							>
								{jobLevels.map((el) => (
									<option key={el.value} value={el.value}>
										{el.label}
									</option>
								))}
							</CustomSelect>
						</div>
						<div className="input">
							<CustomInput
								type="number"
								name="salary"
								label={language === "bg" ? "Заплата" : "Salary"}
								id="salary"
								required
							/>
						</div>
						<div className="buttons">
							<Activity mode={creating ? "visible" : "hidden"}>
								<button type="submit">
									{language === "bg"
										? "Създаване"
										: "Creating"}{" "}
									<span className="normal-loader"></span>
								</button>
							</Activity>
							<Activity mode={!creating ? "visible" : "hidden"}>
								<button type="submit">
									{language === "bg" ? "Създай" : "Create"}
								</button>
							</Activity>
							<button
								type="button"
								disabled={creating}
								onClick={() => history.back()}
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
