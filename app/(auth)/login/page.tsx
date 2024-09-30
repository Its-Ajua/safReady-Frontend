"use client"

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


const formSchema = z.object({
  email: z.string()
    .min(1, {message: "Email Address is required"}),
  password: z.string()
    .min(1, {message: "Password is required"}),
})

type FormValues = z.infer<typeof formSchema>;


export default function loginPage() {
  const form = useForm({
    defaultValues: {
        email: '',
        password: '',
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = useCallback((data: FormValues) => {
    console.log(data);
  }, [])
  return (
        <>
          <h1 className='text-primary font-bold text-3xl'>Login to your Account</h1>
          <p className='text-primary mt-2 font-medium'>with your registered Email Address</p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5 mt-7'/>
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email address " className='placeholder:text-primary' 
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
          </Form>
        </>
  )
}

