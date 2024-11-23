"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { UserRoundIcon } from "lucide-react";

type User = {
  firstname: string;
  lastname: string;
  email: string;
};

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userId = localStorage.getItem("userId");
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUser(data);
        console.log(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!user) {
    return <p>No user data found. Please log in.</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg space-y-6">
      <h1 className="text-primary font-bold text-3xl text-center">Your Profile</h1>
      
      <div className="bg-gray-100 dark:bg-gray-400 p-6 rounded-lg">
        <p className="text-black text-lg font-medium mb-2">First Name:</p>
        <p className="text-primary text-lg mb-4">{user.firstname}</p>

        <p className="text-black text-lg font-medium mb-2">Last Name:</p>
        <p className="text-primary text-lg mb-4">{user.lastname}</p>

        <p className="text-black text-lg font-medium mb-2">Email:</p>
        <p className="text-primary text-lg">{user.email}</p>
      </div>
      
      <div className="mt-8 text-center">
      <Button
        onClick={() => {
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user.role === "Admin") {
              router.push("/admin-dashboard");
            } else {
              router.push("/dashboard");
            }
          } else {
            console.error("User data not found.");
          }
        }}
        className="w-full rounded-lg"
      >
        Back to Dashboard
      </Button>
      </div>
    </div>
  );
}
