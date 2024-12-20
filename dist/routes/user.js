"use strict";
// contains all routes for the user services
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const validate_1 = __importDefault(require("../middleware/validate"));
const user_2 = __importDefault(require("../schema/user"));
const userRouter = express_1.default.Router();
// GET a user or all users
userRouter.get("/:id?", user_1.getUser);
// create a user
userRouter.post("/register", (0, validate_1.default)(user_2.default.pick({
    name: true,
    email: true,
    password: true,
})), user_1.createUser);
// update a user
userRouter.put("/:id", user_1.updateUser);
// delete a user
userRouter.delete("/:id", user_1.deleteUser);
exports.default = userRouter;
