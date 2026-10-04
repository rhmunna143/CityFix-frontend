"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Mail, KeyRound, Lock, CheckCircle2, ArrowLeft, RotateCw, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Step = "EMAIL" | "OTP" | "NEW_PASSWORD" | "SUCCESS";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("EMAIL");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Step 1: Send OTP to Email
  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/proxy/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Verification code sent to your email.");
        setStep("OTP");
        startResendTimer();
      } else {
        throw new Error(data.message || "Failed to send verification code");
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanOtp = otp.trim();
    if (cleanOtp.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP code");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/proxy/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: email.trim().toLowerCase(), 
          otp: cleanOtp 
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Code verified successfully!");
        setStep("NEW_PASSWORD");
      } else {
        throw new Error(data.message || "Invalid or expired code");
      }
    } catch (err: any) {
      toast.error(err.message || "Invalid or expired code");
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (resendCooldown > 0 || isLoading) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/proxy/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("A new verification code has been sent!");
        startResendTimer();
      } else {
        throw new Error(data.message || "Failed to resend code");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to resend code");
    } finally {
      setIsLoading(false);
    }
  };

  const startResendTimer = () => {
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/proxy/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          otp: otp.trim(),
          newPassword,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Password reset successfully!");
        setStep("SUCCESS");
      } else {
        throw new Error(data.message || "Failed to reset password");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted/20 p-4">
      <Card className="w-full max-w-md shadow-lg border-border/60">
        {/* Step Indicator Header */}
        <div className="px-6 pt-6 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <span className={`px-2 py-0.5 rounded-full ${step === 'EMAIL' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>1. Email</span>
            <span>&rarr;</span>
            <span className={`px-2 py-0.5 rounded-full ${step === 'OTP' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>2. Code</span>
            <span>&rarr;</span>
            <span className={`px-2 py-0.5 rounded-full ${step === 'NEW_PASSWORD' || step === 'SUCCESS' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>3. Reset</span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => router.push("/login")}
            className="h-7 px-2 gap-1 text-muted-foreground hover:text-foreground cursor-pointer rounded-md text-xs"
            title="Back to login"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back</span>
          </Button>
        </div>

        {/* STEP 1: EMAIL */}
        {step === "EMAIL" && (
          <>
            <CardHeader className="space-y-1 text-center pb-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                <Mail className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight">Forgot Password</CardTitle>
              <CardDescription>
                Enter your registered email address to receive a 6-digit OTP verification code.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSendEmail} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    autoFocus
                  />
                </div>
                <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Send Verification Code
                </Button>
              </form>
            </CardContent>
          </>
        )}

        {/* STEP 2: OTP VERIFICATION */}
        {step === "OTP" && (
          <>
            <CardHeader className="space-y-1 text-center pb-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 mb-2">
                <KeyRound className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight">Enter Verification Code</CardTitle>
              <CardDescription>
                We sent a 6-digit code to <strong className="text-foreground">{email}</strong>. Please enter it below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">6-Digit Code</Label>
                  <Input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    placeholder="123456"
                    required
                    className="text-center text-2xl tracking-[0.5em] font-mono h-12"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    disabled={isLoading}
                    autoFocus
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full cursor-pointer" 
                  disabled={isLoading || otp.trim().length !== 6}
                >
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Verify Code
                </Button>
              </form>

              <div className="flex items-center justify-between pt-4 text-xs">
                <button
                  type="button"
                  onClick={() => setStep("EMAIL")}
                  className="text-muted-foreground hover:text-foreground flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <ArrowLeft className="h-3 w-3" /> Change email
                </button>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resendCooldown > 0 || isLoading}
                  className="text-primary hover:underline disabled:opacity-50 disabled:no-underline flex items-center gap-1 cursor-pointer"
                >
                  <RotateCw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
                  {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : "Resend code"}
                </button>
              </div>
            </CardContent>
          </>
        )}

        {/* STEP 3: NEW PASSWORD */}
        {step === "NEW_PASSWORD" && (
          <>
            <CardHeader className="space-y-1 text-center pb-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                <Lock className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight">Create New Password</CardTitle>
              <CardDescription>
                Your code has been verified. Enter a new password for <strong className="text-foreground">{email}</strong>.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="At least 6 characters"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      disabled={isLoading}
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Repeat new password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  {confirmPassword && newPassword !== confirmPassword && (
                    <p className="text-xs text-destructive">Passwords do not match</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full cursor-pointer" 
                  disabled={isLoading || newPassword.length < 6 || newPassword !== confirmPassword}
                >
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Reset Password
                </Button>
              </form>
            </CardContent>
          </>
        )}

        {/* STEP 4: SUCCESS */}
        {step === "SUCCESS" && (
          <>
            <CardHeader className="space-y-1 text-center pb-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-2">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
                Password Reset Successful!
              </CardTitle>
              <CardDescription>
                Your account password has been updated. You can now log in using your new credentials.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              <Button 
                onClick={() => router.push("/login")} 
                className="w-full cursor-pointer"
              >
                Proceed to Login
              </Button>
            </CardContent>
          </>
        )}

        {/* Footer */}
        <CardFooter className="flex flex-col space-y-2 text-center text-sm text-muted-foreground border-t pt-4">
          <div>
            Remember your password?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline cursor-pointer">
              Log In
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
