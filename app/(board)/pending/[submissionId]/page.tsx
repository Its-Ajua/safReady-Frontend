"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Review {
  status: string;
  feedback: string | null;
}

const PendingPage: React.FC = () => {
  const { submissionId } = useParams();

  const [review, setReview] = useState<Review>({
    status: "pending",
    feedback: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviewFeedback = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/reviews/${submissionId}`,
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data: Review = await response.json();
        setReview(data);
      } catch (err) {
        console.error("Error fetching review feedback:", err);
        setError("Failed to load feedback. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (submissionId) {
      fetchReviewFeedback();
    }
  }, [submissionId]);

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 bg-white dark:bg-gray-600 p-6 rounded-md shadow-md">
      {isLoading ? (
        <p>Loading...</p>
      ) : review.status === "pending" ? (
        <p>Your submission is still pending review.</p>
      ) : review.status === "reviewed" && review.feedback ? (
        <>
          <p>Your submission has been reviewed!</p>
          <p>
            <strong>Feedback:</strong> {review.feedback}
          </p>
        </>
      ) : (
        <p>No feedback has been provided yet.</p>
      )}
    </div>
  );
};

export default PendingPage;

