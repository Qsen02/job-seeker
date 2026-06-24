import { Link } from "react-router-dom";
import type { Company } from "../../types/companies";
import { logoErrorHandler } from "../../utils/error_images";
import type { JobLevelType, JobType } from "../../types/jobs";
import styles from "./JobItem.module.css";
import { link } from "framer-motion/client";

interface JobItemProps {
	id: string;
	title: string;
	salary: number;
	company: Company;
	createdAt: string;
	level: JobLevelType;
	language: "bg" | "en";
	type: JobType;
}

export default function JobItem({
	id,
	title,
	salary,
	company,
	createdAt,
	level,
	language,
	type,
}: JobItemProps) {
	const createdDate = new Date(createdAt);
	return (
		<Link to={`/jobs/${id}`} className={styles.link}>
			<article className={styles.wrapper}>
				<div className={styles.jobInfo}>
					<p id={styles.date}>
						{createdDate.getDate()}.{createdDate.getMonth() + 1}.
						{createdDate.getFullYear()}
					</p>
					<h3>{title}</h3>
					<div>
						<p>
							{language === "bg" ? "Ниво" : "Level"}: {level}
						</p>
						<p>
							{language === "bg" ? "Заплата" : "Salary"}: {salary}{" "}
							&euro;
						</p>
						<p>
							{language === "bg" ? "Тип" : "Type"}: {type}
						</p>
					</div>
				</div>
				<div className={styles.companyInfo}>
					<img
						src={
							company.logo.url || "/images/alt-company-image.jpg"
						}
						alt="Лого на фирма"
						onError={logoErrorHandler}
					/>
					<p>{company.name}</p>
				</div>
			</article>
		</Link>
	);
}
