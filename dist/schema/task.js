"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// userSchema in zod for request body validation
const zod_1 = require("zod");
const taskSchema = zod_1.z.object({
    title: zod_1.z.string().min(3),
    description: zod_1.z.string().optional(),
    priority: zod_1.z.number().int(),
    dueTime: zod_1.z.date(),
    endTime: zod_1.z.date().optional(),
    userId: zod_1.z.number().int(),
    status: zod_1.z.string().default("pending"),
});
exports.default = taskSchema;
