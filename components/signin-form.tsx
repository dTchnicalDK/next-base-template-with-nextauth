import React, { Dispatch, SetStateAction, useActionState } from "react";
import { Button } from "./ui/button";
import { Loader2Icon, LogInIcon } from "lucide-react";
import { Input } from "./ui/input";
import { handleLogin } from "@/lib/actions/validations/auth.action";

type SigninFormProps = {
  setShowSignup: Dispatch<SetStateAction<boolean>>;
};

const SignInForm: React.FC<SigninFormProps> = ({
  setShowSignup,
}: SigninFormProps) => {
  const [state, formAction, isPending] = useActionState(handleLogin, null);

  return (
    <div className="space-y-2">
      <div className="py-10 space-y-10 border-t border-b border-amber-100 rounded-2xl shadow-xl bg-gray-50  dark:bg-gray-900">
        <h1 className="text-xl font-semibold">
          Login using Email and Password
        </h1>

        {/* global error for auth */}
        {state?.message && (
          <p className="text-red-400 text-sm bg-red-950 px-4 py-2 rounded">
            {state.message}
          </p>
        )}

        <form action={formAction} className="px-8">
          <div className="flex flex-col gap-5">
            {/* email */}
            <div>
              <Input
                name="email"
                type="email"
                placeholder="email i.e test@gmail.com"
                className={
                  state?.errors?.email
                    ? "border-red-500 bg-white dark:bg-gray-800"
                    : "bg-white dark:bg-gray-800"
                }
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
                className={
                  state?.errors?.password
                    ? "border-red-500 bg-white dark:bg-gray-800"
                    : "bg-white dark:bg-gray-800"
                }
              />
              {state?.errors?.password && (
                <p className="text-red-400 text-xs mt-1">
                  {state.errors.password[0]}
                </p>
              )}
            </div>

            {/* login or register button section */}
            <div className="space-y-5">
              <div>
                <Button
                  type="submit"
                  disabled={isPending}
                  variant="default"
                  className="w-full cursor-pointer"
                >
                  {isPending ? (
                    <div className="flex items-center justify-center gap-2 text-xl">
                      <Loader2Icon className="h-4 w-4 animate-spin" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <LogInIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      <span>Login Now</span>
                    </div>
                  )}
                </Button>
              </div>
              <p>
                Not Registered Yet!
                <Button
                  onClick={() => setShowSignup(true)}
                  variant="link"
                  className="text-indigo-500 hover:underline cursor-pointer"
                >
                  Register now
                </Button>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
