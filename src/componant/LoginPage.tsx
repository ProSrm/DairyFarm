import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../css/LoginPage.css";

interface LoginFormInputs {
  email: string;
  password: string;
  authority: string;
}

interface LoginPageProps {
  onLoginSuccess: (email: string, role: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data: LoginFormInputs) => {
    try {
      const response = await fetch("https://localhost:7173/api/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        let errorMessage = "Login failed";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          console.error("Non-JSON error response:", await response.text());
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log("Login successful:", result);

      onLoginSuccess(result.email, result.role);

      if (result.role === "admin") {
        navigate("/adminHome");
      } else if (result.role === "user") {
        navigate("/home");
      }
    } catch (error: any) {
      console.error("Error during login:", error);
      setLoginError(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="mainContainer">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex">
          {/* Left side - Image/Banner */}
          <div className="hidden md:block w-1/2 bg-green-600 p-12">
            <div className="h-full flex flex-col justify-center">
              <h2 className="text-4xl font-bold text-white mb-6">Welcome Back</h2>
              <p className="text-blue-100">Login to access your dairy farm management dashboard.</p>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="w-full md:w-1/2 p-8">
            <div className="max-w-md mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Login</h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Radio Buttons */}
                <div className="flex flex-row space-x-6 mb-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="user"
                      value="user"
                      {...register("authority", { required: "Authority is required" })}
                      onChange={(e) => setValue("authority", e.target.value)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    />
                    <label htmlFor="user" className="ml-2 text-sm font-medium text-gray-700">
                      User
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="admin"
                      value="admin"
                      {...register("authority", { required: "Authority is required" })}
                      onChange={(e) => setValue("authority", e.target.value)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    />
                    <label htmlFor="admin" className="ml-2 text-sm font-medium text-gray-700">
                      Admin
                    </label>
                  </div>
                </div>
                {errors.authority && (
                  <p className="mt-1 text-sm text-red-600">{errors.authority.message}</p>
                )}

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Password must be at least 6 characters" }
                    })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Login
                </button>

                {loginError && (
                  <p className="text-center text-sm text-red-600">{loginError}</p>
                )}
              </form>

              <div className="link-container">
                <a href="#"> Don't have account? </a>
                <a href="#"> Forgot your password? </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
