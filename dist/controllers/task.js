"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTask = exports.getAllTask = exports.deleteTask = exports.updateTask = exports.createTask = void 0;
const task_1 = __importDefault(require("../models/task"));
// create task controller
const createTask = async (req, res) => {
    try {
        // get task data from request body
        const { title, description, priority, dueTime } = req.body;
        // get the logged in user id
        const userId = req.user?.id;
        // create a task
        const task = await task_1.default.create({
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
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: "An error occurred while creating the task",
        });
    }
};
exports.createTask = createTask;
// update task controller
const updateTask = async (req, res) => {
    try {
        // get the updated task data from request body
        const { title, description, priority, dueTime, status } = req.body;
        // get the task id from request parameters
        const taskId = req.params.id;
        // check if task exists
        const task = await task_1.default.findById(taskId);
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
        const updatedTask = await task_1.default.findByIdAndUpdate(taskId, {
            title,
            description,
            priority,
            dueTime,
            status,
            endTime: task.endTime,
        }, { new: true });
        // return response
        res.status(200).send({
            status: true,
            data: updatedTask,
        });
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: "An error occurred while updating the task",
        });
    }
};
exports.updateTask = updateTask;
// delete task controller
const deleteTask = async (req, res) => {
    try {
        // get the task id from request parameters
        const taskId = req.params.id;
        // check if task exists
        const task = await task_1.default.findById(taskId);
        if (!task) {
            res.status(404).send({
                status: false,
                message: "Task not found",
            });
            return;
        }
        // delete the task
        await task_1.default.findByIdAndDelete(taskId);
        // return response
        res.status(200).send({
            status: true,
            message: "Task deleted successfully",
        });
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: "An error occurred while deleting the task",
        });
    }
};
exports.deleteTask = deleteTask;
// get all tasks for the current user
// also adding query params to get tasks by status, priority
const getAllTask = async (req, res) => {
    try {
        // get the logged in user id
        const userId = req.user?.id;
        console.log(userId);
        console.log("Query params: ", req.query);
        // get query params
        const { status, priority } = req.query;
        // get all tasks for the user
        let tasks;
        // check if query params are available
        if (status && priority) {
            tasks = await task_1.default.find({
                userId,
                status: status,
                priority: parseInt(priority),
            });
        }
        else if (status) {
            tasks = await task_1.default.find({ userId, status: status });
        }
        else if (priority) {
            tasks = await task_1.default.find({
                userId,
                priority: parseInt(priority),
            });
        }
        else {
            tasks = await task_1.default.find({ userId });
        }
        // return response
        res.status(200).send({
            status: true,
            data: tasks,
        });
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: "An error occurred while fetching tasks",
        });
    }
};
exports.getAllTask = getAllTask;
// get a single task
const getTask = async (req, res) => {
    try {
        // get the task id from request parameters
        const taskId = req.params.id;
        // check if task exists
        const task = await task_1.default.findById(taskId);
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
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: "An error occurred while fetching the task",
        });
    }
};
exports.getTask = getTask;
