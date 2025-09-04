"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

// 🔑 Firebase
import { auth, provider } from "@/lib/firebase";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  // 🔄 Redirect if already signed in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified || user.providerData[0]?.providerId === "google.com") {
          router.push("/"); // ✅ verified or Google user → go home
        } else {
          setMessage("Please verify your email before logging in.");
          signOut(auth); // 🚫 kick unverified email/password user
        }
      }
    });
    return () => unsubscribe();
  }, [router]);

const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setMessage("");
  setLoading(true);

  try {
    // 1️⃣ Create Firebase user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // 2️⃣ Save full name
    await updateProfile(userCredential.user, {
      displayName: `${firstName} ${lastName}`,
    });

    // 3️⃣ Call Django API to send verification email
    try {
      const response = await fetch("http://localhost:8000/api/send-verification/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      // DEBUG: log raw response text
      const text = await response.text();
      console.log("Django response text:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error("Server did not return JSON. Check console for HTML response.");
      }

      if (!data.success) {
        setError(data.error || "Failed to send verification email.");
        return;
      }

    } catch (err: any) {
      console.error("Django verification email error:", err);
      setError(err.message || "Failed to send verification email.");
      return;
    }

    // 4️⃣ Show success message
    setMessage(
      `Account created! A verification link was sent to ${email}. Please verify before logging in.`
    );

    // Optional: clear form
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");

  } catch (err: any) {
    setError(err.message || "Registration failed");
  } finally {
    setLoading(false);
  }
};


  // 📌 Google Sign-In
  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user.displayName) {
        const [gFirst, gLast] = user.displayName.split(" ");
        await updateProfile(user, {
          displayName: `${gFirst || ""} ${gLast || ""}`,
        });
      }

      router.push("/"); // ✅ go home
    } catch (err: any) {
      setError(err.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Image
            src="/logo2.png"
            alt="Logo"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4">
              {error}
            </div>
          )}
          {message && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-4">
              {message}
            </div>
          )}

          {/* Email + Password Form */}
          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your first name"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your last name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <hr className="my-6 border-gray-300" />

          {/* Google Sign-In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 py-2 px-4 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 shadow-sm disabled:opacity-50"
          >
            <FcGoogle className="h-5 w-5" />
            <span>{loading ? "Signing in..." : "Sign in with Google"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
