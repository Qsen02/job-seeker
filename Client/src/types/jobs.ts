import type { Candidature } from "./candidatures";
import type { Company } from "./companies";

export type JobType = "remote" | "on-site" | "hybrid";

export type JobLevelType = "junior" | "mid" | "senior";

export interface Job {
	_id: string;
	title: string;
	description: String[];
	level: JobLevelType;
	companyId: Company;
	candidatures: Candidature[];
	type: JobType;
	salary: number;
	created_at: string;
}
