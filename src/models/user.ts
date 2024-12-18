import { model, Schema } from "mongoose";
import mongoose from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export interface IUser {
  email: string;
  name?: string;
  password: string;
}

// user model for mongodb
const User =
  (mongoose.models.User as mongoose.Model<IUser>) ||
  model<IUser>("User", userSchema);

export default User;
