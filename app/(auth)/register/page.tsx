"use client"

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  firstname: z.string()
    .min(1, {message: "Firstname is required"}),
  lastname: z.string()
    .min(1, {message: "Lastname is required"}),
  email: z.string()
    .min(1, {message: "Email Address is required"})
    .email({message: "Invalid email address"}),
  password: z.string()
    .min(1, {message: "Password is required"}),
  confirmPassword: z.string().min(1, { message: 'Please confirm password' }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
})

type FormValues = z.infer<typeof formSchema>;


export default function SignupPage() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true); 
  }, []);

  const form = useForm({
    defaultValues: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = useCallback(async (data: FormValues) => {
    const payload = {
      ...data,
      role: 'User',
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user)); 
      
        if (isMounted) {
          router.push('/login');
        }
      } else {
        console.error('Sign-up failed');
      }
    } catch (error) {
      console.error('Error during sign-up', error);
    }
  }, [isMounted, router]);

  if (!isMounted) {
    return null; 
  }

  return (
        <>
          <h1 className='text-primary font-bold text-3xl'>Sign up to your Account</h1>
          <p className='text-primary mt-2 font-medium'>with your registered Email Address</p>

          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5 mt-7'>
          <div className="grid sm:grid-cols-2 gap-4">
          <FormField
              control={form.control}
              name="firstname"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Firstname</FormLabel>
                  <FormControl>
                    <Input type="firstname" placeholder="Enter your firstname" className='placeholder:text-primary' 
                    {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastname"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Lastname</FormLabel>
                  <FormControl>
                    <Input type="lastname" placeholder="Enter your lastname" className='placeholder:text-primary' 
                    {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email address" className='placeholder:text-primary' 
                    {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter Password" className='placeholder:text-primary' 
                    {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="confirmPassword" placeholder="Confirm Password" className='placeholder:text-primary' 
                    {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          
            <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                    <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                    I agree to the {""}<a href='#' className='text-primary'>Terms of Service</a>
                    </label>
            </div>

            <div>
                <Button type="submit" className='w-full rounded-lg'>
                  Register
                  </Button>
            </div>
            </form>
          </Form>
          
          <div className="mt-10 text-center">
              <p>Already have an account? {""}
                <Link href="/login" className="text-primary hover:underline">
                Login
                </Link>
            </p>     
            </div>
        </>    
    );
};