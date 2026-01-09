
import React, { useState } from 'react';
import { Search, Download, FileText, ChevronRight } from 'lucide-react';
import { Note } from '../types.ts';
import { CATEGORIES } from '../constants.tsx';
import { Card, CardBody } from './ui/Card.tsx';
import { Button } from './ui/Button.tsx';

interface NotesProps {
  notes: Note[];
}

export const Notes: React.FC<NotesProps> = ({ notes }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = notes.filter(note => {
    const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory;
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          note.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Study Materials</h1>
          <p className="text-gray-500 dark:text-gray-400">Download curated notes and PDFs across various tech categories.</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none dark:text-white"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === 'All'
              ? 'bg-blue-600 text-white'
              : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-slate-700 hover:border-blue-600'
          }`}
        >
          All Categories
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-slate-700 hover:border-blue-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.length > 0 ? (
          filteredNotes.map(note => (
            <Card key={note.id} className="group">
              <CardBody className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600">
                    <FileText size={24} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded text-gray-600 dark:text-gray-300">
                    {note.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                  {note.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-3">
                  {note.description}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-slate-700">
                  <span className="text-xs text-gray-400">Added: {note.uploadDate}</span>
                  <a 
                    href={note.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-blue-600 font-semibold text-sm hover:underline"
                  >
                    <Download size={16} /> Download PDF
                  </a>
                </div>
              </CardBody>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-slate-700">
            <p className="text-gray-500">No notes found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};
