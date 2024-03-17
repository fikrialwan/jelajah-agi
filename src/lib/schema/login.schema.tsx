import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, { message: "Email is required" })
    .email("Your email is not valid"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "Password is required" }),
});
