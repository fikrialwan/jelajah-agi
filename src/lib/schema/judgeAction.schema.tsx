import { z } from "zod";

export const validateParticipantFormSchema = z.object({
  numberOfParticipants: z
    .number({ required_error: "This field is required" })
    .min(1, { message: "This field is required" }),
});

export const inputScoreFormSchema = z.object({
  score: z
    .number({ required_error: "This field is required" })
    .min(1, { message: "This field is required" }),
});
