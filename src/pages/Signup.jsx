import { useState } from "react";
import api from "../api/axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const res = await api.post("/auth/signup", {
        name,
        email,
        password,
      });

      // auto login after signup
      localStorage.setItem("token", res.data.token);
    if (localStorage.getItem("token")) {
        window.location.href = "/";
    }
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow w-80">
        <h2 className="text-xl mb-4 font-semibold">Signup</h2>

        <input
          className="w-full p-2 border mb-2 rounded"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full p-2 border mb-2 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 border mb-4 rounded"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="bg-black text-white w-full py-2 rounded 
                     transition-all duration-200 
                     hover:bg-gray-800"
        >
          Signup
        </button>

        <p className="text-sm mt-3 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;