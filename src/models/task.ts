import { model, Schema } from "mongoose";
import mongoose from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    startTime: {
      type: Date,
      required: true,
    },
    dueTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "pending",
    },
    priority: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export interface ITask {
  title: string;
  description?: string;
  startTime: Date;
  dueTime: Date;
  endTime?: Date;
  userId: string;
  status: string;
  priority: number;
}

// task model for mongodb
const Task =
  (mongoose.models.Task as mongoose.Model<ITask>) ||
  model<ITask>("Task", taskSchema);

export default Task;
