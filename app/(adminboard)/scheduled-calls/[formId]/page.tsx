"use client";

import { useParams } from "next/navigation";
import React from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

interface ContactForm {
  id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  message: string;
}

interface AdminForm {
  formId: string;
  status: string;
  feedback: string;
}

const fetchFormReview = async (formId: string): Promise<AdminForm> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/form-reviews/${formId}`);
  if (!response.ok) {
    throw new Error("Review not found");
  }
  return response.json();
};

// Update this function to use 'id' instead of 'formId'
const fetchContactForm = async (id: string): Promise<ContactForm> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/form/${id}`); // Changed 'formId' to 'id'
  if (!response.ok) {
    throw new Error("Form not found");
  }
  return response.json();
};

export default function SessionPage() {
  const { formId: id } = useParams<{ formId: string }>(); // Destructure 'formId' as 'id'

  // Fetch both form review and contact form data
  const { data: reviewData, isLoading: loadingReview } = useQuery({
    queryKey: ["review", id],
    queryFn: () => fetchFormReview(id),
    enabled: !!id,
  });

  const { data: contactData, isLoading: loadingContact } = useQuery({
    queryKey: ["contact", id],
    queryFn: () => fetchContactForm(id), // Pass 'id' to fetchContactForm
    enabled: !!id,
  });

  // Show loading state while either query is loading
  if (loadingReview || loadingContact) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin" size={24} />
      </div>
    );
  }

  // Show error state if either data is missing
  if (!reviewData || !contactData) {
    console.log("Review Data:", reviewData);
    console.log("Contact Data:", contactData);
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Session not found</p>
      </div>
    );
  }


  // Verify that the session is approved
  if (reviewData.status !== "approved") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>This session has not been approved</p>
      </div>
    );
  }

  const roomName = `safready-session-${id}-${contactData.name.replace(/\s+/g, '-')}`;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          Session with {contactData.name}
        </h1>
        <div className="rounded-lg overflow-hidden border border-slate-200">
          <JitsiMeeting
            domain="meet.jit.si"
            roomName={roomName}
            configOverwrite={{
              disableModeratorIndicator: true,
              enableEmailInStats: false,
            }}
            interfaceConfigOverwrite={{
              SHOW_JITSI_WATERMARK: false,
            }}
            getIFrameRef={(node) => (node.style.height = "600px")}
          />
        </div>
      </div>
    </div>
  );
}