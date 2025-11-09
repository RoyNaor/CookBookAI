"use client";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setMessage("Registration successful!");
        } catch (error) {
            setMessage("Registration failed. Please try again.");
        }
    };


  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-4 max-w-sm mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold text-center">Sign Up</h2>
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
      <button className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">Register</button>
      {message && <p className="text-center text-sm">{message}</p>}
    </form>
  );
}

export default Register