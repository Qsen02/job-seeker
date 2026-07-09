"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.session = session;
const token_1 = require("../services/token");
function session() {
    return function (req, res, next) {
        const token = req.cookies.token;
        if (token && typeof token == "string") {
            try {
                const payload = (0, token_1.verifyToken)(token);
                req.user = payload;
            }
            catch (err) {
                res.clearCookie("token");
                res.status(403).json({
                    message: "You don't have credentials! Please login or register.",
                });
                return;
            }
        }
        next();
    };
}
