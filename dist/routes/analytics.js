"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const analytics_1 = __importDefault(require("../controllers/analytics"));
const auth_1 = __importDefault(require("../middleware/auth"));
const express_1 = require("express");
const analyticsRouter = (0, express_1.Router)();
// all task analytics for a user
analyticsRouter.get("/tasks", auth_1.default, analytics_1.default);
exports.default = analyticsRouter;
