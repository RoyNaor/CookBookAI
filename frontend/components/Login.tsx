"use client";
import { useState } from "react";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setMessage("Login successful!");
        } catch (error) {
            setMessage("Login failed. Please check your credentials.");
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            setMessage("Google login successful!");
        } catch (error) {
            setMessage("Google login failed.");
        }
    };


   return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-sm mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold text-center">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="p-2 border rounded"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="p-2 border rounded"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-amber-600 text-white py-2 rounded hover:bg-amber-700 transition">Login</button>
      <button type="button" onClick={handleGoogleLogin} className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
        Sign in with Google
      </button>
      {message && <p className="text-center text-sm">{message}</p>}
    </form>
  );
}

export default Login