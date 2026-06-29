import { useParams } from "react-router-dom";
import { useGetCandidaturesForJob } from "../../../hooks/useCandidatures";
import Loader from "../../../commons/loader/Loader";
import ErrorMessage from "../../../commons/error_message/ErrorMessage";
import { useLanguage } from "../../../store/language";
import JobCandidatureItem from "./job_candidature_item/JobCandidatureItem";
import styles from "./JobCandidatures.module.css";
import { useHideScroller } from "../../../hooks/useLoadingError";

export default function JobCandidatures() {
	useHideScroller();
	const language = useLanguage((state) => state.language);
	const { jobId } = useParams();
	const { candidatures, loading, error } = useGetCandidaturesForJob(
		[],
		jobId,
	);

	return (
		<>
			{loading && !error ? (
				<Loader />
			) : error ? (
				<ErrorMessage />
			) : (
				<div className="modal">
					<section className={styles.wrapper}>
						<button onClick={() => history.back()}>
							<i className="fa-solid fa-xmark"></i>
						</button>
						<h1>
							{language === "bg"
								? `Кандидатури за обява ${candidatures[0]?.jobId?.title || ""}`
								: `Candidatures for job ${candidatures[0]?.jobId?.title || ""}`}
						</h1>
						<section className={styles.candidatures}>
							{candidatures.length === 0 ? (
								<p className={styles.message}>
									{language === "bg"
										? "Няма кандидатури към тази обява все още"
										: "No candidatures for this job yet"}
								</p>
							) : (
								candidatures.map((el) => (
									<JobCandidatureItem
										key={el._id}
										id={el._id}
										userName={el.userId.fullName}
										profileImage={
											el.userId.profileImage.url
										}
										status={el.status}
										language={language}
									/>
								))
							)}
						</section>
					</section>
				</div>
			)}
		</>
	);
}
