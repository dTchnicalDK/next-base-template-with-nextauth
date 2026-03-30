"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { loginSchema, signUpSchema } from "./auth.schema";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export type State = {
  message?: string;
  isSuccess: boolean;
  errors?: {
    email?: string[];
    password?: string[];
    repassword?: string[];
  };
} | null;

/////////handle Login server action //////////
export async function handleLogin(
  prevState: State,
  formData: FormData,
): Promise<State> {
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
      isSuccess: false,
      errors: fieldErrors,
    };
  }

  try {
    await signIn("credentials", {
      email: validated.data.email,
      password: validated.data.password,
      redirect: false,
    });
  } catch (error) {
    // let Next.js handle redirects
    if (!(error instanceof AuthError)) throw error;

    switch (error.type) {
      case "CredentialsSignin":
        return { message: "Invalid email or password", isSuccess: false };
      default:
        return {
          message: "Something went wrong. Please try again.",
          isSuccess: false,
        };
    }
  }
  revalidatePath("/", "layout"); // ✅ bust the layout cache including Navbar
  redirect("/dashboard");
}

/////////////handleSignup///////////////
export async function handleSignUp(
  prevState: State,
  formData: FormData,
): Promise<State> {
  console.log("handleSignup ran!");

  const validated = signUpSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    repassword: formData.get("repassword"),
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
      message: "Review the data you entered! fix below!",
      isSuccess: false,
      errors: fieldErrors,
    };
  }
  if (!(validated.data.password === validated.data.repassword)) {
    return {
      message: "Password Mismatch",
      isSuccess: false,
      errors: {
        password: ["Password should bbe same as repassword"],
        repassword: ["Password repassword do not match!"],
      },
    };
  }

  try {
    const isAlreadyRegistered = await prisma.user.findUnique({
      where: { email: validated.data.email },
    });
    if (isAlreadyRegistered) {
      return {
        message: "You are already registered, try login !",
        isSuccess: false,
      };
    }
    const hashedPassword = await bcrypt.hash(validated.data.password, 10);
    await prisma.user.create({
      data: {
        email: validated.data.email,
        password: hashedPassword,
      },
    });

    return {
      message: "Registration successful! Please login now.",
      isSuccess: true,
    };
  } catch (error) {
    // let Next.js handle redirects
    if (!(error instanceof AuthError)) throw error;

    switch (error.type) {
      case "CredentialsSignin":
        return { message: "Invalid email or password", isSuccess: false };
      default:
        return {
          message: "Something went wrong creagin new user. Please try again.",
          isSuccess: false,
        };
    }
  }
}

//////////////////////////logging out user
export const handleLogOut = async () => {
  await signOut({ redirectTo: "/login" });
};
