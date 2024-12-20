import Task from "@/models/task";
import express from "express";
import mongoose from "mongoose";

export const getTaskAnalyticsForCurrentUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userId = req.user.id;

    // Aggregation pipeline for all analytics
    const analytics = await Task.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $facet: {
          totalTasks: [{ $count: "count" }],
          finishedTasks: [
            { $match: { status: "finished" } },
            { $count: "count" },
          ],
          averageCompletionTime: [
            { $match: { status: "finished", endTime: { $exists: true } } },
            {
              $group: {
                _id: null,
                averageTime: {
                  $avg: { $subtract: ["$endTime", "$startTime"] },
                },
              },
            },
          ],
          totalLapsedTime: [
            { $match: { status: "finished", endTime: { $exists: true } } },
            {
              $group: {
                _id: null,
                totalTime: { $sum: { $subtract: ["$endTime", "$startTime"] } },
              },
            },
          ],
          totalEstimatedTime: [
            {
              $group: {
                _id: null,
                totalTime: { $sum: { $subtract: ["$dueTime", "$startTime"] } },
              },
            },
          ],
        },
      },
    ]);

    // Extract results
    const totalTasks = analytics[0].totalTasks[0]?.count || 0;
    const finishedTasks = analytics[0].finishedTasks[0]?.count || 0;
    const averageCompletionTime =
      Number(
        (
          analytics[0].averageCompletionTime[0]?.averageTime /
          1000 /
          60 /
          60
        ).toFixed(2)
      ) || 0;
    const totalLapsedTime =
      Number(
        (analytics[0].totalLapsedTime[0]?.totalTime / 1000 / 60 / 60).toFixed(2)
      ) || 0;

    const totalEstimatedTime =
      Number(
        analytics[0].totalEstimatedTime[0]?.totalTime / 1000 / 60 / 60 > 0
          ? (
              analytics[0].totalEstimatedTime[0]?.totalTime /
              1000 /
              60 /
              60
            ).toFixed(2)
          : 0
      ) || 0;

    const pendingTasks = totalTasks - finishedTasks;
    const percentageTasksfinished =
      totalTasks > 0
        ? Number(((finishedTasks / totalTasks) * 100).toFixed(2))
        : 0;

    const percentageTasksPending =
      totalTasks > 0
        ? Number(((pendingTasks / totalTasks) * 100).toFixed(2))
        : 0;
    // Respond with analytics
    res.status(200).json({
      totalTasks,
      finishedTasks,
      pendingTasks,
      percentageTasksfinished,
      percentageTasksPending,
      averageCompletionTime,
      totalLapsedTime,
      totalEstimatedTime,
    });
  } catch (error) {
    console.error("Error fetching task analytics:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default getTaskAnalyticsForCurrentUser;
