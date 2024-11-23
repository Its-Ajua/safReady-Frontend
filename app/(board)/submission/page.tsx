"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Full name is required",
  }),
  email: z
    .string()
    .email({ message: "Invalid Email Address" })
    .min(1, { message: "Email is Required" }),
  resume: z.string().min(1, {
    message: "Resume Link is required",
  }),
  portfolio: z.string().min(1, {
    message: "Portfolio Link is required",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Submission() {
  const router = useRouter();
  const [user, setUser] = useState({ firstname: "", lastname: "", email: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Invalid user data in localStorage:", error);
      }
    }
  }, []);

  const form = useForm({
    defaultValues: {
      name: user.firstname && user.lastname ? `${user.firstname} ${user.lastname}` : "",
      email: user.email ?? "",
      resume: "",
      portfolio: "",
    },
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    // Update form default values once user data is loaded
    form.setValue("name", user.firstname && user.lastname ? `${user.firstname} ${user.lastname}` : "");
    form.setValue("email", user.email ?? "");
  }, [user, form]);

  const onSubmit = async (data: FormValues) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/submissions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("submissionId", result.id);
        router.push(`/pending/${result.id}`);
      } else {
        console.error("Submission failed:", result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-blue-700">
        Submit Your Resume and Portfolio for Review
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 bg-white dark:bg-gray-600 p-6 rounded-md shadow-md"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-primary dark:text-white">
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder="Enter your name"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-primary dark:text-white">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder="Enter a valid email address"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="resume"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-primary dark:text-white">
                  Resume
                </FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://example.com/resume"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="portfolio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-primary dark:text-white">
                  Portfolio
                </FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://example.com/portfolio"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Button
              type="submit"
              className="w-full rounded-lg hover:bg-blue-950 border active:bg-gray-400"
            >
              Submit for Review
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
