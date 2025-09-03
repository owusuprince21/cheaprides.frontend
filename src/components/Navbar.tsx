'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Menu, X, Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import { logout, isAuthenticated, fetchAndUpdateUser } from '@/lib/auth';
import { User as UserType } from '@/types/car';
import Image from 'next/image';
import { FaXTwitter } from "react-icons/fa6";

export default function Navbar() {
  const [user, setUser] = useState<UserType | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    updateAuthState();

    const handleStorageChange = () => updateAuthState();
    window.addEventListener('storage', handleStorageChange);

    const interval = setInterval(updateAuthState, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const updateAuthState = async () => {
    const authenticated = isAuthenticated();
    const currentUser = await fetchAndUpdateUser();
    const adminStatus = currentUser?.is_staff || currentUser?.is_superuser;

    setUser(currentUser);
    setUserIsAdmin(!!adminStatus);

    console.log('🔄 Auth state updated:', {
      username: currentUser?.username,
      is_staff: currentUser?.is_staff,
      is_superuser: currentUser?.is_superuser,
      authenticated,
      isAdmin: adminStatus,
    });
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setUserIsAdmin(false);
    router.push('/');
    setIsMenuOpen(false);
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
              <span className="text-xl font-bold text-gray-900">Cheap Rides Gh</span>
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
            <span className="text-xl font-bold text-gray-900">Cheap Rides Gh</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/cars" className="text-gray-700 hover:text-blue-600 transition-colors">
              Cars
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About Us
            </Link>
            {userIsAdmin && (
              <Link href="/admin" className="text-gray-700 hover:text-blue-600 transition-colors">
                Admin
              </Link>
            )}
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">
                  Welcome, {user?.first_name || user?.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/login"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-blue-600 text-white px-2 py-1 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-[100dvh] w-3/4 max-w-xs bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close button inside */}
        <div className="flex justify-end p-4">
          <button onClick={() => setIsMenuOpen(false)}>
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col space-y-4 px-6 pb-28 overflow-y-auto max-h-screen">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/cars"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Cars
          </Link>
          <Link
            href="/about"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            About Us
          </Link>

          {userIsAdmin && (
            <Link
              href="/admin"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Admin
            </Link>
          )}

          {user ? (
            <>
              <span className="text-gray-700">
                Welcome, {user?.first_name || user?.username}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors w-fit"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Get Started
              </Link>
            </>
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
            <Link href="https://facebook.com/cheapridesgh" target="_blank" aria-label="Facebook">
              <Facebook className="h-5 w-5 hover:text-blue-600" />
            </Link>
            <Link href="https://instagram.com/cheapridesgh" target="_blank" aria-label="Instagram">
              <Instagram className="h-5 w-5 hover:text-pink-600" />
            </Link>
            <Link href="https://twitter.com/cheapridesgh" target="_blank" aria-label="Twitter">
              <FaXTwitter className="h-5 w-5 hover:text-sky-500" />
            </Link>
            <Link href="mailto:info@cheapridesgh.com" aria-label="Email">
              <Mail className="h-5 w-5 hover:text-red-500" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
