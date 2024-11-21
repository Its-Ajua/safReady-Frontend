"use client";

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { format, parse, isBefore, isAfter } from "date-fns";
import { Input } from "@/components/ui/input";
import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z, date } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
    name: z.string().min(1, {
        message: "Full name is required",
    }),
    email: z.string().email({ message: "Invalid Email Address" }).min(1, { message: "Email is required" }),
    date: z.date({
        required_error: "Date is required",
    }),
    time: z.string().min(1, {
        message: "Time is required",
    }),
    message: z.string().min(1, {
        message: "Additional message is required",
    }),
});

export default function ContactForm() {
    const router = useRouter();
    const [formId, setFormId] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formStatus, setFormStatus] = useState("pending");
    const [scheduledDate, setScheduledDate] = useState<Date | null>(null);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 14);

    const formattedMinDate = format(minDate, "MMM dd, yyyy");
    const formattedMaxDate = format(maxDate, "MMM dd, yyyy");

    const isDateDisabled = (date: Date): boolean => {
        const formattedDate = format(date, "MMM dd, yyyy");
        const parsedMinDate = parse(formattedMinDate, "MMM dd, yyyy", new Date());
        const parsedMaxDate = parse(formattedMaxDate, "MMM dd, yyyy", new Date());

        return isBefore(date, parsedMinDate) || isAfter(date, parsedMaxDate);
    };

    useEffect(() => {
        localStorage.removeItem("formId");
    }, []);

    const onSubmit = useCallback(
        async (data: z.infer<typeof FormSchema>) => {
            const { date, ...rest } = data;
            const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
            const payload = { ...rest, date: utcDate.toISOString() };

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/form`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });
                const result = await response.json();
                localStorage.setItem("formId", result.id);
                router.push(`/status?formId=${result.id}`);
            } catch (error) {
                console.error("Form submission error:", error);
            }
        },
        [router]
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-blue-800">Schedule a Live Call</h2>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-gray-600 p-6 rounded-md shadow-md">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-primary dark:text-white">Full Name</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Enter your full name"
                                        className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                                <FormLabel className="text-sm font-medium text-primary dark:text-white">Email Address</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="Enter a valid email address"
                                        className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-primary dark:text-white">Date</FormLabel>
                                <FormControl>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button variant={"outline"} className={cn("flex w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
                                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={isDateDisabled} initialFocus />
                                        </PopoverContent>
                                    </Popover>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-primary dark:text-white">Time</FormLabel>
                                <FormControl>
                                    <Input type="time" className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-primary dark:text-white">Additional Message</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Add any extra information here"
                                        className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full rounded-lg hover:bg-blue-950 border active:bg-gray-400">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
}
