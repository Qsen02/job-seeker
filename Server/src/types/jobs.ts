import { Types } from "mongoose";

export type JobType = "remote" | "on-site" | "hybrid";

export interface DescriptionItem { 
    title: string;
    content: string;
}

export type JobLevelType = "junior" | "mid" | "senior";

export interface Job { 
    _id: Types.ObjectId;
    title: string;
    description: DescriptionItem[];
    level: JobLevelType;
    companyId: Types.ObjectId;
    candidatures: Types.ObjectId[];
    type: JobType;
    salary: number;
}