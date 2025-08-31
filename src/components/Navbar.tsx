'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Menu, X } from 'lucide-react';
import { logout, isAuthenticated, fetchAndUpdateUser } from '@/lib/auth';
import { User as UserType } from '@/types/car';
import Image from 'next/image';
import AboutPage from '@/app/about/page';

export default function Navbar() {
  const [user, setUser] = useState<UserType | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    updateAuthState();
    
    // Listen for storage changes (when user logs in from another tab)
    const handleStorageChange = () => {
      updateAuthState();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Check auth state periodically
    const interval = setInterval(updateAuthState, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const updateAuthState = async () => {
    // const currentUser = getCurrentUser();
    const authenticated = isAuthenticated();
    // const adminStatus = isAdmin();
    const currentUser = await fetchAndUpdateUser();
    const adminStatus = currentUser.is_staff || currentUser.is_superuser;

    
    setUser(currentUser);
    setUserIsAdmin(adminStatus);
    
    console.log('🔄 Auth state updated:', {
      username: currentUser?.username,
      is_staff: currentUser?.is_staff,
      is_superuser: currentUser?.is_superuser,
      authenticated,
      isAdmin: adminStatus
    });
  };
  const handleLogout = async () => {
    await logout();
    setUser(null);
    setUserIsAdmin(false);
    router.push('/');
  };

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
                             <Image
                            src="/logo2.png" // Assuming it's logo1.png, adjust if it's .jpg or .svg
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
                            src="/logo2.png" // Assuming it's logo1.png, adjust if it's .jpg or .svg
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
                <span className="text-gray-700">Welcome, {user?.first_name || user?.username}</span>
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
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Register
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors"  onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link href="/cars" className="text-gray-700 hover:text-blue-600 transition-colors"  onClick={() => setIsMenuOpen(false)}>
                Cars
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors"  onClick={() => setIsMenuOpen(false)}>
                About Us
              </Link>
              
              {userIsAdmin && (
                <Link href="/admin" className="text-gray-700 hover:text-blue-600 transition-colors"  onClick={() => setIsMenuOpen(false)}>
                  Admin
                </Link>
              )}
              
              {user ? (
                <>
                  <span className="text-gray-700">Welcome, {user?.first_name || user?.username}</span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-gray-700 hover:text-red-600  transition-colors w-fit"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                   onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                   onClick={() => setIsMenuOpen(false)}>
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}