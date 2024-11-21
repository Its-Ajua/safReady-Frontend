"use client";

import { Button } from "@/components/ui/button";
import { format, isToday, parseISO } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function StatusPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const formId = searchParams.get("formId");

  const id = formId; // id is set to formId to use in both API calls as per the requirement

  const [status, setStatus] = useState("pending");
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    if (!id) return;

    try {
      setIsLoading(true);

      // Fetching form-reviews status using formId
      const statusResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/form-reviews/${formId}`,
      );
      if (!statusResponse.ok) {
        throw new Error(
          `Failed to fetch form reviews status: ${statusResponse.status}`,
        );
      }

      const statusResult = await statusResponse.json();
      setStatus(statusResult.status);

      if (statusResult.status === "approved") {
        // Fetch the scheduled date using id (which is set from formId)
        const dateResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/form/${id}`,
        );
        console.log(dateResponse);
        if (!dateResponse.ok) {
          throw new Error(
            `Failed to fetch form scheduled date: ${dateResponse.status}`,
          );
        }

        const dateResult = await dateResponse.json();

        if (dateResult.date) {
          const parsedDate = parseISO(dateResult.date);
          setScheduledDate(parsedDate);
        }
      }
    } catch (error: any) {
      console.error("Error fetching form status:", error);
      setError("Unable to fetch form status. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [id, formId]);

  useEffect(() => {
    if (id) {
      fetchStatus();
    }
  }, [id, fetchStatus]);

  const isTodayScheduledDate = scheduledDate && isToday(scheduledDate);

  // Handling loading and error states
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 bg-white dark:bg-gray-600 p-6 rounded-md shadow-md">
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
            <p>
              The link will be available on{" "}
              {scheduledDate
                ? format(scheduledDate, "MMM dd, yyyy")
                : "the scheduled date"}
              .
            </p>
          )}
        </div>
      ) : status === "pending" ? (
        <div>
          <h3>Your form has been submitted</h3>
          <p>We will notify you once it has been approved</p>
        </div>
      ) : (
        <div>
          <p>Unexpected status: {status}</p>
        </div>
      )}
    </div>
  );
}
