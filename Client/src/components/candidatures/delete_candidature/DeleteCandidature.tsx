import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useHideScroller } from "../../../hooks/useLoadingError";
import { useLanguage } from "../../../store/language";
import { Activity, useState } from "react";
import type { CandidatureOutletContext } from "../../../types/contexts";
import { useDeleteCandidature } from "../../../hooks/useCandidatures";
import { successfullNotification } from "../../../utils/notifications";

export default function DeleteCandidature() {
	useHideScroller();
	const language = useLanguage((state) => state.language);
	const navigate = useNavigate();
	const [deleting, setDeleting] = useState(false);
	const { candidatureId } = useParams();
	const { candidature } = useOutletContext<CandidatureOutletContext>();
	const deleteCandidature = useDeleteCandidature();

	async function onDelete() {
		try {
			setDeleting(true);
			await deleteCandidature(candidature?.jobId._id, candidatureId);
			navigate(`/jobs/${candidature?.jobId._id}`);
		} catch (err) {
			setDeleting(false);
			navigate("/404");
			return;
		} finally {
			setDeleting(false);
			await successfullNotification(
				language === "bg"
					? "Успешно изтрихте кандидатурата"
					: "The Candidature was deleted successfully!",
			);
		}
	}

	return (
		<div className="modal">
			<section className="choise-modal">
				<p>
					{language === "bg"
						? `Сигурни ли сте че искате да изтриете кандидатурата по обява ${candidature?.jobId?.title}?`
						: `Are you sure want to delete candidature about job ${candidature?.jobId?.title}?`}
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
