import express,{ Express } from "express";
import { setCors } from "../middlewares/cors";
import cookiesParser from "cookie-parser";
import dotenv from "dotenv";
import { session } from "../middlewares/session";
dotenv.config();

export function expressConfig(app: Express) {
    app.use(setCors());
    app.use(cookiesParser(process.env.COOKIE_SECRET));
    app.use(session());
    app.use(express.json());
}