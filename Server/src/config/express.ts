import express,{ Express } from "express";
import { setCors } from "../middlewares/cors";

export function expressConfig(app: Express) {
    app.use(setCors());
    app.use(express.json());
}