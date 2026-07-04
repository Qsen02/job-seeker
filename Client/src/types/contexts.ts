import type { Candidature } from "./candidatures";
import type { Company } from "./companies";
import type { Job } from "./jobs";
import type { User } from "./users";

export interface CompanyOutletContext {
	company: Company | null;
	setCompany: React.Dispatch<React.SetStateAction<Company | null>>;
}

export interface JobOutletContext {
	job: Job | null;
	setJob: React.Dispatch<React.SetStateAction<Job | null>>;
}

export interface CandidatureOutletContext {
	candidature: Candidature | null;
}

export interface UserOutletContext {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
