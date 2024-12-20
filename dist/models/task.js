"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const taskSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    startTime: {
        type: Date,
        required: true,
    },
    dueTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    status: {
        type: String,
        default: "pending",
    },
    priority: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
// task model for mongodb
const Task = mongoose_2.default.models.Task ||
    (0, mongoose_1.model)("Task", taskSchema);
exports.default = Task;
