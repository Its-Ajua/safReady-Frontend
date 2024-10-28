"use client"

import { Button } from "@/components/ui/button";
import { format, isToday } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react";

export default function StatusPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const formId = searchParams.get('formId');
    const [status, setStatus] = useState('pending');
    const [scheduledDate, setScheduledDate] = useState<Date | null>(null);

    const fetchStatus = useCallback(async () => {
        if (!formId) return;
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/form-reviews/${formId}`)
            const result = await response.json();
            setStatus(result.status);
            setScheduledDate(new Date(result.date))
        } catch (error) {
            console.error("Failed to fetch form status:", error);
        }
    }, [formId])

    useEffect (() => {
        if (formId) {
            fetchStatus();
        }
    }, [formId, fetchStatus]);

    const isTodayScheduledDate = scheduledDate && isToday(scheduledDate);

    return (
        <div className="container mx-auto px-4 py-8 ">
            {status === "approved" ? (
                <div className="text-center bg-white dark:bg-gray-600 text-green-400 p-6 rounded-md shadow-md">
                    <h3>Your date has been approved</h3>


                    {isTodayScheduledDate ? (
                        <div>
                            <p>Click the link below to join:</p>
                            <Button onClick={() => router.push(`/scheduled-calls/${formId}`)}>
                                Go to Scheduled Call
                            </Button>
                        </div>
                    ) : (
                        <p>The link will be available on scheduled date.</p>
                    )}
                </div>
             ) : status === "pending" ? (
                <div>
                    <h3>Your form has been submitted</h3>
                    <p>We will notify once it has been approved</p>
                </div>
            ) : null}
        </div>
    );
}