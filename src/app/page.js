"use client";
import Image from "next/image";
import AuthButton from "@/components/AuthButton";
import { useSession } from "next-auth/react";
import { ChartBarDefault } from "@/components/ChartBarDefault.js";
import { PieChartDemo } from "@/components/PieChartDefault";
import {  PieDonutDemo } from "@/components/PieDonutDefault";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loading  from "./loading";
export default  function Home() {
  const { data: session } = useSession();
  console.log("Session Data:", session);
  const [s,setS]=useState(true)
  
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 text-9xl text-orange-700">
        jai shree ram
      </div>
      <div className="flex flex-row items-center justify-between flex-grow-1">
        <ChartBarDefault />
        <PieChartDemo />
        <PieDonutDemo />
      </div>
      <AuthButton />
      <Button onClick={() => setS(!s)} className="bg-blue-500 text-white p-4 rounded-lg">
        press to see loader
      </Button>
      <Link href="/admin/dashboard" className="text-blue-500 underline">
        Go to Dashboard
      </Link>
    </>
  );
}
