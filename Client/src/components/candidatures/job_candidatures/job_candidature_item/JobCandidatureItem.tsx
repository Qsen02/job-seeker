import { Activity } from "react";
import { Link } from "react-router-dom";
import styles from "./JobCandidaturesItem.module.css";
import type { CandidatureStatus } from "../../../../types/candidatures";

interface JobCandidatureItemProps {
	id: string;
	userName: string;
	profileImage: string;
	status: CandidatureStatus;
	language: "bg" | "en";
}

export default function JobCandidatureItem({
	id,
	userName,
	profileImage,
	status,
	language,
}: JobCandidatureItemProps) {
	return (
		<Link to={`/candidatures/${id}`} className={styles.link}>
			<article className={styles.wrapper}>
				<Activity mode={profileImage.trim() ? "visible" : "hidden"}>
					<img src={profileImage} alt="Профилна снимка" />
				</Activity>
				<Activity mode={!profileImage.trim() ? "visible" : "hidden"}>
					<i className="fa-solid fa-circle-user"></i>
				</Activity>
				<p>{userName}</p>
				<Activity mode={status === "pending" ? "visible" : "hidden"}>
					<p className={styles.status}>
						<i className="fa-regular fa-clock"></i>{" "}
						{language === "bg" ? "В изчакване" : "Pending"}
					</p>
				</Activity>
				<Activity mode={status === "accepted" ? "visible" : "hidden"}>
					<p className={styles.status}>
						<i className="fa-regular fa-circle-check"></i>{" "}
						{language === "bg" ? "Приета" : "Accepted"}
					</p>
				</Activity>
				<Activity mode={status === "rejected" ? "visible" : "hidden"}>
					<p className={styles.status}>
						<i className="fa-regular fa-circle-xmark"></i>{" "}
						{language === "bg" ? "Отказана" : "Rejected"}
					</p>
				</Activity>
			</article>
		</Link>
	);
}
