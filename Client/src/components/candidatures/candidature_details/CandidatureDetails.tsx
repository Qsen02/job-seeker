import { useParams } from "react-router-dom";
import { useLanguage } from "../../../store/language";
import { useGetCandidatureById } from "../../../hooks/useCandidatures";
import Loader from "../../../commons/loader/Loader";
import ErrorMessage from "../../../commons/error_message/ErrorMessage";
import JobItem from "../../../commons/job_item/JobItem";
import { Activity } from "react";
import { useUser } from "../../../store/user";
import styles from "./CandidatureDetails.module.css";

export default function CandidatureDetails() {
	const lanuguage = useLanguage((state) => state.language);
	const user = useUser((state) => state.user);
	const { candidatureId } = useParams();
	const { candidature, loading, error } = useGetCandidatureById(
		null,
		candidatureId,
	);

	return (
		<>
			{loading && !error ? (
				<Loader />
			) : error ? (
				<ErrorMessage />
			) : (
				<section className={styles.wrapper}>
					<section className={styles.userInfo}>
						<h1>
							{lanuguage === "bg"
								? `Кандидатура на ${candidature?.userId.fullName}`
								: `Candidature of ${candidature?.userId.fullName}`}
						</h1>
						<Activity
							mode={
								candidature?.userId.profileImage.url.trim()
									? "visible"
									: "hidden"
							}
						>
							<img
								src={candidature?.userId.profileImage.url}
								alt="Профилна снимка"
							/>
						</Activity>
						<Activity
							mode={
								!candidature?.userId.profileImage.url.trim()
									? "visible"
									: "hidden"
							}
						>
							<i className="fa-solid fa-circle-user"></i>
						</Activity>
						<Activity
							mode={lanuguage === "bg" ? "visible" : "hidden"}
						>
							<p>
								Имейл:{" "}
								<a
									className={styles.link}
									href={`mailto:${candidature?.userId.email}`}
								>
									{candidature?.userId.email}
								</a>
							</p>
							<p>
								Телефонен номер:{" "}
								<a
									className={styles.link}
									href={`tel:${candidature?.userId.phoneNumber}`}
								>
									{candidature?.userId.phoneNumber}
								</a>
							</p>
						</Activity>
						<Activity
							mode={lanuguage === "en" ? "visible" : "hidden"}
						>
							<p>
								Email:{" "}
								<a
									className={styles.link}
									href={`mailto:${candidature?.userId.email}`}
								>
									{candidature?.userId.email}
								</a>
							</p>
							<p>
								Phone number:{" "}
								<a
									className={styles.link}
									href={`tel:${candidature?.userId.phoneNumber}`}
								>
									{candidature?.userId.phoneNumber}
								</a>
							</p>
						</Activity>
					</section>
					<h2>
						{lanuguage === "bg"
							? "Обява по която е кандидатствана:"
							: "Job that was applyed for:"}
					</h2>
					{candidature && (
						<JobItem
							id={candidature?.jobId._id}
							title={candidature?.jobId.title}
							salary={candidature.jobId.salary}
							company={candidature.jobId.companyId}
							createdAt={candidature.jobId.created_at}
							level={candidature.jobId.level}
							language={lanuguage}
							type={candidature.jobId.type}
						/>
					)}
					<section className={styles.candidatureInfo}>
						<h2>
							{lanuguage === "bg"
								? "Данни на кандидатурата"
								: "Data about candidature"}
						</h2>
						<div>
							<a
								href={candidature?.cv.url}
								download
								target="_blank"
								className={styles.download}
							>
								{lanuguage === "bg" ? "Отвори CV" : "Open CV"}
								<i className="fa-solid fa-download"></i>
							</a>
						</div>
						<div>
							<p className={styles.bold}>
								{lanuguage === "bg" ? "Линк:" : "Link:"}
							</p>
							{candidature?.link ? (
								<a
									href={candidature.link}
									target="_blank"
									className={styles.link}
								>
									{candidature.link}
								</a>
							) : (
								<p>
									{lanuguage === "bg"
										? "Не е добавен линк"
										: "Link did't add"}
								</p>
							)}
						</div>
						<div>
							<p className={styles.bold}>
								{lanuguage === "bg" ? "Съобщение:" : "Message:"}
							</p>
							<p>{candidature?.description}</p>
						</div>
						<div className="buttons">
							<Activity
								mode={
									user?.role === "user" &&
									candidature?.userId._id === user.id
										? "visible"
										: "hidden"
								}
							>
								<button>
									{lanuguage === "bg" ? "Изтрий" : "Delete"}
								</button>
							</Activity>
							<Activity
								mode={
									user?.role === "admin"
										? "visible"
										: "hidden"
								}
							>
								<button>
									{lanuguage === "bg" ? "Приеми" : "Accept"}
								</button>
								<button>
									{lanuguage === "bg" ? "Откажи" : "Decline"}
								</button>
							</Activity>
						</div>
					</section>
				</section>
			)}
		</>
	);
}
