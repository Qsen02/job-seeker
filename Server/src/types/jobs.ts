import { Types } from "mongoose";

export type JobType = "remote" | "on-site" | "hybrid";

export interface DescriptionItem { 
    title: string;
    content: string;
}

export interface Job { 
    _id: Types.ObjectId;
    title: string;
    description: DescriptionItem[];
    companyId: Types.ObjectId;
    candidatures: Types.ObjectId[];
    type: JobType;
    salary: number;
}