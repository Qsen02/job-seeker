import { Activity } from "react";
import { Link } from "react-router-dom";
import styles from "./JobCandidaturesItem.module.css"

interface JobCandidatureItemProps {
	id: string;
	userName: string;
	profileImage: string;
}

export default function JobCandidatureItem({
	id,
	userName,
	profileImage,
}: JobCandidatureItemProps) {
	return (
        <Link to={`/candidatures/${id}`} className={ styles.link}>
            <article className={ styles.wrapper}>
				<Activity mode={profileImage.trim() ? "visible" : "hidden"}>
					<img src={profileImage} alt="Профилна снимка" />
				</Activity>
				<Activity mode={!profileImage.trim() ? "visible" : "hidden"}>
					<i className="fa-solid fa-circle-user"></i>
				</Activity>
				<p>{userName}</p>
			</article>
		</Link>
	);
}
