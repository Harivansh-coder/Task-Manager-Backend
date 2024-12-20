import Task from "@/models/task";
import express from "express";

// create task controller
export const createTask = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // get task data from request body
    const { title, description, priority, dueTime } = req.body;

    // get the logged in user id
    const userId = req.user?.id as string;

    // create a task
    const task = await Task.create({
      title,
      description,
      priority,
      startTime: new Date().toISOString(),
      dueTime,
      userId,
    });

    // return response
    res.status(201).send({
      status: true,
      data: task,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "An error occurred while creating the task",
    });
  }
};

// update task controller
export const updateTask = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // get the updated task data from request body
    const { title, description, priority, dueTime, status } = req.body;

    // get the task id from request parameters
    const taskId = req.params.id;

    // check if task exists
    const task = await Task.findById(taskId);
    if (!task) {
      res.status(404).send({
        status: false,
        message: "Task not found",
      });
      return;
    }

    // if status is finished, set the endTime
    if (status === "finished") {
      task.endTime = new Date();
    }

    // update the task
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        title,
        description,
        priority,
        dueTime,
        status,
        endTime: task.endTime,
      },
      { new: true }
    );

    // return response
    res.status(200).send({
      status: true,
      data: updatedTask,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "An error occurred while updating the task",
    });
  }
};

// delete task controller
export const deleteTask = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // get the task id from request parameters
    const taskId = req.params.id;

    // check if task exists
    const task = await Task.findById(taskId);

    if (!task) {
      res.status(404).send({
        status: false,
        message: "Task not found",
      });
      return;
    }

    // delete the task
    await Task.findByIdAndDelete(taskId);

    // return response
    res.status(200).send({
      status: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "An error occurred while deleting the task",
    });
  }
};

// get all tasks for the current user
// also adding query params to get tasks by status, priority
export const getAllTask = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // get the logged in user id
    const userId = req.user?.id as string;

    // get query params
    const { status, priority } = req.query;

    // get all tasks for the user
    let tasks;

    // check if query params are available
    if (
      status &&
      priority &&
      (status === "pending" || status === "finished") &&
      parseInt(priority as string) >= 1 &&
      parseInt(priority as string) <= 5
    ) {
      tasks = await Task.find({
        userId,
        status: status as string,
        priority: parseInt(priority as string),
      });
    } else if (status) {
      tasks = await Task.find({ userId, status: status as string });
    } else if (priority) {
      tasks = await Task.find({
        userId,
        priority: parseInt(priority as string),
      });
    } else {
      tasks = await Task.find({ userId });
    }

    // return response
    res.status(200).send({
      status: true,
      data: tasks,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "An error occurred while fetching tasks",
    });
  }
};

// get a single task
export const getTask = async (req: express.Request, res: express.Response) => {
  try {
    // get the task id from request parameters
    const taskId = req.params.id;

    // check if task exists
    const task = await Task.findById(taskId);
    if (!task) {
      res.status(404).send({
        status: false,
        message: "Task not found",
      });
      return;
    }

    if (!task) {
      res.status(404).send({
        status: false,
        message: "Task not found",
      });
      return;
    }

    // return response
    res.status(200).send({
      status: true,
      data: task,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "An error occurred while fetching the task",
    });
  }
};
