'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@radix-ui/react-separator';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { useToast } from '@/hooks/use-toast';

// ✅ Firebase imports
import {
  auth,
  provider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from '@/lib/firebase';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ✅ Email/Password Login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;
      const name = user.displayName || user.email?.split('@')[0];

      toast({
        title: 'Welcome back 🎉',
        description: `Hello, ${name}!`,
      });

      window.location.href = '/';
    } catch (error: any) {
      console.error('Login error:', error.code);

      let message = 'Something went wrong';
      switch (error.code) {
        case 'auth/user-not-found':
          message = 'User not found. Please check your email.';
          break;
        case 'auth/wrong-password':
          message = 'Incorrect password. Try again.';
          break;
        case 'auth/invalid-email':
          message = 'Invalid email address.';
          break;
        case 'auth/invalid-credential':
          message = 'Invalid credentials. Please check your email and password.';
          break;
        case 'auth/too-many-requests':
          message = 'Too many attempts. Please try again later.';
          break;
      }

      toast({
        title: message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Google Login
  const handleGoogleLogin = async () => {
    if (googleLoading) return;
    setGoogleLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const name = user.displayName || user.email?.split('@')[0];

      toast({
        title: 'Welcome 🎉',
        description: `Hello, ${name}!`,
      });

      window.location.href = '/';
    } catch (error: any) {
      console.error('Google login error:', error.message);
      toast({
        title: 'Google login failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Car Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/40 z-10" />
        <Image
          src="https://res.cloudinary.com/daebnxnfj/image/upload/v1756763666/hero_image_ti6atj.png"
          alt="Luxury Car Showroom"
          fill
          priority
          className="w-full h-full object-cover"
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-12 text-white">
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-4 shadow-lg max-w-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 relative rounded-full overflow-hidden bg-white shadow-md">
                <Image
                  src="/logo2.png"
                  alt="CheapRides Logo"
                  fill
                  className="object-contain p-1"
                  priority
                />
              </div>
              <span className="text-2xl font-bold">CheapRides Gh</span>
            </div>
            <h2 className="text-1xl font-bold mb-2 leading-tight">
              Premium Vehicles
            </h2>
            <p className="text-base text-gray-100 leading-relaxed">
              Experience luxury automotive retail with over 8+ years of
              excellence and trusted service.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Mobile Car Image */}
        <div className="lg:hidden relative h-64 w-full">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50 z-10" />
          <Image
            src="https://res.cloudinary.com/daebnxnfj/image/upload/v1756763666/hero_image_ti6atj.png"
            alt="Luxury Car"
            fill
            priority
            className="object-contain"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-10 h-10 relative rounded-full overflow-hidden bg-black/70 flex items-center justify-center">
                  <Image
                    src="/logo2.png"
                    alt="CheapRides Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <span className="text-2xl font-bold">CheapRides Gh</span>
              </div>
              <p className="text-sm opacity-90">
                Premium Automotive Experience
              </p>
            </div>
          </div>
        </div>

        {/* Login Form Container */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-gray-50 overflow-y-auto">
          <div className="w-full max-w-md">
            <Card className="shadow-2xl border-0 bg-white">
              <CardHeader className="space-y-2 pb-8">
                <CardTitle className="text-3xl font-bold text-center text-gray-900">
                  Welcome Back
                </CardTitle>
                <p className="text-center text-gray-600">
                  Login to CheapRides Gh
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Email & Password Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange('email', e.target.value)
                        }
                        className="pl-10 h-12 text-base"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange('password', e.target.value)
                        }
                        className="pl-10 h-12 text-base"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Signing In...
                      </div>
                    ) : (
                      'Login'
                    )}
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative">
                  <Separator className="my-6" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white px-4 text-sm text-gray-500">
                      OR
                    </span>
                  </div>
                </div>

                {/* Google Login */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleLogin}
                  disabled={googleLoading}
                  className="w-full h-12 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold cursor-pointer"
                >
                  {googleLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-700 mr-2"></div>
                      Logging in with Google...
                    </div>
                  ) : (
                    <>
                      <FcGoogle className="w-5 h-5 mr-3" />
                      Continue with Google
                    </>
                  )}
                </Button>

                {/* No account? Sign Up */}
                <p className="text-center text-sm text-gray-600 mt-4">
                  Don’t have an account?{' '}
                  <Link
                    href="/auth/register"
                    className="text-blue-600 hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
