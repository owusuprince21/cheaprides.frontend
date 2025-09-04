"use client";

import "./globals.css";
import { useState, useEffect, createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import Loader from "@/components/Loader";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toast";

// 🔹 Global Loading Context
interface LoadingContextType {
  loading: boolean;
  setLoading: (state: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) throw new Error("useLoading must be used within LoadingProvider");
  return context;
};

// 🔹 RootLayout Component
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  // Show loader on route changes
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500); // smooth delay
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <html lang="en">
      <body>
        <LoadingContext.Provider value={{ loading, setLoading }}>
          <AuthProvider>
            <Navbar />
            {loading && <Loader />}
            {children}
            <Toaster />
          </AuthProvider>
        </LoadingContext.Provider>
      </body>
    </html>
  );
}
