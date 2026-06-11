import Express from 'express';
import dotenv from "dotenv";
import { expressConfig } from './config/express';

dotenv.config();

const app = Express();
const port = process.env.PORT || 3000;

async function start() {
    expressConfig(app);

    app.listen(port, () => { 
        console.log(`Server is running on port ${port}`);
    })
}

start();