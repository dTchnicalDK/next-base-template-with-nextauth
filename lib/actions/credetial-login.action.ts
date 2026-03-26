"use server";

import bcrypt from "bcryptjs";
import { prisma } from "../prisma";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
export const createNewUser = async (email: string, password: string) => {
  if (!email || !password) {
    return console.log("all fields are mandatory");
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await prisma.user.create({
      data: { email, password: hashedPassword },
    });
    console.log("created user", createdUser);
    return createdUser;
  } catch (error) {
    console.log("error while creating new user", error);
  }
};

/////login user
export const handleLogin = async (formData: FormData) => {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "invalid email or password" };
    }
    throw error;
  }
  redirect("/dashboard");
};
