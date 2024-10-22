"use client";

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

const feedbackSchema = z.object({
  feedback: z.string().min(1, { message: 'Feedback is required' }),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

const AdminReviewPage = () => {
  const params = useParams()

  const submissionId = params?.submissionId
  console.log(submissionId)
  const router = useRouter();
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const form = useForm<FeedbackFormValues>({
    defaultValues: {
      feedback: '',
    },
    resolver: zodResolver(feedbackSchema),
  });

  const onSubmit = async (data: FeedbackFormValues) => {
    setErrorMessage('');
    try {
      const reviewData = {
        submissionId,
        feedback: data.feedback,
        status: 'reviewed',
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reviews/${submissionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response}`);
      }

      const result = await response.json();
      console.log('Submission successful:', result);
      setIsReviewSubmitted(true);
      router.push('/reviewspage');
    } catch (error) {
      console.error('Error submitting review:', {error});
      setErrorMessage('Failed to submit review. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Submit Feedback for Submission {submissionId}</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-7">
          <FormField
            control={form.control}
            name="feedback"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Feedback</FormLabel>
                <FormControl>
                  <textarea 
                    {...field}
                    className="w-full p-2 border" 
                    rows={4} 
                    placeholder="Enter your feedback here"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {isReviewSubmitted && <p className="text-green-600">Review submitted successfully!</p>}

          <Button type="submit" className="mt-4 bg-blue-500 text-white p-2">
            Save Review
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AdminReviewPage;
