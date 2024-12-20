"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutController = exports.loginController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../utility/token"));
const user_1 = __importDefault(require("../models/user"));
const loginController = async (req, res) => {
    try {
        // get user from request object
        const { email, password } = req.body;
        // check if user exists for this email
        const user = await user_1.default.findOne({
            email,
        });
        if (!user) {
            res.status(404).send({
                status: false,
                errors: {
                    message: "User not found",
                },
            });
            return;
        }
        // compare password
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).send({
                status: false,
                errors: {
                    message: "Invalid password",
                },
            });
            return;
        }
        // generate access token
        const accessToken = (0, token_1.default)(user.id);
        // set access token in cookie
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
        });
        // send success response
        res.send({
            status: true,
            data: {
                accessToken,
            },
        });
    }
    catch (error) {
        // send error response
        res.status(500).send({
            status: false,
            errors: {
                error: error.errors,
            },
        });
    }
};
exports.loginController = loginController;
const logoutController = (req, res) => {
    try {
        // clear the cookie
        res.clearCookie("accessToken");
        // send success response
        res.send({
            status: true,
            data: {
                message: "Logout successful",
            },
        });
    }
    catch (error) {
        // send error response
        res.status(500).send({
            status: false,
            errors: {
                error: error.errors,
            },
        });
    }
};
exports.logoutController = logoutController;
