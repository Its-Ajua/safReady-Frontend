"use client";
import { useEffect, useState } from 'react';;



const PendingPage = () => {
  const [review, setReview] = useState(() => {
    const storedReview = localStorage.getItem('review');
    return storedReview ? JSON.parse(storedReview) : { status: 'pending', feedback: '' };
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchReviewStatus = async () => {
    try {
      const submissionId = localStorage.getItem('submissionId');
      const response = await fetch(`http://localhost:8080/auth/reviews/${submissionId}`);
      if (!response.ok) throw new Error('Failed to fetch review');
      const result = await response.json();
      setReview(result);
      localStorage.setItem('review', JSON.stringify(result));
    } catch (error) {
      console.error('Error fetching review:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchReviewStatus, 5000); // Poll every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Your Submission Status</h2>
      {review.status === 'pending' ? (
        <p className="text-gray-600">Your submission is still pending review.</p>
      ) : (
        <>
          <p className="text-green-600">Your submission has been reviewed!</p>
          <p><strong>Feedback:</strong> {review.feedback}</p>
        </>
      )}
    </div>
  );
};

export default PendingPage;