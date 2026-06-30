import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useHideScroller } from "../../../hooks/useLoadingError";
import { useLanguage } from "../../../store/language";
import { Activity, useState } from "react";
import type { JobOutletContext } from "../../../types/contexts";
import { useDeleteJob } from "../../../hooks/useJobs";
import { successfullNotification } from "../../../utils/notifications";

export default function DeleteJob() {
	useHideScroller();
	const language = useLanguage((state) => state.language);
	const navigate = useNavigate();
	const [deleting, setDeleting] = useState(false);
	const { jobId } = useParams();
	const { job } = useOutletContext<JobOutletContext>();
	const deleteJob = useDeleteJob();

	async function onDelete() {
		try {
			setDeleting(true);
			await deleteJob(job?.companyId._id, jobId);
			navigate("/");
			await successfullNotification(language==="bg"?"Обявата е изтрита успешно!":"The job was deleted successfully!")
		} catch (err) {
			setDeleting(false);
			navigate("/404");
			return;
		} finally {
			setDeleting(false);
		}
	}

	return (
		<div className="modal">
			<section className="choise-modal">
				<p>
					{language === "bg"
						? `Сигурни ли сте че искате да изтриете обявата ${job?.title}?`
						: `Are you sure want to delete the job ${job?.title}?`}
				</p>
				<div className="buttons">
					<Activity mode={deleting ? "visible" : "hidden"}>
						<button
							disabled={deleting}
							className={deleting ? "onLoading" : ""}
						>
							{language === "bg" ? "Изтриване" : "Deleting"}{" "}
							<span className="normal-loader"></span>
						</button>
					</Activity>
					<Activity mode={!deleting ? "visible" : "hidden"}>
						<button onClick={onDelete}>
							{language === "bg" ? "Да" : "Yes"}
						</button>
					</Activity>
					<button
						onClick={() => history.back()}
						disabled={deleting}
						className={deleting ? "onLoading" : ""}
					>
						{language === "bg" ? "Не" : "No"}
					</button>
				</div>
			</section>
		</div>
	);
}
