import { Types } from "mongoose";

export type CandidatureStatus = "pending" | "accepted" | "rejected";

export interface Candidature {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    jobId: Types.ObjectId;
    status: CandidatureStatus;
}