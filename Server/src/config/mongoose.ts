import mongoose from 'mongoose';

const localDB = "mongodb://127.0.0.1:27017/job-seeker-db";

export async function connectToDatabase() {
    try {
        await mongoose.connect(localDB);
        console.log('Database is running...');
    } catch (error) {
       console.log("Error connecting to the database:", error);
    }
}