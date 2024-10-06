"use client"

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const form = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = useCallback(async (data: FormValues) => {
    setErrorMessage('');
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log('Response:', result); // Log the response for debugging

      if (response.ok) {
        if (result && result.ourUsers) {
          // Save token and user info in localStorage
          localStorage.setItem('token', result.token);
          localStorage.setItem('user', JSON.stringify(result.ourUsers));

          // Check user role and navigate accordingly
          if (result.ourUsers.role === 'Admin') {
            router.push('/admin-dashboard'); // Redirect to admin dashboard
          } else {
            router.push('/dashboard'); // Redirect to user dashboard
          }
        } else {
          setErrorMessage('User data is missing in the response.');
        }
      } else {
        // Set error message if response is not OK
        setErrorMessage(result.message || 'Sign-in failed: Incorrect credentials');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      setErrorMessage('An error occurred during sign-in. Please try again.');
    }
  }, [router]);

  return (
    <>
      <h1 className='text-primary font-bold text-3xl'>Login to your Account</h1>
      <p className='text-primary mt-2 font-medium'>with your registered Email Address</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5 mt-7'>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter email address" className='placeholder:text-primary' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter Password" className='placeholder:text-primary' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Remember my password
            </label>
          </div>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          <div>
            <Button type="submit" className='w-full rounded-lg hover:bg-blue-950 border active:bg-gray-400'>
              Sign In
            </Button>
          </div>

          <div className='flex items-center space-x-2'>
            {["", "Or", ""].map((text, index) => {
              if (text === "") {
                return <div key={index} className="w-full border-b border-border" />;
              } else {
                return (
                  <span key={index} className="text-sm font-medium leading-none">
                    {text}
                  </span>
                );
              }
            })}
          </div>

          <div>
            <Button type="button" className="w-full rounded-lg">
              <Link href="/register"> Sign Up</Link>
            </Button>
          </div>
        </form>
      </Form>

      <div className="mt-10 text-center">
        <Link href="/forgot-password">
          Forgot Password
        </Link>
      </div>
    </>
  );
}