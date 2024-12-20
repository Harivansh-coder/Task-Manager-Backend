"use strict";
// token utility function to generate token
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const generateToken = (userID) => {
    const token = jsonwebtoken_1.default.sign({
        id: userID,
    }, env_1.envVariables.JWT_SECRET_KEY, {
        expiresIn: "1h",
    });
    return token;
};
exports.default = generateToken;
