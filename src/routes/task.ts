// contains all routes for the task services

import {
  createTask,
  deleteTask,
  getAllTask,
  getTask,
  updateTask,
} from "@/controllers/task";
import verifyAccessToken from "@/middleware/auth";
import express from "express";

const taskRouter = express.Router();

// GET a task or all tasks
taskRouter.get(
  "/:id?",
  verifyAccessToken,
  (req: express.Request, res: express.Response) => {
    if (req.params.id) {
      getTask(req, res);
    } else {
      getAllTask(req, res);
    }
  }
);

// create a task
taskRouter.post("/", verifyAccessToken, createTask);

// update a task
taskRouter.put("/:id", verifyAccessToken, updateTask);

// delete a task
taskRouter.delete("/:id", verifyAccessToken, deleteTask);

export default taskRouter;
