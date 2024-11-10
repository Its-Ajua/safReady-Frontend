"use client"
import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { LoggerInstance } from 'next-auth';

interface ChecklistItem {
  id: number,
  title: string;
  description: string;
  link?: string;
}

const checklistItems: ChecklistItem[] = [
    {
        id: 1,
        title: 'Learn Essential Technologies',
        description: 'Be proficient in core technologies like HTML, CSS, and JavaScript.',
        link: 'https://www.freecodecamp.org/',
    },
    {
        id: 2,
        title: 'Build a Portfolio Website',
        description: 'Create a personal portfolio to showcase your projects and skills.',
        link: 'https://pages.github.com/',
    },
    {
        id: 3,
        title: 'Create a Strong Resume',
        description: 'Build a tech-focused resume that highlights your skills, projects, and experience.',
        link: 'https://www.canva.com/resumes/templates/',
    },
    {
        id: 4,
        title: 'Optimize Your LinkedIn Profile',
        description: 'Update your LinkedIn profile to reflect your skills and experiences accurately.',
        link: 'https://www.linkedin.com/pulse/linkedin-profile-optimization-20-step-cheat-sheet-andy-foote/',
    },
    {
        id: 5,
        title: 'Build GitHub Repositories',
        description: 'Host your projects on GitHub, showcasing clean, well-documented code.',
        link: 'https://pages.github.com/',
    },
    {
        id: 6,
        title: 'Contribute to Open Source Projects',
        description: 'Gain real-world experience by contributing to open-source projects.',
        link: 'https://opensource.guide/how-to-contribute/',
    },
    {
        id: 7,
        title: 'Practice Interview Skills',
        description: 'Practice common technical interview questions and soft skills.',
        link: 'https://interviewing.io/',
    },
    {
        id: 8,
        title: 'Prepare a Custom Cover Letter',
        description: 'Write a tailored cover letter for each job application.',
        link: 'https://www.thebalancecareers.com/how-to-write-a-cover-letter-2060377',
    },
    {
        id: 9,
        title: 'Network in the Tech Community',
        description: 'Join tech forums, attend webinars, or participate in local or online coding events.',
        link: 'https://www.meetup.com/topics/tech/',
    },
    {
        id: 10,
        title: 'Regularly Apply for Jobs',
        description: 'Apply for job openings regularly, customizing your application for each position.',
        link: 'https://www.indeed.com/career-advice/finding-a-job/job-search-tips',
    },
    {
        id: 11,
        title: 'Take Relevant Online Courses',
        description: 'Complete online courses or certifications to enhance your knowledge and skills.',
        link: 'https://www.coursera.org/',
    },
    {
        id: 12,
        title: 'Join Communities and Forums',
        description: 'Engage with tech communities to learn from others and share knowledge.',
        link: 'https://stackoverflow.com/',
    },
    {
        id: 13,
        title: 'Attend Tech Meetups or Webinars',
        description: 'Attend local or online meetups, conferences, or webinars to learn from industry experts.',
        link: 'https://www.eventbrite.com/d/online/all-events/',
    },
    {
        id: 14,
        title: 'Gain Experience through Freelancing or Internships',
        description: 'Seek hands-on experience by taking freelance projects or applying for internships.',
        link: 'https://www.internships.com/',
    },
];


  const Checklist: React.FC = () => {
    const [completedItems, setCompletedItems] = useState(() => {
      const storedCompletedItems = localStorage.getItem('completedItems');
      if (storedCompletedItems) {
        return JSON.parse(storedCompletedItems);
      } else {
        return Array(checklistItems.length).fill(false);
      }
    });
    
    useEffect(() => {
      localStorage.setItem('completedItems', JSON.stringify(completedItems));
    }, [completedItems]);

    const toggleCompletion = (index: number) => {
      const updatedItems = [...completedItems];
      updatedItems[index] = !updatedItems[index];
      setCompletedItems(updatedItems);
    
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/${checklistItems[index].id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: updatedItems[index] }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    };
  return (
    <div className="container mx-auto px-1 py-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-primary">Job Readiness Checklist</h2>
      <ul className="space-y-6">
        {checklistItems.map((item, index) => (
          <li
            key={index}
            className={`bg-white shadow-md dark:bg-gray-700 dark:text-white rounded-lg p-1 lg:p-1 transition overflow-auto flex items-center justify-between ${
              completedItems[index] ? 'bg-gray-200' : 'hover:bg-gray-50'
            }`}
          >
          <div>
            <h3 className="text-md mt-2 font-bold text-primary dark:text-white">{item.title}</h3>
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
                <CheckCircle className="text-green-500 w-8 h-8 transition-transform transform scale-110" />
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
