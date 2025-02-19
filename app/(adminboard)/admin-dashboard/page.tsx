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
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const [usersResponse, resumesResponse, scheduledCallsResponse] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/users`, { headers }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/submissions`, { headers }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/form`, { headers }),
      ]);

      if (!usersResponse.ok || !resumesResponse.ok || !scheduledCallsResponse.ok) {
        throw new Error('Failed to fetch stats')
      }

      const users = await usersResponse.json();
      const resumes = await resumesResponse.json();
      const scheduledCalls = await scheduledCallsResponse.json();

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
  }

    useEffect(() => {
      fetchStats();
    }, []);

    if (isLoading) 
      return 
      <Loader2 className="animate-spin"/>
    if (error) return <p>Error: {error}</p>;
    
  return (
    <div className="min-h-screen shadow-xl flex flex-col items-center justify-center py-10">

      <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Welcome SAFReady Admin!</h1>

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