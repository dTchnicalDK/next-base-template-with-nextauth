"use client";
import { signIn, useSession } from "next-auth/react";
import SignUpForm from "@/components/signup-form";
import SignInForm from "@/components/signin-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [showSignup, setShowSignup] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;
  useEffect(() => {
    if (user?.email) {
      router.push("/dashboard");
    }
  }, [user, router]);

  //if already loggedin then redirect to dashboard

  return (
    <div className="min-h-screen flex items-center justify-center my-5">
      <div className="w-full max-w-md p-8 space-y-2 bg-gray-200 dark:bg-gray-950 rounded-xl shadow text-center">
        <h1 className="text-2xl font-bold">
          {showSignup ? "Register " : "Login "}here!
        </h1>

        {/* oAuth buttons */}
        <div className="py-10 space-y-3 border-t border-b border-amber-100 rounded-2xl shadow-xl bg-gray-50 dark:bg-gray-900">
          <button
            onClick={() => signIn("github", { redirectTo: "/dashboard" })}
            className="w-full  py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="text-lg">Continue with github</span>
            <img
              src="https://authjs.dev/img/providers/github.svg"
              className="w-8 h-8 ml-5 "
            />
          </button>
          <button
            onClick={() => signIn("google", { redirectTo: "/dashboard" })}
            className="w-full  py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="text-lg ">Continue with Google</span>
            <img
              src="https://authjs.dev/img/providers/google.svg"
              className="w-6 h-6 ml-5 cursor-pointer"
            />
          </button>
        </div>

        <div>OR</div>

        {/* credetial login ui */}
        {showSignup ? (
          <SignUpForm setShowSignup={setShowSignup} />
        ) : (
          <SignInForm setShowSignup={setShowSignup} />
        )}
      </div>
    </div>
  );
};

export default LoginPage;
