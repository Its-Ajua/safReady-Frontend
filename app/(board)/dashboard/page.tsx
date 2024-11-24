"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect } from "react";
import { FaCheckCircle, FaClipboardList, FaEnvelope } from "react-icons/fa";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AOS from "aos";
import "aos/dist/aos.css";
import { redirect } from "next/navigation";

const checklistItems = [
  {
    title: "Job Search Checklist",
    description:
      "Are you a tech professional navigating the competitive job market? Our Job Search Checklist is designed for young tech talents like you, simplifying the job search process into actionable steps to help you stand out and be prepared.",
    link: "/checklist",
    icon: <FaClipboardList className="text-blue-900" />,
  },
  {
    title: "Resume/Portfolio Review",
    description:
      "Are you unsure if your resume or portfolio showcases your best self? Our Resume/Portfolio Review feature offers expert feedback to help you identify strengths and areas for improvement.",
    link: "/submission",
    icon: <FaCheckCircle className="text-blue-900" />,
  },
  {
    title: "Contact Form",
    description:
      "Feeling lost in your job search? Our contact form makes it easy to schedule a live session for personalized career guidance.",
    link: "/contact-form",
    icon: <FaEnvelope className="text-blue-900" />,
  },
];

const resources = [
  {
    title: "LinkedIn Tips",
    description:
      "Learn how to optimize your LinkedIn profile to attract recruiters.",
    link: "https://www.linkedin.com/help/linkedin/answer/15/optimizing-your-profile?lang=en",
  },
  {
    title: "Interview Preparation Guide",
    description:
      "Get tips and resources to prepare for job interviews effectively.",
    link: "https://www.thebalancecareers.com/interview-preparation-tips-2060995",
  },
  {
    title: "Networking Strategies",
    description:
      "Discover effective strategies for networking in the tech industry.",
    link: "https://www.forbes.com/sites/forbescoachescouncil/2021/07/23/networking-strategies-for-technical-professionals/?sh=2c2bdfbb6c36",
  },
];

const reviews = [
  {
    reviewer: "Jane Doe",
    feedback:
      "The Job Search Checklist was a game changer for me! I landed my first job in tech.",
  },
  {
    reviewer: "John Smith",
    feedback:
      "I love the Resume/Portfolio Review feature. The feedback I received was incredibly helpful!",
  },
  {
    reviewer: "Emily Johnson",
    feedback:
      "The resources provided are very insightful. Highly recommend to anyone looking for a job in tech!",
  },
];

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-5xl"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {resources.map((resource, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    <a
                      href={resource.link}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {resource.description}
                    </a>
                  </p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export function ReviewsCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-5xl mt-10"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {reviews.map((review, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <h4 className="text-lg font-semibold text-gray-800">
                    {review.reviewer}
                  </h4>
                  <p className="text-gray-600 mt-2 italic">{review.feedback}</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

const DashBoardList = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="min-h-screen shadow-xl flex flex-col items-center justify-center py-10">
      <div
        className="text-3xl font-semibold mb-6 text-gray-900 dark:text-blue-700 text-center"
        data-aos="zoom-in-up"
      >
        Welcome to Your SAFReady!
      </div>
      <h4 className="text-gray-600 text-center mb-8 px-4" data-aos="fade-right">
        Ready to elevate your career? Explore tailored resources to sharpen your
        skills, get feedback on your resume or portfolio, and schedule guidance
        sessions to stay ahead in your job search.
      </h4>

      <CarouselPlugin />

      <ul className="block lg:flex mt-10 space-y-6 lg:space-y-0 lg:space-x-6 w-full max-w-5xl">
        {checklistItems.map((item, index) => (
          <li
            key={index}
            className="grid-cols-3 gap-6 mb-10 w-full max-w-4xl bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6 hover:bg-gray-50 hover:scale-105 transition duration-300 ease-in-out"
          >
            <h3 className="flex items-center dark:text-white space-x-3 text-xl font-bold text-gray-700">
              {item.icon}
              <span>{item.title}</span>
            </h3>
            <p className="text-gray-600 dark:text-black mt-3">
              {item.description}
            </p>
            <Button asChild>
              <Link
                href={item.link}
                className="mt-4 bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
              >
                Start Your Journey
              </Link>
            </Button>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-blue-700 text-center mb-6">
          What Our Users Say
        </h3>
        <ReviewsCarousel />
      </div>
    </div>
  );
};

export default DashBoardList;
