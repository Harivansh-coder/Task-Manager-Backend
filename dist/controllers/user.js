"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.deleteUser = exports.updateUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
// create user controller
// create user controller
const createUser = async (req, res) => {
    try {
        // get user data from request body
        const { name, email, password } = req.body;
        // check if user exists
        const userExists = await user_1.default.findOne({
            email,
        });
        if (userExists) {
            res.status(400).send({
                status: false,
                errors: {
                    message: "User already exists",
                },
            });
            return;
        }
        // hash the password
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // create a user
        const user = await user_1.default.create({
            name,
            email,
            password: hashedPassword,
        });
        // return response
        res.status(201).send({
            status: true,
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: "An error occurred while creating the user",
        });
    }
};
exports.createUser = createUser;
// update user controller
const updateUser = async (req, res) => {
    try {
        // get the updated user data from request body
        const { name, email, password } = req.body;
        // get the user id from request parameters
        const userId = req.params.id;
        // check if user exists
        const user = await user_1.default.findById;
        if (!user) {
            res.status(404).send({
                status: false,
                errors: {
                    message: "User not found",
                },
            });
            return;
        }
        // hash the password
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // update the user
        await user_1.default.updateOne({
            _id: userId,
        }, {
            name,
            email,
            password: hashedPassword,
        });
        res.send({
            status: true,
            data: {
                message: "User updated successfully",
            },
        });
        // return response
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: "An error occurred while updating the user",
        });
    }
};
exports.updateUser = updateUser;
// delete user controller
const deleteUser = async (req, res) => {
    try {
        // get the user id from request parameters
        const userId = req.params.id;
        // check if user exists
        const user = await user_1.default.findById(userId);
        if (!user) {
            res.status(404).send({
                status: false,
                errors: {
                    message: "User not found",
                },
            });
            return;
        }
        // delete the user
        await user_1.default.deleteOne({
            _id: userId,
        });
        res.send({
            status: true,
            data: {
                message: "User deleted successfully",
            },
        });
    }
    catch (error) {
        res.status(500).send({
            status: false,
            errors: {
                error: error.errors,
            },
        });
    }
};
exports.deleteUser = deleteUser;
// get user controller
const getUser = async (req, res) => {
    try {
        // get the user id from request parameters
        const userId = req.params.id;
        // check if user id exists
        if (userId) {
            const user = (await user_1.default.findById(userId)) || null;
            if (!user) {
                res.status(404).send({
                    status: false,
                    errors: {
                        message: "User not found",
                    },
                });
                return;
            }
            res.send({
                status: true,
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            });
        }
        // get all users
        const users = await user_1.default.find();
        res.send({
            status: true,
            data: users.map((user) => ({
                id: user.id,
                name: user.name,
                email: user.email,
            })),
        });
    }
    catch (error) {
        res.status(500).send({
            status: false,
            errors: {
                error: error.errors,
            },
        });
    }
};
exports.getUser = getUser;
