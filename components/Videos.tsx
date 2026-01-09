
import React, { useState } from 'react';
import { Play, Search, Youtube, X } from 'lucide-react';
import { Video } from '../types.ts';
import { Card, CardBody } from './ui/Card.tsx';

interface VideosProps {
  videos: Video[];
}

export const Videos: React.FC<VideosProps> = ({ videos }) => {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVideos = videos.filter(v => 
    v.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Video Library</h1>
          <p className="text-gray-500 dark:text-gray-400">Watch high-quality educational videos and tutorials.</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Search lectures..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVideos.map(video => (
          <Card key={video.id} className="group overflow-hidden" onClick={() => setActiveVideo(video)}>
            <div className="relative aspect-video">
              <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-all duration-300">
                  <Play size={32} fill="white" />
                </div>
              </div>
            </div>
            <CardBody className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <Youtube size={16} className="text-red-600" />
                <span className="text-xs text-gray-400">{video.uploadDate}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight">
                {video.title}
              </h3>
            </CardBody>
          </Card>
        ))}
      </div>

      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white z-10"
            >
              <X size={24} />
            </button>
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
              title={activeVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};
