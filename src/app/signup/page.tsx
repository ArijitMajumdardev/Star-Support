'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const SignupPage = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required!");
      return;
    }

    try {
      // Call your API to handle signup (replace with your actual signup logic)
      // const response = await fetch("/api/signup", {
      //   method: "POST",
      //   body: JSON.stringify(formData),
      // });
      
      // if (response.ok) {
        // Redirect user to login or dashboard after successful signup
        if (isClient) {
          router.push("/login");
        }
      // } else {
      //   setError("Signup failed. Please try again.");
      // }

    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 flex justify-center items-center">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Sign Up</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-xl text-gray-600" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-xl text-gray-600" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-xl text-gray-600" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 text-white text-xl font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition-all"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login">
            <a className="text-yellow-600 font-semibold">Log in here</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
