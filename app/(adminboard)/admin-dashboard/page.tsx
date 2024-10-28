"use client"

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const DashBoardList = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    reviewsSubmitted: 0,
    liveSessionsScheduled: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const fetchStats = async () => {
    try {
      const [totalUsers, reviewsSubmitted, liveSessionsScheduled] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/submissions`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/form`),
      ]);

      if (!totalUsers.ok || !reviewsSubmitted || !liveSessionsScheduled) {
        throw new Error('Failed to fetch stats')
      }

      const users = await totalUsers.json();
      const resumes = await reviewsSubmitted.json();
      const scheduledCalls = await liveSessionsScheduled.json();

      setStats({
        totalUsers: users.length,
        reviewsSubmitted: resumes.length,
        liveSessionsScheduled: scheduledCalls.length,
      })
    } catch (err) {
      const errorMessage = (err as Error).message || 'An unknown error occurred';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }

    useEffect(() => {
      fetchStats();
    }, []);

    if (isLoading) 
      return 
      <Loader2 className="animate-spin"/>
    if (error) return <p>Error: {error}</p>;
    }
  return (
    <div className="min-h-screen shadow-xl flex flex-col items-center justify-center py-10">

      {/* Welcome Message */}
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Welcome SAFReady Admin!</h1>

      {/* Stats Boxes */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10 w-full max-w-5xl">
        <div className="bg-white text-center p-6 rounded-xl shadow-lg">
          <h2 className="text-4xl font-bold text-blue-900">{stats.totalUsers}</h2>
          <p className="text-lg text-gray-700 mt-2">Users</p>
        </div>
        <div className="bg-white text-center p-6 rounded-xl shadow-lg">
          <h2 className="text-4xl font-bold text-blue-900">{stats.reviewsSubmitted}</h2>
          <p className="text-lg text-gray-700 mt-2">Resumes Submitted</p>
        </div>
        <div className="bg-white text-center p-6 rounded-xl shadow-lg">
          <h2 className="text-4xl font-bold text-blue-900">{stats.liveSessionsScheduled}</h2>
          <p className="text-lg text-gray-700 mt-2">Sessions Scheduled </p>
        </div>
      </div>
    </div>
  );
};

export default DashBoardList;