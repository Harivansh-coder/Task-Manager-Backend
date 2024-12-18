// contains all routes for the user services

import { loginController, logoutController } from "@/controllers/auth";
import validateRequestBody from "@/middleware/validate";
import userSchema from "@/schema/user";
import express from "express";

const authRouter = express.Router();

// Login route
authRouter.post(
  "/login",
  validateRequestBody(
    userSchema.pick({
      email: true,
      password: true,
    })
  ),
  loginController
);

// logout route
authRouter.get("/logout", logoutController);

export default authRouter;
