import getTaskAnalyticsForCurrentUser from "@/controllers/analytics";
import verifyAccessToken from "@/middleware/auth";
import { Router } from "express";

const analyticsRouter = Router();

// all task analytics for a user
analyticsRouter.get(
  "/tasks",
  verifyAccessToken,
  getTaskAnalyticsForCurrentUser
);

export default analyticsRouter;
