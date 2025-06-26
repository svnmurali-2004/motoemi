"use client";

import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { Toaster, toast } from "react-hot-toast";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { useLoading } from "@/context/LoadingContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [branch, setBranch] = useState("");
  const { setTheme, theme } = useTheme();
  const router = useRouter();
  const { show: showLoading, hide: hideLoading } = useLoading();
  const branches = ["Main", "Branch A", "Branch B", "Branch C"];

  const handleLogin = async (e) => {
    e.preventDefault();
    if (role === "employee" && !branch) {
      toast.error("Please select a branch.");
      return;
    }
    showLoading();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      role,
      branch: role === "employee" ? branch : undefined,
    });
    if (res?.error) {
      toast.error(res.error || "Login failed");
      hideLoading();
    } else {
      toast.success("Login successful! Redirecting...");
      if (role === "admin") {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/employee/receipts");
      }
      hideLoading() 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100/60 via-white/80 to-purple-100/60 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 px-4">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: theme === "dark" ? "#18181b" : "#fff",
            color: theme === "dark" ? "#fff" : "#18181b",
          },
          className:
            "rounded-lg shadow-lg border border-gray-200 dark:border-gray-800",
        }}
      />
      <Card className="w-full max-w-md rounded-3xl shadow-2xl border-0 bg-white/80 dark:bg-gray-900/90 backdrop-blur-md">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-md">
            Welcome to MotoEmi
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Sign in to your account
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="flex gap-4 items-center justify-center">
              <Label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === "admin"}
                  onChange={() => setRole("admin")}
                  className="accent-blue-500 dark:accent-purple-500"
                />
                Admin
              </Label>
              <Label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="employee"
                  checked={role === "employee"}
                  onChange={() => setRole("employee")}
                  className="accent-blue-500 dark:accent-purple-500"
                />
                Employee
              </Label>
            </div>
            {role === "employee" && (
              <div>
                <Label htmlFor="branch">Branch</Label>
                <select
                  id="branch"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  required
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 mt-1 bg-white/80 dark:bg-gray-800/80 text-foreground focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 outline-none"
                >
                  <option
                    value=""
                    className="text-gray-500 bg-white/90 dark:bg-gray-800/80 dark:text-gray-400 italic"
                  >
                    Select branch
                  </option>
                  {branches.map((b) => (
                    <option
                      key={b}
                      value={b}
                      className="bg-white/90 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 hover:bg-blue-100 dark:hover:bg-purple-900 transition-colors"
                    >
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-lg bg-white/90 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500"
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
                className="rounded-lg bg-white/90 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500"
              />
            </div>
            <Button
              type="submit"
              className="w-full rounded-lg font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-md hover:scale-[1.03] transition-transform dark:from-purple-700 dark:via-fuchsia-700 dark:to-pink-700 cursor-pointer"
              disabled={role === "employee" && !branch}
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
