"use client";

import React, { useEffect, useState } from 'react';

export default function ProfilePage() {
    const [user, setUser] = useState(null); // Initialize user state

    useEffect(() => {
        const storedUser = localStorage.getItem('user'); // Get user info from local storage

        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser); // Parse and set user state
                setUser(parsedUser);
            } catch (error) {
                console.error("Failed to parse user data from localStorage:", error);
            }
        }
    }, []);

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">No user data found</h2>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">User Profile</h2>
            <div>
                <h3 className="text-lg font-medium">{user}</h3>
            </div>
        </div>
    );
}