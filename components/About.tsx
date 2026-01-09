
import React from 'react';
import { CONTACT_INFO } from '../constants.tsx';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">About TechOrBit</h1>
        <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
      </div>

      <div className="prose prose-blue dark:prose-invert max-w-none">
        <p className="text-xl text-gray-600 dark:text-gray-300 text-center leading-relaxed">
          TechOrBit by Rakibul is a premier educational platform created to help students master technology concepts with ease. 
          We believe that learning should be accessible, structured, and interactive.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-8">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            To provide the highest quality study materials, video lectures, and practical mock tests for aspiring engineers 
             and tech enthusiasts, helping them bridge the gap between theory and practical excellence.
          </p>
        </div>
        <img src="https://picsum.photos/seed/tech/600/400" className="rounded-2xl shadow-lg" alt="Mission" />
      </div>

      <div className="bg-blue-600 dark:bg-blue-900 rounded-3xl p-10 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Meet the Founder</h2>
        <div className="w-32 h-32 rounded-full border-4 border-white/20 mx-auto mb-6 overflow-hidden">
          <img src="https://picsum.photos/seed/rakibul/200/200" alt="Rakibul" />
        </div>
        <h3 className="text-2xl font-bold">Rakibul</h3>
        <p className="text-blue-100 max-w-xl mx-auto mt-4">
          Tech Enthusiast, Educator, and Content Creator. Dedicated to making complex computer science topics understandable for everyone.
        </p>
        <div className="mt-8 flex justify-center gap-6">
          <a href={`https://instagram.com/${CONTACT_INFO.instagram}`} target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform">Instagram</a>
          <a href={`mailto:${CONTACT_INFO.email}`} className="hover:scale-110 transition-transform">Email</a>
        </div>
      </div>
    </div>
  );
};
