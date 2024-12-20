// contains all routes for the task services

import {
  createTask,
  deleteMultipleTasks,
  deleteTask,
  getAllTask,
  getTask,
  updateTask,
} from "@/controllers/task";
import verifyAccessToken from "@/middleware/auth";
import validateRequestBody from "@/middleware/validate";
import express from "express";
import { z } from "zod";

const taskRouter = express.Router();

// GET a task or all tasks
taskRouter.get("/", verifyAccessToken, getAllTask);

// get a task by id
taskRouter.get("/:id", verifyAccessToken, getTask);

// create a task
taskRouter.post(
  "/",
  verifyAccessToken,
  validateRequestBody(
    // define the schema for the request body
    z.object({
      title: z.string().min(3).max(100),
      dueTime: z.string(),
      description: z.string().optional(),
      priority: z.number().int().min(1).max(5).default(1),
    })
  ),
  createTask
);

// update a task
taskRouter.put("/:id", verifyAccessToken, updateTask);

// delete a task
taskRouter.delete("/:id", verifyAccessToken, deleteTask);

// delete multiple tasks
taskRouter.delete("/", verifyAccessToken, deleteMultipleTasks);

export default taskRouter;
