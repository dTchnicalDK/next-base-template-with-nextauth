"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { handleLogin } from "@/lib/actions/credetial-login.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LoginPage = () => {
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
          <form action={handleLogin}>
            <div className="flex flex-col gap-5">
              <div>
                <Input
                  name="email"
                  type="text"
                  placeholder="email i.e test@gmail.com"
                />
              </div>
              <div>
                <Input
                  name="password"
                  type="password"
                  placeholder="enter password"
                />
              </div>
              <div>
                <Button type="submit" className="cursor-pointer w-full mt-15">
                  Login
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
