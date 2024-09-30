import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function page() {
  return (
    <div className="h-screen flex flex-col bg-black justify-center items-center">
      <div className="max-w-md text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-500 mb-4">Welcome to SafReady</h1>
        <Link href="/login">
          <Button className="rounded-full border-2 border-transparent hover:border-blue-500 hover:bg-gray-600 transition duration-300 px-6 py-3">Get Started</Button>
        </Link>
      </div>
    </div>
  );
}
