"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerConfig = routerConfig;
const users_1 = require("../controllers/users");
const companies_1 = require("../controllers/companies");
const jobs_1 = require("../controllers/jobs");
const candidatures_1 = require("../controllers/candidatures");
function routerConfig(app) {
    app.use("/users", users_1.userRouter);
    app.use("/companies", companies_1.companyRouter);
    app.use("/jobs", jobs_1.jobsRouter);
    app.use("/candidatures", candidatures_1.candidaturesRouter);
    app.use((req, res) => {
        res.status(404).json({ message: "Resource not found!" });
    });
}
