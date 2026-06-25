import type { Company } from "./companies";
import type { Job } from "./jobs";

export interface CompanyOutletContext {
	company: Company | null;
	setCompany: React.Dispatch<React.SetStateAction<Company | null>>;
}

export interface JobOutletContext {
	job: Job | null;
	setJob: React.Dispatch<React.SetStateAction<Job | null>>;
}
