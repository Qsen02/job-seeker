import { useParams } from "react-router-dom";
import { useLanguage } from "../../../store/language";

export default function JobDetails() {
	const { jobId } = useParams();
	const language = useLanguage((state) => state.language);

	return (
		<section>
            <p>{jobId}</p>
		</section>
	);
}
