"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Menu, X, Facebook, Instagram, Mail } from "lucide-react";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";

// Firebase
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useLoading } from "@/app/layout"; 

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { setLoading } = useLoading();

  useEffect(() => {
    setMounted(true);

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const displayName = firebaseUser.displayName || "";
        const email = firebaseUser.email || "";

        // Extract firstname
        let firstName = "";
        if (displayName) {
          firstName = displayName.split(" ")[0];
        } else if (email) {
          firstName = email.split("@")[0];
        }

        setUser({ firstName, email });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setUser(null);
      setIsMenuOpen(false);
      await new Promise((resolve) => setTimeout(resolve, 700));
      router.push("/");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return (
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo2.png"
                alt="Logo"
                width={64}
                height={64}
                className="rounded-full"
              />
              <span className="text-xl font-bold text-gray-900">
                Cheap Rides Gh
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <div className="w-32 h-8 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo2.png"
              alt="Logo"
              width={64}
              height={64}
              className="rounded-full"
            />
            <span className="text-xl font-bold text-gray-900">
              Cheap Rides Gh
            </span>
          </Link>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link href="/cars" className="text-gray-700 hover:text-blue-600">
              Cars
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600">
              About Us
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {user.firstName}!</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/login"
                  className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Login
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-[100dvh] w-3/4 max-w-xs bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setIsMenuOpen(false)}>
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col space-y-4 px-6 pb-28">
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link href="/cars" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-blue-600">
            Cars
          </Link>
          <Link href="/about" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-blue-600">
            About Us
          </Link>

          {user ? (
            <>
              <span className="text-gray-700">Welcome, {user.firstName}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-gray-700 hover:text-red-600 w-fit"
              >
                <LogOut className="h-4 w-4 cursor-pointer" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                href="/auth/login"
                className="text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="absolute bottom-0 w-full border-t bg-white p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Image
              src="/logo2.png"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-semibold text-gray-900">Cheap Rides Gh</span>
          </div>
          <div className="flex space-x-4 text-gray-600">
            <Link href="#" target="_blank">
              <Facebook className="h-5 w-5 hover:text-blue-600" />
            </Link>
            <Link href="#" target="_blank">
              <Instagram className="h-5 w-5 hover:text-pink-600" />
            </Link>
            <Link href="#" target="_blank">
              <FaXTwitter className="h-5 w-5 hover:text-sky-500" />
            </Link>
            <Link href="mailto:info@cheapridesgh.com">
              <Mail className="h-5 w-5 hover:text-red-500" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
