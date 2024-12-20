"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVariables = void 0;
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
// Load the .env file
dotenv_1.default.config();
// Define the schema for the .env file
const envSchema = zod_1.z.object({
    PORT: zod_1.z
        .string()
        .default("3000")
        .transform((val) => parseInt(val)),
    MONGODB_URI: zod_1.z.string().trim(),
    JWT_SECRET_KEY: zod_1.z.string().trim(),
});
// Validate the .env file
const env = envSchema.safeParse({
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
});
if (!env.success) {
    throw new Error(env.error.errors[0].message);
}
exports.envVariables = env.data;
