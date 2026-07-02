import JobItem from "../../../../commons/job_item/JobItem";
import { useGetCandidaturesForUser } from "../../../../hooks/useCandidatures";
import type { UserAttributes } from "../../../../types/users";

interface UserCandidaturesProps {
	curUser: UserAttributes | null;
	language: "bg" | "en";
}

export default function UserCandidatures({
	curUser,
	language,
}: UserCandidaturesProps) {
	const { candidatures } = useGetCandidaturesForUser([], curUser?._id);
	return (
		<>
			<h2>
				{language === "bg"
					? "Обяви по които е кандидатствано"
					: "Jobs applied for"}
			</h2>
			<section>
				{candidatures.length > 0 ? (
					candidatures.map((el) => (
						<JobItem
							key={el.jobId._id}
							candidatureId={el._id}
							jobId={el.jobId._id}
							title={el.jobId.title}
							salary={el.jobId.salary}
							company={el.jobId.companyId}
							createdAt={el.jobId.created_at}
							level={el.jobId.level}
							language={language}
							type={el.jobId.type}
							isCandidature={true}
						/>
					))
				) : (
					<p>
						{language === "bg"
							? "Няма обяви, за които сте кандидатствали."
							: "No jobs applied for."}
					</p>
				)}
			</section>
		</>
	);
}
