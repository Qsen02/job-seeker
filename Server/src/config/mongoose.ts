import mongoose from "mongoose";
import dns from "node:dns";
import dotenv from "dotenv";
dotenv.config();

if (process.env.NODE_ENV === "development") {
	dns.setServers(["8.8.8.8", "1.1.1.1"]);
}

const localDB = "mongodb://127.0.0.1:27017/job-seeker-db";

export async function connectToDatabase() {
	try {
		await mongoose.connect(process.env.DB_URI || localDB);
		console.log("Database is running...");
	} catch (error) {
		console.log("Error connecting to the database:", error);
	}
}
