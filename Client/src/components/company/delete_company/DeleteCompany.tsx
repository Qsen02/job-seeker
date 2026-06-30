import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useLanguage } from "../../../store/language";
import { Activity, useState } from "react";
import type { CompanyOutletContext } from "../../../types/contexts";
import { useDeleteCompany } from "../../../hooks/useCompanies";
import { useHideScroller } from "../../../hooks/useLoadingError";
import { successfullNotification } from "../../../utils/notifications";

export default function DeleteCompany() {
	useHideScroller();
	const language = useLanguage((state) => state.language);
	const navigate = useNavigate();
	const [deleting, setDeleting] = useState(false);
	const { companyId } = useParams();
	const { company } = useOutletContext<CompanyOutletContext>();
	const deleteCompany = useDeleteCompany();

	async function onDelete() {
		try {
			setDeleting(true);
			await deleteCompany(companyId);
			navigate("/");
			await successfullNotification(language === "bg" ? "Успешно изтрихте компанията" : "The company was deleted successfully!");
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
						? `Сигурни ли сте че искате да изтриете компанията ${company?.name}?`
						: `Are you sure want to delete the company ${company?.name}?`}
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
