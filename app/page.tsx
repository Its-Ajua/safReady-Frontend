"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

//<div className="max-w-md text-center mx-auto"> 

export default function page() {
  return (
    <div className="h-screen flex justify-center items-center relative">
      <Image  src="/images/blue-and-white-background.jpg" alt='' fill className="blur-sm shadow-sm -z-10"/>  
        <div className="backdrop-blur-sm bg-primary/50 w-full h-full absolute inset-0 -z-10" />
        <div className="text-center">
        <h1 className="text-3xl sm:text-6xl font-bold text-white mb-2">Welcome to SAFReady</h1>
        <p className="font-semibold text-1xl text-black mb-4">
          Ready to step into tech? SAFReady provides the essential tools to help you build your career, click on the link below to find out more...
        </p>
        <p className="font-medium text-gray-900 mb-4">&quot;The future belongs to those who prepare for it today.&quot; - <em>Malcolm X</em></p>
        <Link href="/register">
            <Button className="rounded-full border-2 border-transparent hover:border-blue-500 hover:bg-gray-600 transition duration-300 px-6 py-3">Get Started</Button>
          </Link>
        </div>
    </div>
  );
}
