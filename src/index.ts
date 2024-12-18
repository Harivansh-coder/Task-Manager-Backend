import express from "express";
import { envVariables } from "@/config/env";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import userRouter from "./routes/user";
import authRouter from "./routes/auth";
import taskRouter from "./routes/task";
import mongoose from "mongoose";

// create a new express application instance
const app = express();

// middleware for parsing application/json
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// define a route handler for the default home page
app.get("/v1", (_req: express.Request, res: express.Response) => {
  res.send("API is running");
});

// connect to the database
mongoose
  .connect(envVariables.MONGODB_URI, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB: ", error.message);
  });

// Use the routes
app.use("/v1/auth", authRouter);
app.use("/v1/users", userRouter);
app.use("/v1/tasks", taskRouter);

// Export the app for Vercel
export default app;

// Start server locally when not in a serverless environment
if (process.env.NODE_ENV !== "production") {
  const port = envVariables.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
}
