"use strict";
// contains all routes for the task services
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_1 = require("../controllers/task");
const auth_1 = __importDefault(require("../middleware/auth"));
const validate_1 = __importDefault(require("../middleware/validate"));
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const taskRouter = express_1.default.Router();
// GET a task or all tasks
taskRouter.get("/", auth_1.default, task_1.getAllTask);
// get a task by id
taskRouter.get("/:id", auth_1.default, task_1.getTask);
// create a task
taskRouter.post("/", auth_1.default, (0, validate_1.default)(
// define the schema for the request body
zod_1.z.object({
    title: zod_1.z.string().min(3).max(100),
    dueTime: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    priority: zod_1.z.number().int().min(1).max(5).default(1),
})), task_1.createTask);
// update a task
taskRouter.put("/:id", auth_1.default, task_1.updateTask);
// delete a task
taskRouter.delete("/:id", auth_1.default, task_1.deleteTask);
exports.default = taskRouter;
