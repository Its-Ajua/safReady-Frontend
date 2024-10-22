"use client";

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Full name is required",
  }),
  email: z.string()
    .email({ message: "Invalid Email Address", })
    .min(1, { message: "Email is Required", }),
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
  const [submissionId, setSubmissionId] = useState(null);
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      resume: '',
      portfolio: '',
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = useCallback(async (data: FormValues) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      setSubmissionId(result.id);
      
      
      localStorage.setItem('submissionId', result.id);
  
      
      setTimeout(() => {
        router.push('/pending');
      }, 10000); 
      
    } catch (error) {
      console.error(error);
    }
  }, [router]);  
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-blue-700">Submit Your Resume and Portfolio for Review</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-gray-600 p-6 rounded-md shadow-md">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-primary dark:text-white">Full Name</FormLabel>
                <FormControl>
                  <Input type="name" placeholder="Enter your name" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"  
                  {...field} />
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
                <FormLabel className="block text-sm font-medium text-primary dark:text-white">Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter a valid email address" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"  
                    {...field} />
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
                <FormLabel className="block text-sm font-medium text-primary dark:text-white">Resume</FormLabel>
                <FormControl>
                  <Input type="url" placeholder="https://example.com/resume" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"  
                    {...field} />
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
                <FormLabel className="block text-sm font-medium text-primary dark:text-white">Portfolio</FormLabel>
                <FormControl>
                  <Input type="url" placeholder="https://example.com/portfolio" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"  
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Button type="submit" className='w-full rounded-lg hover:bg-blue-950 border active:bg-gray-400'>
              Submit for Review
            </Button>
          </div>

        </form>
      </Form>
      {submissionId && (
      <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg">
        <h2 className="text-lg font-semibold">Submission Successful!</h2>
        <p>Your submission ID is: <span className="font-bold">{submissionId}</span></p>
        <p>We will notify you once your resume and portfolio have been reviewed.</p>
      </div>
)}

    </div>
  );
};
