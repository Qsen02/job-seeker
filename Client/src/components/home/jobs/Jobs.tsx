import JobItem from "../../../commons/job_item/JobItem";
import type { Job } from "../../../types/jobs";
import styles from "./Jobs.module.css";

interface JobsProps {
	jobs: Job[];
	language: "bg" | "en";
}

export default function Jobs({ jobs, language }: JobsProps) {
	return (
		<section className={styles.wrapper}>
			{jobs.length === 0 ? (
				<p className={styles.error}>
					{language === "bg"
						? "Няма обяви за работа все още"
						: "No jobs yet"}
				</p>
			) : (
				jobs.map((el) => (
					<JobItem
						key={el._id}
						id={el._id}
						title={el.title}
						company={el.companyId}
						level={el.level}
						salary={el.salary}
						createdAt={el.created_at}
						language={language}
						type={el.type}
					/>
				))
			)}
		</section>
	);
}
