"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { loginSchema } from "./auth.schema";

export type LoginState = {
  message?: string;
  errors?: {
    email?: string[];
    password?: string[];
  };
} | null;

export async function handleLogin(
  prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const validated = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    const fieldErrors = validated.error.issues.reduce(
      (accu, issue) => {
        const field = issue.path[0] as string;
        if (!accu[field]) {
          accu[field] = [];
        }
        accu[field].push(issue.message);
        return accu;
      },
      {} as Record<string, string[]>,
    );

    return {
      message: "Please fix the errors below",
      errors: fieldErrors,
    };
  }

  try {
    await signIn("credentials", {
      email: validated.data.email,
      password: validated.data.password,
      redirectTo: "/dashboard",
    });

    return null;
  } catch (error) {
    // let Next.js handle redirects
    if (!(error instanceof AuthError)) throw error;

    switch (error.type) {
      case "CredentialsSignin":
        return { message: "Invalid email or password" };
      default:
        return { message: "Something went wrong. Please try again." };
    }
  }
}

//////////////////////////logging out user
export const handleLogOut = async () => {
  await signOut({ redirectTo: "/login" });
};
