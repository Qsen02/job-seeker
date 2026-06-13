import type { Job } from "./jobs";
import type { User } from "./users";

export interface FileType {
	publicId: string;
	url: string;
}

export interface Company {
	_id: string;
	name: string;
	description: string;
	location: string;
	logo: FileType;
	phone: string;
	email: string;
	address: string;
	jobs: Job[];
	owner: User;
}
