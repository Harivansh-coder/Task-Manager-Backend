"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// userSchema in zod for request body validation
const zod_1 = require("zod");
const userSchema = zod_1.z.object({
    name: zod_1.z.string().min(3),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
});
exports.default = userSchema;
