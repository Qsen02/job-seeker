import { Link, useParams } from "react-router-dom";
import { useLanguage } from "../../../store/language";
import { useGetJobById } from "../../../hooks/useJobs";
import { useUser } from "../../../store/user";
import { Activity } from "react";
import Loader from "../../../commons/loader/Loader";
import ErrorMessage from "../../../commons/error_message/ErrorMessage";
import { logoErrorHandler } from "../../../utils/error_images";

export default function JobDetails() {
	const { jobId } = useParams();
	const language = useLanguage((state) => state.language);
	const { job, setJob, loading, error } = useGetJobById(null, jobId);
	const user = useUser((state) => state.user);
	const date = job?.created_at ? new Date(job.created_at) : "";

	return (
		<>
			{loading && !error ? (
				<Loader />
			) : error ? (
				<ErrorMessage />
			) : (
				<section>
					<section>
						<h1>{job?.title.trim() || ""}</h1>
						<div>
							{job?.description.map((el, i) => (
								<>
									{el.startsWith("#") ? (
										<h2 key={i}>{el.replace("#", "")}</h2>
									) : (
										<p key={i}>{el}</p>
									)}
								</>
							))}
						</div>
						<div className="buttons">
							<Activity
								mode={
									user && user.role === "admin"
										? "visible"
										: "hidden"
								}
							>
								<button>
									{language === "bg" ? "Редактирай" : "Edit"}
								</button>
								<button>
									{language === "bg" ? "Изтрий" : "Delete"}
								</button>
							</Activity>
							<Activity
								mode={
									user && user.role === "user"
										? "visible"
										: "hidden"
								}
							>
								<button>
									{language === "bg"
										? "Кандидатствай"
										: "Apply"}
								</button>
							</Activity>
						</div>
					</section>
					<section>
						<p>
							{date != "" &&
								`${date.getDate()}.${date.getMonth() - 1}.${date.getFullYear()}`}
						</p>
						<div>
							<img
								src={
									job?.companyId.logo.url ||
									"/images/alt-company-image.jpg"
								}
								alt="Лого на фирма"
								onError={logoErrorHandler}
							/>
							<Link to={`/companies/${job?.companyId._id}`}>
								{job?.companyId.name}
							</Link>
						</div>
						<div>
							<p>
								{language === "bg" ? "Заплата:" : "Salary:"}{" "}
								{job?.salary} &euro;
							</p>
							<p>
								{language === "bg" ? "Тип:" : "Type:"}{" "}
								{job?.type}
							</p>
							<p>
								{language === "bg" ? "Ниво:" : "Level:"}{" "}
								{job?.level}
							</p>
						</div>
					</section>
				</section>
			)}
		</>
	);
}
