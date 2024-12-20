"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_1 = require("./config/env");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const user_1 = __importDefault(require("./routes/user"));
const auth_1 = __importDefault(require("./routes/auth"));
const task_1 = __importDefault(require("./routes/task"));
const mongoose_1 = __importDefault(require("mongoose"));
const analytics_1 = __importDefault(require("./routes/analytics"));
// create a new express application instance
const app = (0, express_1.default)();
// middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("combined"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// define a route handler for the default home page
app.get("/v1", (_req, res) => {
    res.send("API is running");
});
// connect to the database
mongoose_1.default
    .connect(env_1.envVariables.MONGODB_URI, {})
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((error) => {
    console.error("Error connecting to MongoDB: ", error.message);
});
// Use the routes
app.use("/v1/auth", auth_1.default);
app.use("/v1/users", user_1.default);
app.use("/v1/tasks", task_1.default);
app.use("/v1/analytics", analytics_1.default);
// Export the app for Vercel
exports.default = app;
// Start server locally when not in a serverless environment
if (process.env.NODE_ENV !== "production") {
    const port = env_1.envVariables.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });
}
