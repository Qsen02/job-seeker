import type { FileType } from "./companies";
import type { Job } from "./jobs";
import type { User } from "./users";

export type CandidatureStatus = "pending" | "accepted" | "rejected";

export interface Candidature {
	_id: string;
	userId: User;
	jobId: Job;
	cv: FileType;
	description: string;
	link: string;
	status: CandidatureStatus;
}
