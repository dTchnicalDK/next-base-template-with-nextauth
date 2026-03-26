"use client";
import React, { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { handleLogin } from "@/lib/actions/validations/auth.action";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const [state, formAction, isPending] = useActionState(handleLogin, null);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-700 rounded-xl shadow text-center">
        <h1 className="text-2xl font-bold">School Portal</h1>
        <p className="text-gray-500 text-sm">Sign in to continue</p>

        <button
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          className="w-full border py-2 rounded hover:bg-gray-50 flex items-center justify-center gap-2"
        >
          <img
            src="https://authjs.dev/img/providers/github.svg"
            className="w-5 h-5"
          />
          Continue with github
        </button>
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full border py-2 rounded hover:bg-gray-50 flex items-center justify-center gap-2"
        >
          <img
            src="https://authjs.dev/img/providers/google.svg"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* credetial login ui */}
        <div className="py-10 space-y-10 border-t border-b border-amber-100 rounded-2xl shadow-xl">
          <h1>Your may Login using Email and Password</h1>

          {/* global error for auth */}
          {state?.message && (
            <p className="text-red-400 text-sm bg-red-950 px-4 py-2 rounded">
              {state.message}
            </p>
          )}

          <form action={formAction}>
            <div className="flex flex-col gap-5">
              {/* email */}
              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="email i.e test@gmail.com"
                  className={state?.errors?.email ? "border-red-500" : ""}
                />
                {state?.errors?.email && (
                  <p className="text-red-400 text-xs mt-1">
                    {state.errors.email[0]}
                  </p>
                )}
              </div>

              {/* password block */}
              <div>
                <Input
                  name="password"
                  type="password"
                  placeholder="enter password"
                  className={state?.errors?.password ? "border-red-500" : ""}
                />
                {state?.errors?.password && (
                  <p className="text-red-400 text-xs mt-1">
                    {state.errors.password[0]}
                  </p>
                )}
              </div>
              <div>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="cursor-pointer w-full mt-15"
                >
                  {isPending ? "SigningIn..." : "Login"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
