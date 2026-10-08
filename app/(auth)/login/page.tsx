"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Role } from "@/types/api";

import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import Image from "next/image";

function ArrowLeftIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState<string | null>(null);
  const { login, demoLogin } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login({ email, password });
      toast.success("Logged in successfully");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemo = async (role: Role) => {
    setDemoLoading(role);
    try {
      await demoLogin(role);
      toast.success(`Logged in as Demo ${role}`);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setDemoLoading(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted/20 p-4">
      <Card className="w-full max-w-md relative">
        <div className="absolute left-4 top-4 z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 h-8 px-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors cursor-pointer"
            title="Back to Home"
            aria-label="Back to Home"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            <span>Back</span>
          </Link>
        </div>

        <CardHeader className="space-y-1 text-center pt-8 sm:pt-6">
          <div className="logo flex justify-center items-center gap-2">
            <div className="h-14 w-14 p-1 bg-white rounded-xl flex items-center justify-center text-primary-foreground font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
              <Image src={"/mango.png"} width={"60"} height={"60"} alt="logo" />
            </div>

            <CardTitle className="text-4xl font-bold tracking-tight montecarlo-regular">
              CityFix
            </CardTitle>
          </div>
          
          <CardDescription>
            Enter your email and password to log in
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Log In
            </Button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <GoogleSignInButton text="continue_with" />

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or one-click demo login
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => handleDemo("CITIZEN")}
              disabled={demoLoading !== null}
            >
              {demoLoading === "CITIZEN" && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Demo Citizen
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => handleDemo("STAFF")}
              disabled={demoLoading !== null}
            >
              {demoLoading === "STAFF" && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Demo Staff
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => handleDemo("ADMIN")}
              disabled={demoLoading !== null}
            >
              {demoLoading === "ADMIN" && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Demo Admin
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 text-center text-sm text-muted-foreground mt-2">
          <div>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
