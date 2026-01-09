
import React from 'react';
import { Mail, Phone, Instagram, Send } from 'lucide-react';
import { CONTACT_INFO } from '../constants.tsx';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">TechOrBit by Rakibul</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm">
            An educational platform dedicated to simplifying technology and programming concepts for students.
          </p>
          <div className="flex gap-4">
            <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} target="_blank" rel="noreferrer" className="p-2 bg-green-500 rounded-full text-white hover:scale-110 transition-transform">
              <Phone size={20} />
            </a>
            <a href={`mailto:${CONTACT_INFO.email}`} className="p-2 bg-red-500 rounded-full text-white hover:scale-110 transition-transform">
              <Mail size={20} />
            </a>
            <a href={`https://instagram.com/${CONTACT_INFO.instagram}`} target="_blank" rel="noreferrer" className="p-2 bg-pink-500 rounded-full text-white hover:scale-110 transition-transform">
              <Instagram size={20} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li><a href="#" className="hover:text-blue-600 transition-colors">Computer Science Notes</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Python Programming</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">MCQ Mock Tests</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Video Lectures</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Support</h4>
          <p className="text-gray-600 dark:text-gray-400 mb-4 flex items-center gap-2">
            <Mail size={16} /> {CONTACT_INFO.email}
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4 flex items-center gap-2">
            <Phone size={16} /> +91 {CONTACT_INFO.whatsapp}
          </p>
          <div className="flex bg-gray-100 dark:bg-slate-800 rounded-lg p-2">
            <input 
              type="text" 
              placeholder="Your email..." 
              className="bg-transparent border-none focus:ring-0 text-sm px-2 w-full dark:text-white"
            />
            <button className="bg-blue-600 p-2 rounded-md text-white">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-100 dark:border-slate-800 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} TechOrBit by Rakibul. All rights reserved. Made with ❤️ for Students.
      </div>
    </footer>
  );
};
