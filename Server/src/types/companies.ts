import { Types } from "mongoose";

export interface Company {
    _id: Types.ObjectId;
    name: string;
    description: string;
    location: string;
    logo: string;
    jobs: Types.ObjectId[];
    owner: Types.ObjectId;
}