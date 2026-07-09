"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUser = isUser;
exports.isAdmin = isAdmin;
function isUser() {
    return function (req, res, next) {
        if (!req.cookies.token) {
            res.status(401).json({
                message: "You don't have credentials for this resource!",
            });
            return;
        }
        next();
    };
}
function isAdmin() {
    return function (req, res, next) {
        var _a;
        if (!req.cookies.token || ((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "admin") {
            res.status(401).json({
                message: "This resource requires administrative rights!",
            });
            return;
        }
        next();
    };
}
