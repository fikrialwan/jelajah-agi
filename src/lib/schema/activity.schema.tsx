import { z } from "zod";

export const activityUpdateFormSchema = z.object({
  score: z
    .number({ required_error: "Score is required" })
    .min(0, { message: "Score is required" }),
  totalMember: z.number(),
});
