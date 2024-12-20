"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
// user model for mongodb
const User = mongoose_2.default.models.User ||
    (0, mongoose_1.model)("User", userSchema);
exports.default = User;
