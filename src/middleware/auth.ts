import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envVariables } from "@/config/env";

type JWTPayload = JwtPayload & {
  id: string;
};

const verifyAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Get access token from header
  const accessToken = req.headers.authorization?.split(" ")[1];

  // Check if access token exists
  if (!accessToken) {
    res.status(401).send({
      status: false,
      errors: {
        message: "Unauthorized",
      },
    });
    return; // Explicitly stop execution
  }

  // Verify access token
  jwt.verify(accessToken, envVariables.JWT_SECRET_KEY, (err, decoded) => {
    if (err || !decoded) {
      res.status(401).send({
        status: false,
        errors: {
          message: "Unauthorized",
        },
      });
      return; // Explicitly stop execution
    }

    // Attach user to request object
    req.user = decoded as JWTPayload;

    next(); // Pass control to the next middleware/handler
  });
};

export default verifyAccessToken;
