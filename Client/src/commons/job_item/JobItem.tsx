import { Link } from "react-router-dom";
import type { Company } from "../../types/companies";
import { logoErrorHandler } from "../../utils/error_images";
import type { JobLevelType, JobType } from "../../types/jobs";
import styles from "./JobItem.module.css";
import { Activity } from "react";

interface JobItemProps {
	candidatureId?: string;
	jobId?: string;
	title: string;
	salary: number;
	company: Company;
	createdAt: string;
	level: JobLevelType;
	language: "bg" | "en";
	type: JobType;
	isCandidature?: boolean;
}

export default function JobItem({
	candidatureId,
	jobId,
	title,
	salary,
	company,
	createdAt,
	level,
	language,
	type,
	isCandidature = false,
}: JobItemProps) {
	const createdDate = new Date(createdAt);
	return (
		<>
			<Activity mode={isCandidature ? "visible" : "hidden"}>
				<Link
					to={`/candidatures/${candidatureId}`}
					className={styles.link}
				>
					<article className={styles.wrapper}>
						<div className={styles.jobInfo}>
							<p id={styles.date}>
								{createdDate.getDate()}.
								{createdDate.getMonth() + 1}.
								{createdDate.getFullYear()}
							</p>
							<h3>{title}</h3>
							<div>
								<p>
									{language === "bg" ? "Ниво" : "Level"}:{" "}
									{level}
								</p>
								<p>
									{language === "bg" ? "Заплата" : "Salary"}:{" "}
									{salary} &euro;
								</p>
								<p>
									{language === "bg" ? "Тип" : "Type"}: {type}
								</p>
							</div>
						</div>
						<div className={styles.companyInfo}>
							<img
								src={
									company.logo.url ||
									"/images/alt-company-image.jpg"
								}
								alt="Лого на фирма"
								onError={logoErrorHandler}
							/>
							<p>{company.name}</p>
						</div>
					</article>
				</Link>
			</Activity>
			<Activity mode={!isCandidature ? "visible" : "hidden"}>
				<Link to={`/jobs/${jobId}`} className={styles.link}>
					<article className={styles.wrapper}>
						<div className={styles.jobInfo}>
							<p id={styles.date}>
								{createdDate.getDate()}.
								{createdDate.getMonth() + 1}.
								{createdDate.getFullYear()}
							</p>
							<h3>{title}</h3>
							<div>
								<p>
									{language === "bg" ? "Ниво" : "Level"}:{" "}
									{level}
								</p>
								<p>
									{language === "bg" ? "Заплата" : "Salary"}:{" "}
									{salary} &euro;
								</p>
								<p>
									{language === "bg" ? "Тип" : "Type"}: {type}
								</p>
							</div>
						</div>
						<div className={styles.companyInfo}>
							<img
								src={
									company.logo.url ||
									"/images/alt-company-image.jpg"
								}
								alt="Лого на фирма"
								onError={logoErrorHandler}
							/>
							<p>{company.name}</p>
						</div>
					</article>
				</Link>
			</Activity>
		</>
	);
}
