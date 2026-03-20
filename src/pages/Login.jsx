import { useState } from "react";
import api from "../api/axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await api.post("/auth/login", {
                email,
                password,
            });

            localStorage.setItem("token", res.data.token);
            window.location.href = "/";
        } catch {
            alert("Login failed");
        }
    };

    if (localStorage.getItem("token")) {
        window.location.href = "/";
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-6 rounded shadow w-80">
                <h2 className="text-xl mb-4">Login</h2>

                <input
                    className="w-full p-2 border mb-2"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="w-full p-2 border mb-4"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="bg-black text-white w-full py-2"
                >
                    Login
                </button>

                <p className="text-sm mt-3 text-center">
                    Don't have an account yet? {" "}
                    <a href="/signup" className="text-blue-500">
                        Signup
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;