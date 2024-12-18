import express from "express";
import prisma from "@/config/database";
import bcrypt from "bcrypt";

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
    const userExists = await prisma.user.findFirst({
      where: {
        email,
      },
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
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
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
    const userId = parseInt(req.params.id);

    // check if user exists
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
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

    // check if password is to be updated
    let hashedPassword = user.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // update the user
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.send({
      status: true,
      data: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
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

// delete user controller
export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // get the user id from request parameters
    const userId = parseInt(req.params.id);

    // check if user exists
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      res.status(404).send({
        status: false,
        errors: {
          message: "User not found",
        },
      });
    }

    // delete the user
    await prisma.user.delete({
      where: {
        id: userId,
      },
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
      // get a user
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(userId),
        },
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

      res.send({
        status: true,
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } else {
      // get all users
      const users = await prisma.user.findMany();

      res.send({
        status: true,
        data: users,
      });
    }
  } catch (error: any) {
    res.status(500).send({
      status: false,
      errors: {
        error: error.errors,
      },
    });
  }
};
