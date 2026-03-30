import React, {
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
  useState,
} from "react";
import { Button } from "./ui/button";
import { Loader2Icon, LogInIcon, LogOutIcon } from "lucide-react";
import { Input } from "./ui/input";
import { handleSignUp } from "@/lib/actions/validations/auth.action";
import { email } from "zod";
import { toast } from "sonner";

type SignInFormProps = {
  setShowSignup: Dispatch<SetStateAction<boolean>>;
};
type SignUpFormFieldsData = {
  email?: string;
  password?: string;
  repassword?: string;
};

const SignUpForm = ({ setShowSignup }: SignInFormProps) => {
  const [state, formAction, isPending] = useActionState(handleSignUp, null);
  const [formFieldsData, setFormFieldsData] = useState<SignUpFormFieldsData>({
    email: "",
    password: "",
    repassword: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFieldsData((prev) => ({ ...prev, [name]: value }));
  };

  //toasting message on registration success
  useEffect(() => {
    if (state?.message === "Registration successful! Please login now.") {
      toast.success("Registration successful! Please login now.", {
        duration: 5000,
      });

      // Switch to login form after success
      setTimeout(() => {
        setShowSignup(false);
      }, 1500);
    }
  }, [state, setShowSignup]);

  return (
    <div className="space-y-2">
      <div className="py-10 space-y-10 border-t border-b border-amber-100 rounded-2xl shadow-xl bg-gray-50  dark:bg-gray-900">
        <h1 className="text-xl font-semibold">
          Register using Email and Password
        </h1>

        {/* global error for auth */}
        {state?.message && !state.isSuccess && (
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
                value={formFieldsData.email}
                onChange={handleOnChange}
                required
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
                value={formFieldsData.password}
                onChange={handleOnChange}
                required
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

            <div>
              <Input
                name="repassword"
                type="password"
                value={formFieldsData.repassword}
                onChange={handleOnChange}
                placeholder="enter password again!"
                required
                className={
                  state?.errors?.repassword
                    ? "border-red-500 bg-white dark:bg-gray-800"
                    : "bg-white dark:bg-gray-800"
                }
              />
              {state?.errors?.repassword && (
                <p className="text-red-400 text-xs mt-1">
                  {state.errors.repassword[0]}
                </p>
              )}
            </div>

            {/* signup button  */}
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
                    <span>Registering...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <LogInIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    <span>Register Now</span>
                  </div>
                )}
              </Button>
            </div>

            {/* login or register button section */}

            <div className="space-y-5">
              <p>
                Already Registered!{" "}
                <Button
                  onClick={() => setShowSignup(false)}
                  variant="link"
                  className="text-indigo-500 cursor-pointer hover:underline"
                >
                  Login here
                </Button>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
