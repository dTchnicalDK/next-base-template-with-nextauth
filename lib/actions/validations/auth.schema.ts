import { email, z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(1, "Password is required!")
    .min(6, "password must be at least 6 character long!"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const signUpSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 character long!"),
  repassword: z
    .string()
    .min(1, "Password is required")
    .min(6, "Re-Password must at least 6 character long!"),
});
export type SignUpSchema = z.infer<typeof signUpSchema>;
