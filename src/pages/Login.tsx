import { LoginInputData, loginUserApi } from "@/api/users";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { UserResponse } from "@/lib/typedef";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface IFormInput {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  const navigate = useNavigate();
  const { login } = useAuth();

  const { data, isSuccess, isPending, mutate } = useMutation({
    mutationFn: loginUserApi,
    onSuccess: (sucessData: UserResponse) => {
      localStorage.setItem("token", sucessData.token);
      login(sucessData);
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<LoginInputData> = (formInput) => {
    mutate(formInput);
  };

  return (
    <div className="bg-teal-200 flex  justify-start flex-col w-4/12 h-max rounded-lg">
      <h1 className="font-nunito text-4xl mt-8 text-center">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="px-4 mx-4">
        <div className="flex flex-col gap-2 mt-6">
          <label htmlFor="email" className="font-nunito text-xl">
            Email
          </label>

          <input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
            className="rounded-md h-12 pl-4 focus:border-gray-400 border-2 focus:outline-none text-sm"
            placeholder="Enter your email address"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 mt-6 mb-6">
          <label htmlFor="password" className="font-nunito text-xl">
            Password
          </label>

          <input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
            className="rounded-md h-12 pl-4 focus:border-gray-400 border-2 focus:outline-none text-sm"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <Button
          type="submit"
          className="rounded-xl"
          size={"lg"}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </form>
      {/*TODO*/}
      <a
        href="google.com"
        className="p-4 mx-4 text-sm mb-4 text-teal-700 underline cursor-pointer hover:no-underline"
      >
        Forgot password?
      </a>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default Login;
