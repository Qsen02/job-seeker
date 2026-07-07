import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../../../store/language";
import { useGetJobById } from "../../../hooks/useJobs";
import { useUser } from "../../../store/user";
import { Activity } from "react";
import Loader from "../../../commons/loader/Loader";
import ErrorMessage from "../../../commons/error_message/ErrorMessage";
import { logoErrorHandler } from "../../../utils/error_images";
import styles from "./JobDetails.module.css";

export default function JobDetails() {
	const { jobId } = useParams();
	const language = useLanguage((state) => state.language);
	const { job, setJob, loading, error } = useGetJobById(null, jobId);
	const user = useUser((state) => state.user);
	const date = job?.created_at ? new Date(job.created_at) : "";
	const navigate = useNavigate();
	const candidateIds: string[] | undefined = job?.candidatures.map(
		(el) => el.userId,
	) as string[] | undefined;

	return (
		<>
			<Outlet context={{ job, setJob }} />
			{loading && !error ? (
				<Loader />
			) : error ? (
				<ErrorMessage />
			) : (
				<section className={styles.wrapper}>
					<section className={styles.content}>
						<h1>{job?.title.trim() || ""}</h1>
						<div className={styles.description}>
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
								<button
									onClick={() =>
										navigate(`/jobs/${job?._id}/edit`)
									}
								>
									{language === "bg" ? "Редактирай" : "Edit"}
								</button>
								<button
									onClick={() =>
										navigate(`/jobs/${job?._id}/delete`)
									}
								>
									{language === "bg" ? "Изтрий" : "Delete"}
								</button>
							</Activity>
							<Activity
								mode={
									user &&
									user.role === "user" &&
									!candidateIds?.includes(user._id)
										? "visible"
										: "hidden"
								}
							>
								<button
									onClick={() =>
										navigate(`/jobs/${job?._id}/apply`)
									}
								>
									{language === "bg"
										? "Кандидатствай"
										: "Apply"}
								</button>
							</Activity>
							<Activity
								mode={
									user &&
									user.role === "user" &&
									candidateIds?.includes(user._id)
										? "visible"
										: "hidden"
								}
							>
								<p id={styles.successfullCandidate}>
									{language === "bg"
										? "Успешно кандидатствахте по тази обява!"
										: "Successfully apply for this job!"}
								</p>
							</Activity>
						</div>
					</section>
					<section className={styles.info}>
						<p id={styles.date}>
							{date != "" &&
								`${date.getDate()}.${date.getMonth() - 1}.${date.getFullYear()}`}
						</p>
						<div className={styles.companyInfo}>
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
						<div className={styles.jobInfo}>
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
						<Activity
							mode={user?.role === "admin" ? "visible" : "hidden"}
						>
							<div className="buttons">
								<button
									onClick={() =>
										navigate(
											`/jobs/${job?._id}/candidatures`,
										)
									}
								>
									{language === "bg"
										? "Кандидатури"
										: "Candidatures"}
								</button>
							</div>
						</Activity>
					</section>
				</section>
			)}
		</>
	);
}
