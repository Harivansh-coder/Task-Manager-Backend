import { z } from "zod";
import dotenv from "dotenv";

// Load the .env file
dotenv.config();

// Define the schema for the .env file
const envSchema = z.object({
  PORT: z
    .string()
    .default("3000")
    .transform((val) => parseInt(val)),
  DATABASE_URL: z.string().trim(),
  JWT_SECRET_KEY: z.string().trim(),
});

// Validate the .env file
const env = envSchema.safeParse({
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
});

if (!env.success) {
  throw new Error(env.error.errors[0].message);
}

export const envVariables = env.data;
