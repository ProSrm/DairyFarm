import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../css/LoginPage.css"
interface LoginFormInputs {
    email: string;
    password: string;
}

interface LoginPageProps {
    onLoginSuccess: (email: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loginError, setLoginError] = useState<string | null>(null);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data: LoginFormInputs) => {
        console.log("Login Data: ", data);
        onLoginSuccess(data.email);
        navigate('/home');
    };

    return (
        <div className="mainContainer">
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex">
                    {/* Left side - Image/Banner */}
                    <div className="hidden md:block w-1/2 bg-blue-600 p-12">
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
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        {...register("email", { required: "Email is required" })}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter your email"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        value={password}
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: { value: 6, message: "Password must be at least 6 characters" }
                                        })}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter your password"
                                    />
                                    {errors.password && (
                                        <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                                >
                                    Login
                                </button>

                                {loginError && (
                                    <p className="text-center text-sm text-red-600">{loginError}</p>
                                )}
                            </form>

                            <div className="mt-6 text-center">
                                <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;