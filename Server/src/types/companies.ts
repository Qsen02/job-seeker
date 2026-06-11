import { Types } from "mongoose";

export interface Company {
    _id: Types.ObjectId;
    name: string;
    description: string;
    location: string;
    logo: string;
    phone: string;
    email: string;
    address: string;
    jobs: Types.ObjectId[];
    owner: Types.ObjectId;
}