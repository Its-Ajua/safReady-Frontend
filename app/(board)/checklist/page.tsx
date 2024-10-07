"use client"
import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ChecklistItem {
  title: string;
  description: string;
  link?: string;
}

const checklistItems: ChecklistItem[] = [
    {
        title: 'Learn Essential Technologies',
        description: 'Be proficient in core technologies like HTML, CSS, and JavaScript.',
        link: 'https://www.freecodecamp.org/',
    },
    {
        title: 'Build a Portfolio Website',
        description: 'Create a personal portfolio to showcase your work.',
        link: 'https://pages.github.com/',
    },
    {
    title: 'Create a Resume',
    description: 'Build a strong tech-focused resume that highlights your skills, projects, and experience.',
    link: 'https://www.canva.com/resumes/templates/',
  },
  {
    title: 'Optimize LinkedIn Profile',
    description: 'Update your LinkedIn profile to reflect your skills and experience.',
    link: 'https://www.linkedin.com/pulse/linkedin-profile-optimization-20-step-cheat-sheet-andy-foote/',
  },
  {
    title: 'Build Github Reposities',
    description: 'Host your projects on GitHub, showcasing clean, well-documented code.',
    link: 'https://pages.github.com/',
  },
  {
    title: 'Contribute to Open Source',
    description: 'Gain real-world experience by contributing to open-source projects.',
    link: '',
  },
  {
    title: 'Practice Interview Skills',
    description: 'Practice common technical interview questions, algorithms, and soft skills.',
    link: '',
  },
  {
    title: 'Prepare a Cover Letter',
    description: 'Write a custom cover letter for each job application.',
    link: '',
  },
  {
    title: 'Network in the Tech Community',
    description: 'Join tech forums, attend webinars, or participate in local or online coding events.',
    link: '',
  },
  {
    title: 'Apply for Jobs',
    description: 'Regularly apply for job openings, customizing your application for each position',
    link: '',
  },
  {
    title: 'Take Online Courses',
    description: 'Complete relevant online courses or certifications to enhance your knowledge',
    link: '',
  },
  {
    title: 'Join Communities and Forums',
    description: 'Engage with tech communities to learn from others and share knowledge.',
    link: '',
  },
  {
    title: 'Attend Tech Meetups or Webinars',
    description: 'Attend local or online meetups, conferences, or webinars to learn from industry experts.',
    link: '',
  },
  {
    title: 'Freelancing or Internships',
    description: 'Gain hands-on experience by taking freelance projects or applying for internships.',
    link: '',
  },
];

const Checklist = () => {

  const [completedItems, setCompletedItems] = useState<boolean[]>(Array(checklistItems.length).fill(false));

  const toggleCompletion = (index: number) => {
    const updatedItems = [...completedItems];
    updatedItems[index] = !updatedItems[index];
    setCompletedItems(updatedItems);
  };


  return (
    <div className="container mx-auto px-1 py-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-primary">Job Readiness Checklist for Tech Graduates</h2>
      <ul className="space-y-6">
        {checklistItems.map((item, index) => (
          <li
            key={index}
            className={`bg-white shadow-md dark:bg-gray-700 dark:text-blue-600 rounded-lg p-1 lg:p-1 transition overflow-auto flex items-center justify-between ${
              completedItems[index] ? 'bg-gray-200' : 'hover:bg-gray-50'
            }`}
          >
          <div>
            <h3 className="text-md mt-2 font-bold text-blue-600">{item.title}</h3>
            <p className="text-gray-700 dark:text-black mt-2">{item.description}</p>
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Learn More
              </a>
            )}
          </div>
          <Button onClick={() => toggleCompletion(index)} className="ml-4">
              {completedItems[index] ? (
                <CheckCircle className="text-green-500 w-8 h-8 transition-transform transform scale-110"/>
              ) : (
                <Circle className="text-gray-400 w-8 h-8 transition-transform transform hover:scale-110" />
              )}
          </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Checklist;
