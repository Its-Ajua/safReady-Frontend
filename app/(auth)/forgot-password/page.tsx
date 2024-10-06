"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormLabel, FormMessage, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";


const formSchema = z.object({
  email: z.string()
    .min(1, { message: "Email Address is required"})
    .email({ message: "Invalid email address"}),
})

type FormValues = z.infer<typeof formSchema>;

export default function resetPasswordPage() {
    const form = useForm({
      defaultValues: {
          email: '',
      },
      resolver: zodResolver(formSchema),
    });
      
    const onSubmit = useCallback((data: FormValues) => {
      console.log("data", data);
    }, []);
  

    return (
      <>
          <h1 className="text-primary font-bold text-3xl">Reset Password</h1>
          <p className=" text-primary mt-2 text-lg ">Kindly enter your registered Email Address</p>

          <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-7">
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                      <FormItem>
                       <FormLabel>Email address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter email address" {...field}/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                  />

                    <div>
                        <Link href="/confirm-reset">
                            <Button type="submit" className="w-full rounded-lg">
                                Reset
                            </Button>
                        </Link>
                    </div>
                    
                    
                

            

                  <div className="flex items-center space-x-2">
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
                      <Link href="/login">
                            <Button type="button" className="bg-white text-black shadow-md  w-full rounded-lg"> Back to Login</Button>
                      </Link>
                   </div>
                </form>
        </Form>
      </>
    );
};