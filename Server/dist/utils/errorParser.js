"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseError = parseError;
function parseError(errors) {
    return errors
        .array()
        .map((el) => el.msg)
        .join("\n");
}
