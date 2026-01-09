
export type UserRole = 'ADMIN' | 'STUDENT';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password?: string;
}

export interface Note {
  id: string;
  title: string;
  category: string;
  description: string;
  fileType: 'pdf' | 'text';
  url: string;
  uploadDate: string;
}

export interface Video {
  id: string;
  title: string;
  youtubeId: string;
  thumbnail: string;
  uploadDate: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface MockTest {
  id: string;
  title: string;
  category: string;
  duration: number; // in minutes
  questions: Question[];
}

export interface TestResult {
  id: string;
  testId: string;
  userId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  date: string;
}

export type Page = 'home' | 'notes' | 'videos' | 'tests' | 'results' | 'admin' | 'about' | 'contact' | 'login' | 'register';
