"use client";

import { Button } from "@/components/ui/button";
import { format, isToday } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function StatusPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const formId = searchParams.get("formId");

  const id = formId;

  const [status, setStatus] = useState("pending");
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    if (!id) {
      console.error("No form ID provided");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      setIsLoading(true);

      const statusResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/form-reviews/${formId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (!statusResponse.ok) {
        throw new Error(
          `Failed to fetch form reviews status: ${statusResponse.status}`
        );
      }

      const statusResult = await statusResponse.json();
      setStatus(statusResult.status);

      if (statusResult.status === "approved") {
        const dateResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/form/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!dateResponse.ok) {
          throw new Error(
            `Failed to fetch form scheduled date: ${dateResponse.status}`
          );
        }

        const dateResult = await dateResponse.json();
        console.log("Date Result:", dateResult);

        if (dateResult.date && Array.isArray(dateResult.date)) {
          try {
            // Create date from array [year, month, day]
            // Note: JavaScript months are 0-based, so we subtract 1 from the month
            const [year, month, day] = dateResult.date;
            
            // If time is available in the response, use it
            let hours = 0;
            let minutes = 0;
            if (Array.isArray(dateResult.time) && dateResult.time.length === 2) {
              [hours, minutes] = dateResult.time;
            }
            
            const parsedDate = new Date(year, month - 1, day, hours, minutes);
            
            // Validate that we got a valid date
            if (!isNaN(parsedDate.getTime())) {
              setScheduledDate(parsedDate);
            } else {
              console.error("Invalid date after parsing:", dateResult.date);
              setError("Invalid date format received from server");
            }
          } catch (parseError) {
            console.error("Error parsing date:", parseError);
            setError("Error processing the scheduled date");
          }
        } else {
          console.error("Invalid date format received:", dateResult.date);
          setError("Invalid date format received from server");
        }
      }
    } catch (error: any) {
      console.error("Error fetching form status:", error);
      setError(error.message || "An error occurred while fetching the form status");
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
        <p className="text-red-500">{error}</p>
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
                ? format(scheduledDate, "MMM dd, yyyy 'at' hh:mm a")
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