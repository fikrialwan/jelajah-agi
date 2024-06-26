import { z } from "zod";

export const participantAddFormSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, { message: "Email is required" })
    .email("Your email is not valid"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "Password is required" }),
  name: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name is required" }),
});

export const participantUpdateFormSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name is required" }),
});
