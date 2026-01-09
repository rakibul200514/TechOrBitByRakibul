
import React from 'react';
import { Book, Video, ClipboardCheck, ArrowRight, Star, Users, Trophy } from 'lucide-react';
import { Page } from '../types.ts';
import { Button } from './ui/Button.tsx';

interface HomeProps {
  setCurrentPage: (page: Page) => void;
}

export const Home: React.FC<HomeProps> = ({ setCurrentPage }) => {
  return (
    <div className="space-y-16 pb-20">
      <section className="relative overflow-hidden bg-blue-600 dark:bg-blue-900 rounded-3xl p-8 sm:p-16 mt-6 mx-4">
        <div className="max-w-3xl relative z-10">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-6 leading-tight">
            Learn Smart with <br />
            <span className="text-blue-200 underline decoration-blue-300">TechOrBit</span> by Rakibul
          </h1>
          <p className="text-blue-100 text-lg sm:text-xl mb-10 max-w-xl">
            Empower your learning journey with professional study materials, curated video lectures, and real-time mock tests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={() => setCurrentPage('notes')} variant="secondary" size="lg" className="gap-2">
              Explore Notes <ArrowRight size={20} />
            </Button>
            <Button onClick={() => setCurrentPage('tests')} variant="outline" size="lg" className="border-blue-200 text-white hover:bg-white hover:text-blue-600">
              Attempt Mock Test
            </Button>
          </div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block opacity-20">
          <Book size={400} className="text-white transform translate-x-20 rotate-12" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { icon: <Users className="text-blue-600" />, label: 'Active Students', value: '5,000+' },
          { icon: <Book className="text-green-600" />, label: 'Study Materials', value: '1,200+' },
          { icon: <Trophy className="text-yellow-500" />, label: 'Tests Completed', value: '15,000+' },
          { icon: <Star className="text-purple-600" />, label: 'Success Rate', value: '98%' },
        ].map((stat, i) => (
          <div key={i} className="text-center p-6 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm">
            <div className="flex justify-center mb-3">{stat.icon}</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
            <div className="text-gray-500 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">What we Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div onClick={() => setCurrentPage('notes')} className="group bg-white dark:bg-slate-800 p-8 rounded-2xl border border-gray-200 dark:border-slate-700 hover:border-blue-600 dark:hover:border-blue-500 transition-all cursor-pointer">
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/40 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
              <Book size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">PDF Notes</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Access high-quality, structured notes for all your subjects including CS, Programming, and DBMS.</p>
            <span className="text-blue-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">Browse Now <ArrowRight size={18} /></span>
          </div>

          <div onClick={() => setCurrentPage('videos')} className="group bg-white dark:bg-slate-800 p-8 rounded-2xl border border-gray-200 dark:border-slate-700 hover:border-blue-600 transition-all cursor-pointer">
            <div className="w-14 h-14 bg-red-100 dark:bg-red-900/40 rounded-xl flex items-center justify-center text-red-600 mb-6 group-hover:scale-110 transition-transform">
              <Video size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Video Lectures</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Visual learning at its best. Watch curated YouTube lectures directly within our professional interface.</p>
            <span className="text-blue-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">Watch Videos <ArrowRight size={18} /></span>
          </div>

          <div onClick={() => setCurrentPage('tests')} className="group bg-white dark:bg-slate-800 p-8 rounded-2xl border border-gray-200 dark:border-slate-700 hover:border-blue-600 transition-all cursor-pointer">
            <div className="w-14 h-14 bg-green-100 dark:bg-green-900/40 rounded-xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform">
              <ClipboardCheck size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Mock Tests</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Test your knowledge with our timed MCQ mock tests and get instant scores and performance analytics.</p>
            <span className="text-blue-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">Start Practice <ArrowRight size={18} /></span>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-slate-900 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Popular Materials</h2>
              <p className="text-gray-500">The most viewed and downloaded notes by students.</p>
            </div>
            <Button onClick={() => setCurrentPage('notes')} variant="outline">View All</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 dark:border-slate-700">
                <img src={`https://picsum.photos/seed/${item}/600/300`} className="w-full h-48 object-cover" alt="Study material" />
                <div className="p-6">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded uppercase tracking-wider">DBMS</span>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mt-3 mb-2">Relational Algebra Mastery Guide</h4>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">Complete guide for relational algebra operations with solved examples and exercises.</p>
                  <Button size="sm" fullWidth onClick={() => setCurrentPage('notes')}>View Details</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
