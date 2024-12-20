"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const verifyAccessToken = (req, res, next) => {
    // Get access token from header
    const accessToken = req.headers.authorization?.split(" ")[1];
    // Check if access token exists
    if (!accessToken) {
        res.status(401).send({
            status: false,
            errors: {
                message: "Unauthorized",
            },
        });
        return; // Explicitly stop execution
    }
    // Verify access token
    jsonwebtoken_1.default.verify(accessToken, env_1.envVariables.JWT_SECRET_KEY, (err, decoded) => {
        if (err || !decoded) {
            res.status(401).send({
                status: false,
                errors: {
                    message: "Unauthorized",
                },
            });
            return; // Explicitly stop execution
        }
        // Cast decoded payload to JWTPayload type
        const jwtPayload = decoded;
        // Attach the user id to the request user object
        req.user = { id: jwtPayload.id };
        next(); // Pass control to the next middleware/handler
    });
};
exports.default = verifyAccessToken;
