import { registerUserApi, UserRegisterInputData } from "@/api/users";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { UserResponse } from "@/lib/typedef";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserRegisterInputData>();

  const { data, isSuccess, isPending, mutate } = useMutation({
    mutationFn: registerUserApi,
    onSuccess: (sucessData: UserResponse) => {
      localStorage.setItem("token", sucessData.token);
      login(sucessData);
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<UserRegisterInputData> = (registerUserData) => {
    mutate(registerUserData);
  };
  // console.log(data);

  return (
    <div className="bg-teal-200 flex  justify-start flex-col w-4/12 h-max rounded-lg">
      <h1 className="font-nunito text-4xl mt-8 text-center">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="px-4 mx-4">
        <div className="flex flex-col gap-2 mt-6">
          <label htmlFor="fullName" className="font-nunito text-xl">
            Full Name
          </label>

          <input
            id="fullName"
            {...register("fullName", { required: "Full Name is required" })}
            className="rounded-md h-12 pl-4 focus:border-gray-400 border-2 focus:outline-none text-sm"
            placeholder="Enter your full name"
          />
          {errors.fullName && (
            <p className="text-red-500">{errors.fullName.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 mt-6">
          <label htmlFor="gender" className="font-nunito text-xl">
            Gender Selection
          </label>
          <select
            {...register("gender")}
            className="rounded-md h-12 pl-4 focus:border-gray-400 border-2 focus:outline-none text-sm"
          >
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 mt-6">
          <label htmlFor="email" className="font-nunito text-xl">
            Email
          </label>

          <input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
            className="rounded-md h-12 pl-4 focus:border-gray-400 border-2 focus:outline-none text-sm"
            placeholder="Enter your email or username"
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
          className="rounded-xl mb-4"
          size={"lg"}
          disabled={isSubmitting || isPending}
        >
          {isSubmitting || isPending ? "Creating Account" : "Register"}
        </Button>
      </form>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default Register;
