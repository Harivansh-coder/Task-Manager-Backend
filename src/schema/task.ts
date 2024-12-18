// userSchema in zod for request body validation
import { z } from "zod";

const taskSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  priority: z.number().int(),
  dueTime: z.date(),
  endTime: z.date().optional(),
  userId: z.number().int(),
  status: z.string().default("pending"),
});

export default taskSchema;
