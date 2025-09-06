'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@radix-ui/react-separator';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { FcGoogle } from 'react-icons/fc';

// Firebase wrapper
import {
  auth,
  provider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from '@/lib/firebase';

export default function RegisterPage() {
  const { toast } = useToast();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim()) {
      toast({
        title: 'Name required',
        description: 'Please enter your first and last name.',
        variant: 'destructive',
      });
      return;
    }
    if (password.length < 6) {
      toast({
        title: 'Weak password',
        description: 'Password should be at least 6 characters.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCred.user, {
        displayName: `${firstName.trim()} ${lastName.trim()}`,
      });

      const name = userCred.user.displayName || email.split('@')[0];

      toast({
        title: 'Account created 🎉',
        description: `Welcome, ${name}!`,
      });

      window.location.href = '/';
    } catch (err: any) {
      let message = 'Something went wrong. Please try again.';
      if (err?.code === 'auth/email-already-in-use') {
        message = 'This email is already in use.';
      } else if (err?.code === 'auth/weak-password') {
        message = 'Password is too weak.';
      } else if (err?.code === 'auth/invalid-email') {
        message = 'Invalid email address.';
      }

      toast({
        title: 'Registration failed',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    if (googleLoading) return;
    setGoogleLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const name = user.displayName || user.email?.split('@')[0];

      toast({
        title: 'Welcome 🎉',
        description: `Signed in as ${name}`,
      });

      window.location.href = '/';
    } catch (err: any) {
      let message = err?.message || 'Google sign-in failed';
      if (err?.code === 'auth/cancelled-popup-request' || err?.code === 'auth/popup-closed-by-user') {
        message = 'Google sign-in cancelled.';
      }
      toast({
        title: 'Google sign-in failed',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    // min-h-screen -> allows natural scroll on small devices; flex-row at lg
    <div className="min-h-screen flex">
      {/* ----------------------------
          LEFT SIDE - Desktop only
          hidden on mobile, visible on lg+
         ---------------------------- */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/40 z-10" />
        {/* image fills container height on desktop */}
        <Image
          src="https://res.cloudinary.com/daebnxnfj/image/upload/v1756763666/hero_image_ti6atj.png"
          alt="Luxury Car Showroom"
          fill
          priority
          className="w-full h-full object-cover"
        />

        {/* overlay card */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-12 text-white">
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-4 shadow-lg max-w-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 relative rounded-full overflow-hidden bg-white shadow-md">
                <Image src="/logo2.png" alt="CheapRides Logo" fill className="object-contain p-1" priority />
              </div>
              <span className="text-2xl font-bold">CheapRides Gh</span>
            </div>

            <h2 className="text-3xl font-bold mb-2 leading-tight">Create Account</h2>
            <p className="text-base text-gray-100 leading-relaxed">
              Join CheapRides Gh and start browsing premium vehicles with confidence.
            </p>
          </div>
        </div>
      </div>

      {/* ----------------------------
          RIGHT SIDE - Form (mobile + desktop)
         ---------------------------- */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* MOBILE HERO - shown only on small screens */}
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
                  <Image src="/logo2.png" alt="Logo" fill className="object-contain" priority />
                </div>
                <span className="text-2xl font-bold">CheapRides Gh</span>
              </div>
              <p className="text-sm opacity-90">Premium Automotive Experience</p>
            </div>
          </div>
        </div>

        {/* FORM CONTAINER */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-gray-50 overflow-y-auto">
          <div className="w-full max-w-md">
            <Card className="shadow-2xl border-0 bg-white">
              <CardHeader className="space-y-2 pb-6">
                <CardTitle className="text-3xl font-bold text-center text-gray-900">
                  Create Account
                </CardTitle>
                <p className="text-center text-gray-600">Register to CheapRides Gh</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* First Name */}
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        id="firstName"
                        type="text"
                        required
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="pl-10 h-12 text-base"
                      />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        id="lastName"
                        type="text"
                        required
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="pl-10 h-12 text-base"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-12 text-base"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Create a secure password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 h-12 text-base"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Creating Account...
                      </div>
                    ) : (
                      'Sign Up'
                    )}
                  </Button>
                </form>

                {/* Divider using Radix Separator */}
                <div className="flex items-center my-6">
                  <Separator className="flex-grow h-px bg-gray-300" />
                  <span className="mx-4 text-gray-500 text-sm">OR</span>
                  <Separator className="flex-grow h-px bg-gray-300" />
                </div>

                {/* Google Register */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleRegister}
                  disabled={googleLoading}
                  className="w-full h-12 border border-gray-300 bg-white text-gray-700 font-medium flex items-center justify-center space-x-3 hover:bg-gray-50 cursor-pointer"
                >
                  {googleLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-700 mr-2"></div>
                      Signing up with Google...
                    </div>
                  ) : (
                    <>
                      <FcGoogle className="w-5 h-5" />
                      <span>Continue with Google</span>
                    </>
                  )}
                </Button>

                {/* Already have account */}
                <p className="text-center text-sm text-gray-600 mt-4">
                  Already have an account?{' '}
                  <Link href="/auth/login" className="text-blue-600 hover:underline">
                    Login
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
