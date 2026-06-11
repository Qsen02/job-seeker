import "./models/index";
import Express from 'express';
import dotenv from "dotenv";
import { expressConfig } from './config/express';
import { connectToDatabase } from './config/mongoose';

dotenv.config();

const app = Express();
const port = process.env.PORT || 3000;

async function start() {
    await connectToDatabase();
    expressConfig(app);

    app.listen(port, () => { 
        console.log(`Server is running on port ${port}`);
    })
}

start();