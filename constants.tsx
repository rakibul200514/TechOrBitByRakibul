
import React from 'react';
import { Book, Video as VideoIcon, ClipboardList, Home, Info, Phone, LayoutDashboard } from 'lucide-react';
import { Note, Video, MockTest, User } from './types.ts';

export const CATEGORIES = ['Computer Science', 'Programming', 'DBMS', 'Exams', 'Web Development'];

export const INITIAL_NOTES: Note[] = [
  {
    id: '1',
    title: 'Introduction to DBMS',
    category: 'DBMS',
    description: 'A comprehensive guide to Database Management Systems and SQL basics.',
    fileType: 'pdf',
    url: 'https://example.com/dbms.pdf',
    uploadDate: '2024-03-20'
  },
  {
    id: '2',
    title: 'React Hooks Mastery',
    category: 'Programming',
    description: 'Learn everything about useState, useEffect, and custom hooks.',
    fileType: 'pdf',
    url: 'https://example.com/react.pdf',
    uploadDate: '2024-03-18'
  },
  {
    id: '3',
    title: 'Computer Architecture Notes',
    category: 'Computer Science',
    description: 'Handwritten notes for COA including Pipeline and Memory Management.',
    fileType: 'pdf',
    url: 'https://example.com/coa.pdf',
    uploadDate: '2024-03-15'
  }
];

export const INITIAL_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'Understanding the DOM in JavaScript',
    youtubeId: 'Wz99Yp2_YhA',
    thumbnail: 'https://img.youtube.com/vi/Wz99Yp2_YhA/maxresdefault.jpg',
    uploadDate: '2024-03-10'
  },
  {
    id: '2',
    title: 'SQL Join Explained Simply',
    youtubeId: '9yeOJ0Z3pmw',
    thumbnail: 'https://img.youtube.com/vi/9yeOJ0Z3pmw/maxresdefault.jpg',
    uploadDate: '2024-03-12'
  }
];

export const INITIAL_TESTS: MockTest[] = [
  {
    id: '1',
    title: 'DBMS Basics Quiz',
    category: 'DBMS',
    duration: 10,
    questions: [
      {
        id: 'q1',
        text: 'What does SQL stand for?',
        options: ['Structured Question Language', 'Structured Query Language', 'Simple Query Language', 'Sequential Query Language'],
        correctAnswer: 1
      },
      {
        id: 'q2',
        text: 'Which key is used to uniquely identify a record?',
        options: ['Primary Key', 'Foreign Key', 'Composite Key', 'Candidate Key'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: '2',
    title: 'C Programming Quiz',
    category: 'Programming',
    duration: 15,
    questions: [
      {
        id: 'c1',
        text: 'Who is the father of C language?',
        options: ['Steve Jobs', 'James Gosling', 'Dennis Ritchie', 'Rasmus Lerdorf'],
        correctAnswer: 2
      }
    ]
  }
];

export const NAV_LINKS = [
  { name: 'Home', icon: <Home size={20} />, path: 'home' },
  { name: 'Notes', icon: <Book size={20} />, path: 'notes' },
  { name: 'Videos', icon: <VideoIcon size={20} />, path: 'videos' },
  { name: 'Mock Tests', icon: <ClipboardList size={20} />, path: 'tests' },
  { name: 'About', icon: <Info size={20} />, path: 'about' },
  { name: 'Contact', icon: <Phone size={20} />, path: 'contact' }
];

export const CONTACT_INFO = {
  whatsapp: '9395184827',
  email: 'techorbitbyrakibul@gmail.com',
  instagram: 'iffic_yunho'
};
