"use client"

import React, { useState, useEffect } from 'react';

const Review = () => {
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState('pending');

  // Get submissionId from localStorage on component mount
  useEffect(() => {
    const storedSubmissionId = localStorage.getItem('submissionId');
    if (storedSubmissionId) {
      setSubmissionId(storedSubmissionId);
    }
  }, []);

  // Fetch the review data based on the submissionId
  useEffect(() => {
    const fetchReview = async () => {
      if (!submissionId) return; // Avoid fetching if no submissionId is available

      try {
        const response = await fetch(`http://localhost:8080/reviews?submissionId=${submissionId}`);
        const result = await response.json();
        setFeedback(result.feedback);
        setStatus(result.status); // Assuming the status is either 'pending' or 'reviewed'
      } catch (error) {
        console.error('Error fetching review:', error);
      }
    };

    fetchReview(); // Call the async function
  }, [submissionId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Review</h2>

      {status === 'pending' ? (
        <p className="text-gray-600">Please wait for the admin to review your submission.</p>
      ) : (
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Feedback:</h3>
          <p className="text-gray-800">{feedback}</p>
        </div>
      )}
    </div>
  );
};

export default Review;
