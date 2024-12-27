// LoginPage.tsx (previously App.tsx content)
import React, { useState } from "react";
import { useForm, SubmitHandler, set } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import "../css/LoginPage.css"

interface LoginFormInputs {
    email: string;
    password: string;
}
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

    const fakeApiCall = async (data: LoginFormInputs): Promise<{ success: boolean }> => {
        return new Promise((resolve) =>
            setTimeout(() => {
                resolve({ success: data.email === "test@example.com" && data.password === "password123" });
            }, 1000)
        );
    };
    ;

    const goToAboutPage = () => {
        navigate("/home");
    };

    return (
        <div className="maincontainer">
            <div className="container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="form">
                    <div className="field">
                        <label>Email</label>
                        <input
                            value={email}
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p className="error">{errors.email.message}</p>}
                    </div>

                    <div className="field">
                        <label>Password</label>
                        <input
                            value={password}
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Password must be at least 6 characters" },
                            })}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <p className="error">{errors.password.message}</p>}
                    </div>

                    {/* <Link to="/home">Go to Home Page</Link> */}
                    <button type="submit" className="button" >Login</button>

                    {loginError && <p className="error">{loginError}</p>}
                </form>

            </div>
        </div>
    );

};

export default LoginPage;