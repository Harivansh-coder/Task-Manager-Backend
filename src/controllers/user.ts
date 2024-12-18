import express from "express";
import bcrypt from "bcrypt";
import User from "@/models/user";

// create user controller

// create user controller
export const createUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // get user data from request body
    const { name, email, password } = req.body;

    // check if user exists
    const userExists = await User.findOne({
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
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a user
    const user = await User.create({
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
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "An error occurred while creating the user",
    });
  }
};

// update user controller
export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // get the updated user data from request body
    const { name, email, password } = req.body;

    // get the user id from request parameters
    const userId = req.params.id;

    // check if user exists
    const user = await User.findById;
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
    const hashedPassword = await bcrypt.hash(password, 10);

    // update the user
    await User.updateOne(
      {
        _id: userId,
      },
      {
        name,
        email,
        password: hashedPassword,
      }
    );

    res.send({
      status: true,
      data: {
        message: "User updated successfully",
      },
    });

    // return response
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "An error occurred while updating the user",
    });
  }
};

// delete user controller
export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // get the user id from request parameters
    const userId = req.params.id;

    // check if user exists
    const user = await User.findById(userId);

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
    await User.deleteOne({
      _id: userId,
    });

    res.send({
      status: true,
      data: {
        message: "User deleted successfully",
      },
    });
  } catch (error: any) {
    res.status(500).send({
      status: false,
      errors: {
        error: error.errors,
      },
    });
  }
};

// get user controller
export const getUser = async (req: express.Request, res: express.Response) => {
  try {
    // get the user id from request parameters
    const userId = req.params.id;

    // check if user id exists
    if (userId) {
      const user = (await User.findById(userId)) || null;

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
    const users = await User.find();

    res.send({
      status: true,
      data: users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
      })),
    });
  } catch (error: any) {
    res.status(500).send({
      status: false,
      errors: {
        error: error.errors,
      },
    });
  }
};
