"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressConfig = expressConfig;
const express_1 = __importDefault(require("express"));
const cors_1 = require("../middlewares/cors");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const session_1 = require("../middlewares/session");
dotenv_1.default.config();
function expressConfig(app) {
    app.use((0, cors_1.setCors)());
    app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
    app.use((0, session_1.session)());
    app.use(express_1.default.json());
}
