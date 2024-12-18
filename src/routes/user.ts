// contains all routes for the user services

import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "@/controllers/user";
import validateRequestBody from "@/middleware/validate";
import userSchema from "@/schema/user";

const userRouter = express.Router();

// GET a user or all users
userRouter.get("/:id?", getUser);

// create a user
userRouter.post(
  "/register",
  validateRequestBody(
    userSchema.pick({
      name: true,
      email: true,
      password: true,
    })
  ),
  createUser
);

// update a user
userRouter.put("/:id", updateUser);

// delete a user
userRouter.delete("/:id", deleteUser);

export default userRouter;
