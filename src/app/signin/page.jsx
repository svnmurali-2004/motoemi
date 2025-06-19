"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { useTheme } from "next-themes";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
 // Adjust the import path as needed
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setTheme, theme } = useTheme();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Use NextAuth signIn for credentials
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.error) {
      // handle error (show message, etc.)
      console.error(res.error);
    } else {
      console.log("Login successful, redirecting to dashboard...");
      redirect("admin/dashboard"); // Redirect to dashboard on success
      console.log("Login successful, redirecting to dashboard...");
    }
  };

  const handleGoogleLogin = () => {
    // Use NextAuth signIn for Google
    signIn("google");
  };
  console.log("Current theme:", theme);
  console.log("Available themes:", ["light", "dark", "system"]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4 ">
      <SmoothCursor />
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold">
            Login to Your Account
          </CardTitle>
          <Button
            variant="ghost"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-xs"
          >
            Toggle {theme === "dark" ? "Light" : "Dark"} Mode
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full cursor-none">
              Login
            </Button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                or
              </span>
            </div>
          </div>

          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 cursor-none"
          >
            <FcGoogle size={20} />
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
