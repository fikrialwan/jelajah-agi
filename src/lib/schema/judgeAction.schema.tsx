import { z } from "zod";

export const validateParticipantFormSchema = z.object({
  numberOfParticipants: z
    .number({ required_error: "This field is required" })
    .min(1, { message: "The value min is 1" }),
});

export const inputScoreFormSchema = z.object({
  score: z
    .number({ required_error: "This field is required" })
    .min(1, { message: "The value min is 1" }),
});
