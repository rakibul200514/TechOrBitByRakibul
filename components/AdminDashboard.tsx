
import React, { useState } from 'react';
import { Plus, Trash2, Edit3, FileText, Video as VideoIcon, ClipboardList, Settings, Users, Youtube, CheckCircle } from 'lucide-react';
import { Note, Video as VideoType, MockTest, User, Question } from '../types.ts';
import { CATEGORIES } from '../constants.tsx';
import { Card, CardHeader, CardBody } from './ui/Card.tsx';
import { Button } from './ui/Button.tsx';

interface AdminDashboardProps {
  notes: Note[];
  videos: VideoType[];
  tests: MockTest[];
  users: User[];
  onAddNote: (note: Note) => void;
  onDeleteNote: (id: string) => void;
  onAddVideo: (video: VideoType) => void;
  onDeleteVideo: (id: string) => void;
  onAddTest: (test: MockTest) => void;
  onDeleteTest: (id: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  notes, videos, tests, users, 
  onAddNote, onDeleteNote, 
  onAddVideo, onDeleteVideo,
  onAddTest, onDeleteTest
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'notes' | 'videos' | 'tests'>('overview');
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [showTestForm, setShowTestForm] = useState(false);
  
  // Forms State
  const [noteForm, setNoteForm] = useState({ title: '', category: CATEGORIES[0], description: '', url: '' });
  const [videoForm, setVideoForm] = useState({ title: '', youtubeId: '' });
  const [testForm, setTestForm] = useState({ title: '', category: CATEGORIES[0], duration: 10 });

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    onAddNote({
      id: Math.random().toString(36).substr(2, 9),
      ...noteForm,
      fileType: 'pdf',
      uploadDate: new Date().toISOString().split('T')[0]
    });
    setShowNoteForm(false);
    setNoteForm({ title: '', category: CATEGORIES[0], description: '', url: '' });
  };

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    onAddVideo({
      id: Math.random().toString(36).substr(2, 9),
      title: videoForm.title,
      youtubeId: videoForm.youtubeId,
      thumbnail: `https://img.youtube.com/vi/${videoForm.youtubeId}/maxresdefault.jpg`,
      uploadDate: new Date().toISOString().split('T')[0]
    });
    setShowVideoForm(false);
    setVideoForm({ title: '', youtubeId: '' });
  };

  const handleAddTest = (e: React.FormEvent) => {
    e.preventDefault();
    // Default mock question for simplicity in this template
    const defaultQuestion: Question = {
      id: 'q1',
      text: 'Sample Question: What is the primary focus of this platform?',
      options: ['Gaming', 'Education', 'Social Media', 'E-commerce'],
      correctAnswer: 1
    };
    onAddTest({
      id: Math.random().toString(36).substr(2, 9),
      ...testForm,
      questions: [defaultQuestion]
    });
    setShowTestForm(false);
    setTestForm({ title: '', category: CATEGORIES[0], duration: 10 });
  };

  const stats = [
    { label: 'Notes', value: notes.length, icon: <FileText className="text-blue-600" />, color: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Videos', value: videos.length, icon: <VideoIcon className="text-red-600" />, color: 'bg-red-50 dark:bg-red-900/20' },
    { label: 'Mock Tests', value: tests.length, icon: <ClipboardList className="text-green-600" />, color: 'bg-green-50 dark:bg-green-900/20' },
    { label: 'Users', value: users.length, icon: <Users className="text-purple-600" />, color: 'bg-purple-50 dark:bg-purple-900/20' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <Button variant="secondary" className="gap-2"><Settings size={18} /> Settings</Button>
      </div>

      <div className="flex flex-wrap gap-4 border-b border-gray-200 dark:border-slate-800 mb-8 overflow-x-auto whitespace-nowrap">
        {['overview', 'notes', 'videos', 'tests'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`pb-4 px-2 text-sm font-semibold transition-all relative capitalize ${activeTab === tab ? 'text-blue-600' : 'text-gray-500'}`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <Card key={i}>
                <CardBody className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                  <div className={`p-4 rounded-xl ${stat.color}`}>{stat.icon}</div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-gray-500">{stat.label}</div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader className="flex justify-between items-center">
                <h3 className="font-bold text-gray-900 dark:text-white">Recent Activities</h3>
              </CardHeader>
              <CardBody className="p-0">
                <div className="divide-y divide-gray-100 dark:divide-slate-800">
                  {notes.slice(0, 5).map(note => (
                    <div key={note.id} className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="text-blue-600" size={18} />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white text-sm">{note.title}</div>
                          <div className="text-xs text-gray-500">{note.category}</div>
                        </div>
                      </div>
                      <div className="text-[10px] text-gray-400 font-bold">{note.uploadDate}</div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardHeader className="flex justify-between items-center">
                <h3 className="font-bold text-gray-900 dark:text-white">Active Users</h3>
              </CardHeader>
              <CardBody className="p-0">
                <div className="divide-y divide-gray-100 dark:divide-slate-800">
                  {users.slice(0, 5).map(user => (
                    <div key={user.id} className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">{user.name[0]}</div>
                        <div className="dark:text-white">{user.name}</div>
                      </div>
                      <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">Online</span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'notes' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold dark:text-white">PDF Notes</h3>
            <Button className="gap-2" onClick={() => setShowNoteForm(true)}><Plus size={20} /> Add Note</Button>
          </div>
          {showNoteForm && (
            <Card className="border-blue-600 border-2">
              <CardBody>
                <form onSubmit={handleAddNote} className="space-y-4">
                  <input required placeholder="Title" value={noteForm.title} onChange={e => setNoteForm({...noteForm, title: e.target.value})} className="w-full p-2.5 rounded-lg border dark:bg-slate-700" />
                  <select value={noteForm.category} onChange={e => setNoteForm({...noteForm, category: e.target.value})} className="w-full p-2.5 rounded-lg border dark:bg-slate-700">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <input required placeholder="PDF Link (URL)" value={noteForm.url} onChange={e => setNoteForm({...noteForm, url: e.target.value})} className="w-full p-2.5 rounded-lg border dark:bg-slate-700" />
                  <textarea required placeholder="Brief description" value={noteForm.description} onChange={e => setNoteForm({...noteForm, description: e.target.value})} className="w-full p-2.5 rounded-lg border dark:bg-slate-700" />
                  <div className="flex gap-2"><Button type="submit">Save</Button><Button type="button" variant="secondary" onClick={() => setShowNoteForm(false)}>Cancel</Button></div>
                </form>
              </CardBody>
            </Card>
          )}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-800 overflow-hidden">
            {notes.map(note => (
              <div key={note.id} className="p-4 border-b dark:border-slate-700 flex justify-between items-center">
                <span className="dark:text-white font-medium">{note.title}</span>
                <button onClick={() => onDeleteNote(note.id)} className="text-red-500 p-2 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'videos' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold dark:text-white">Video Lectures</h3>
            <Button className="gap-2" onClick={() => setShowVideoForm(true)}><Plus size={20} /> Add Video</Button>
          </div>
          {showVideoForm && (
            <Card className="border-blue-600 border-2">
              <CardBody>
                <form onSubmit={handleAddVideo} className="space-y-4">
                  <input required placeholder="Video Title" value={videoForm.title} onChange={e => setVideoForm({...videoForm, title: e.target.value})} className="w-full p-2.5 rounded-lg border dark:bg-slate-700" />
                  <div className="relative">
                    <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" size={18} />
                    <input required placeholder="YouTube Video ID (e.g. Wz99Yp2_YhA)" value={videoForm.youtubeId} onChange={e => setVideoForm({...videoForm, youtubeId: e.target.value})} className="w-full pl-10 pr-4 py-2.5 rounded-lg border dark:bg-slate-700" />
                  </div>
                  <div className="flex gap-2"><Button type="submit">Save Video</Button><Button type="button" variant="secondary" onClick={() => setShowVideoForm(false)}>Cancel</Button></div>
                </form>
              </CardBody>
            </Card>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {videos.map(video => (
              <div key={video.id} className="p-4 bg-white dark:bg-slate-800 rounded-xl border dark:border-slate-700 flex gap-4 items-center">
                <img src={video.thumbnail} className="w-20 h-12 object-cover rounded" />
                <div className="flex-grow dark:text-white font-medium truncate">{video.title}</div>
                <button onClick={() => onDeleteVideo(video.id)} className="text-red-500 p-2 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'tests' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold dark:text-white">MCQ Mock Tests</h3>
            <Button className="gap-2" onClick={() => setShowTestForm(true)}><Plus size={20} /> Create Test</Button>
          </div>
          {showTestForm && (
            <Card className="border-blue-600 border-2">
              <CardBody>
                <form onSubmit={handleAddTest} className="space-y-4">
                  <input required placeholder="Test Title" value={testForm.title} onChange={e => setTestForm({...testForm, title: e.target.value})} className="w-full p-2.5 rounded-lg border dark:bg-slate-700" />
                  <div className="grid grid-cols-2 gap-4">
                    <select value={testForm.category} onChange={e => setTestForm({...testForm, category: e.target.value})} className="w-full p-2.5 rounded-lg border dark:bg-slate-700">
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <input type="number" placeholder="Duration (min)" value={testForm.duration} onChange={e => setTestForm({...testForm, duration: parseInt(e.target.value)})} className="w-full p-2.5 rounded-lg border dark:bg-slate-700" />
                  </div>
                  <p className="text-xs text-blue-600 font-bold">* New tests will be created with one default sample question.</p>
                  <div className="flex gap-2"><Button type="submit">Publish Test</Button><Button type="button" variant="secondary" onClick={() => setShowTestForm(false)}>Cancel</Button></div>
                </form>
              </CardBody>
            </Card>
          )}
          <div className="space-y-3">
            {tests.map(test => (
              <div key={test.id} className="p-4 bg-white dark:bg-slate-800 rounded-xl border dark:border-slate-700 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-500" size={18} />
                  <span className="dark:text-white font-medium">{test.title}</span>
                  <span className="text-[10px] font-bold bg-gray-100 dark:bg-slate-700 px-2 py-0.5 rounded text-gray-400">{test.category}</span>
                </div>
                <button onClick={() => onDeleteTest(test.id)} className="text-red-500 p-2 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
