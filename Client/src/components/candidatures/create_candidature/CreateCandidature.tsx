import { Form, Formik, type FormikHelpers } from "formik";
import { useLanguage } from "../../../store/language";
import CustomInput from "../../../commons/customInput";
import { Activity, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useUploadCV } from "../../../hooks/useCloudinary";

import CustomTextarea from "../../../commons/customTextarea";
import { candidatureSchema, companySchema } from "../../../schemas";
import { useCreateCandidature } from "../../../hooks/useCandidatures";
import type { JobOutletContext } from "../../../types/contexts";
import { successfullNotification } from "../../../utils/notifications";

interface InitValuesType {
	link: string;
	description: string;
	cv: File | null;
}

export default function CreateCandidature() {
	const initValues: InitValuesType = {
		link: "",
		description: "",
		cv: null,
	};
	const { jobId } = useParams();
	const { job, setJob } = useOutletContext<JobOutletContext>();
	const language = useLanguage((state) => state.language);
	const [creating, setCreating] = useState(false);
	const [isErr, setIsErr] = useState(false);
	const [errMessage, setErrMessage] = useState("");
	const createCandidature = useCreateCandidature();
	const uploadCV = useUploadCV();
	const navigate = useNavigate();

	async function onCreate(
		values: InitValuesType,
		action: FormikHelpers<InitValuesType>,
	) {
		try {
			setCreating(true);
			const link = values.link;
			const description = values.description;
			const cv = values.cv;

			if (!cv) {
				throw new Error(
					language === "bg"
						? "CV-то е задължително!"
						: "CV are required!",
				);
			}
			const uploadedCV = await uploadCV(cv);
			const cvPublicId = uploadedCV.public_id;
			const cvUrl = uploadedCV.secure_url;

			const updatedJob = await createCandidature(jobId, {
				description,
				link,
				cvPublicId,
				cvUrl,
			});
			setJob(updatedJob);
			action.resetForm();
			navigate(`/jobs/${jobId}`);
			await successfullNotification(language === "bg" ? "Успешно кандидатствахте по обявата!" : "Applying for this job was successfull!");
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
				validationSchema={candidatureSchema(language)}
			>
				{(props) => (
					<Form className="form">
						<h1>
							{language === "bg"
								? `Кандидатствайте по обява ${job?.title} от тук`
								: `Apply for job ${job?.title} here`}
						</h1>
						<Activity mode={isErr ? "visible" : "hidden"}>
							<p className="inputError">{errMessage}</p>
						</Activity>
						<div className="input">
							<CustomInput
								type="text"
								name="link"
								label={language === "bg" ? "Линк" : "Link"}
								id="link"
							/>
						</div>
						<div className="input">
							<CustomInput
								type="file"
								name="cv"
								label="CV"
								id="cv"
								required
							/>
						</div>
						<div className="input">
							<CustomTextarea
								name="description"
								label={
									language === "bg"
										? "Мотивационно писмно"
										: "Motivational letter"
								}
								id="description"
								required
							/>
						</div>
						<div className="buttons">
							<Activity mode={creating ? "visible" : "hidden"}>
								<button
									type="submit"
									disabled={creating}
									className={creating ? "onLoading" : ""}
								>
									{language === "bg"
										? "Кандидатстване"
										: "Applying"}{" "}
									<span className="normal-loader"></span>
								</button>
							</Activity>
							<Activity mode={!creating ? "visible" : "hidden"}>
								<button type="submit">
									{language === "bg"
										? "Кандидатствай"
										: "Apply"}
								</button>
							</Activity>
							<button
								type="button"
								className={creating ? "onLoading" : ""}
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
