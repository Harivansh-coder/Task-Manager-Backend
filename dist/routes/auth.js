"use strict";
// contains all routes for the user services
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../controllers/auth");
const validate_1 = __importDefault(require("../middleware/validate"));
const user_1 = __importDefault(require("../schema/user"));
const express_1 = __importDefault(require("express"));
const authRouter = express_1.default.Router();
// Login route
authRouter.post("/login", (0, validate_1.default)(user_1.default.pick({
    email: true,
    password: true,
})), auth_1.loginController);
// logout route
authRouter.get("/logout", auth_1.logoutController);
exports.default = authRouter;
