
import React, { useState, useEffect } from 'react';
import { Home as HomeIcon, Book, ClipboardList, Phone } from 'lucide-react';
import { Page, User, Note, Video, MockTest, TestResult } from './types.ts';
import { INITIAL_NOTES, INITIAL_VIDEOS, INITIAL_TESTS } from './constants.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { Home } from './components/Home.tsx';
import { Notes } from './components/Notes.tsx';
import { Videos } from './components/Videos.tsx';
import { MockTests } from './components/MockTests.tsx';
import { AdminDashboard } from './components/AdminDashboard.tsx';
import { About } from './components/About.tsx';
import { Contact } from './components/Contact.tsx';
import { Auth } from './components/Auth.tsx';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isDark, setIsDark] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  
  const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);
  const [videos, setVideos] = useState<Video[]>(INITIAL_VIDEOS);
  const [tests, setTests] = useState<MockTest[]>(INITIAL_TESTS);
  const [results, setResults] = useState<TestResult[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([
    { id: 'admin1', name: 'Rakibul', email: 'techorbitbyrakibul@gmail.com', role: 'ADMIN' },
    { id: 'user1', name: 'Student One', email: 'student@example.com', role: 'STUDENT' }
  ]);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);
  const login = (userData: User) => setUser(userData);
  const logout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const addNote = (note: Note) => setNotes([note, ...notes]);
  const deleteNote = (id: string) => setNotes(notes.filter(n => n.id !== id));
  
  const addVideo = (video: Video) => setVideos([video, ...videos]);
  const deleteVideo = (id: string) => setVideos(videos.filter(v => v.id !== id));

  const addTest = (test: MockTest) => setTests([test, ...tests]);
  const deleteTest = (id: string) => setTests(tests.filter(t => t.id !== id));

  const handleTestSubmit = (result: TestResult) => {
    setResults([result, ...results]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home setCurrentPage={setCurrentPage} />;
      case 'notes': return <Notes notes={notes} />;
      case 'videos': return <Videos videos={videos} />;
      case 'tests': return <MockTests tests={tests} userId={user?.id || 'guest'} onSubmitResult={handleTestSubmit} />;
      case 'admin': 
        return user?.role === 'ADMIN' ? (
          <AdminDashboard 
            notes={notes} 
            videos={videos} 
            tests={tests} 
            users={allUsers}
            onAddNote={addNote}
            onDeleteNote={deleteNote}
            onAddVideo={addVideo}
            onDeleteVideo={deleteVideo}
            onAddTest={addTest}
            onDeleteTest={deleteTest}
          />
        ) : <Auth type="login" onAuth={login} setCurrentPage={setCurrentPage} />;
      case 'about': return <About />;
      case 'contact': return <Contact />;
      case 'login': return <Auth type="login" onAuth={login} setCurrentPage={setCurrentPage} />;
      case 'register': return <Auth type="register" onAuth={login} setCurrentPage={setCurrentPage} />;
      default: return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'dark bg-slate-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        isDark={isDark} 
        toggleTheme={toggleTheme} 
        user={user}
        logout={logout}
      />
      
      <main className="flex-grow">
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          {renderPage()}
        </div>
      </main>

      <Footer />

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 px-6 py-3 flex justify-between items-center z-40">
        <button onClick={() => setCurrentPage('home')} className={`p-2 rounded-lg ${currentPage === 'home' ? 'text-blue-600' : 'text-gray-400'}`}>
          <HomeIcon size={24} />
        </button>
        <button onClick={() => setCurrentPage('notes')} className={`p-2 rounded-lg ${currentPage === 'notes' ? 'text-blue-600' : 'text-gray-400'}`}>
          <Book size={24} />
        </button>
        <button onClick={() => setCurrentPage('tests')} className={`p-2 rounded-lg ${currentPage === 'tests' ? 'text-blue-600' : 'text-gray-400'}`}>
          <ClipboardList size={24} />
        </button>
        <button onClick={() => setCurrentPage('contact')} className={`p-2 rounded-lg ${currentPage === 'contact' ? 'text-blue-600' : 'text-gray-400'}`}>
          <Phone size={24} />
        </button>
      </div>
    </div>
  );
};

export default App;
