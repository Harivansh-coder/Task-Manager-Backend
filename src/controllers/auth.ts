import { Request, Response } from "express";
import bcrypt from "bcrypt";
import generateToken from "@/utility/token";
import User from "@/models/user";

export const loginController = async (req: Request, res: Response) => {
  try {
    // get user from request object
    const { email, password } = req.body;

    // check if user exists for this email
    const user = await User.findOne({
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
    const isPasswordValid = await bcrypt.compare(password, user.password);

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
    const accessToken = generateToken(user.id);

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
  } catch (error: any) {
    // send error response
    res.status(500).send({
      status: false,
      errors: {
        error: error.errors,
      },
    });
  }
};

export const logoutController = (req: Request, res: Response) => {
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
  } catch (error: any) {
    // send error response
    res.status(500).send({
      status: false,
      errors: {
        error: error.errors,
      },
    });
  }
};
