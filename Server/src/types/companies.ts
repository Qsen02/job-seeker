import { Types } from "mongoose";

export interface FileType {
	publicId: string;
	url: string;
}

export interface Company {
    _id: Types.ObjectId;
    name: string;
    description: string;
    location: string;
    logo: FileType;
    phone: string;
    email: string;
    address: string;
    jobs: Types.ObjectId[];
    owner: Types.ObjectId;
}