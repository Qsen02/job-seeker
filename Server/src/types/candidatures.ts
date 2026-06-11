import { Types } from "mongoose";
import { FileType } from "./companies";

export type CandidatureStatus = "pending" | "accepted" | "rejected";

export interface Candidature {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    jobId: Types.ObjectId;
    cv: FileType;
    description: string;
    link: string;
    status: CandidatureStatus;
}