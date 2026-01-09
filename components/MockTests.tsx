
import React, { useState } from 'react';
import { ClipboardList, Timer, ArrowRight, CheckCircle, XCircle, ChevronLeft } from 'lucide-react';
import { MockTest, TestResult } from '../types.ts';
import { Card, CardBody, CardFooter } from './ui/Card.tsx';
import { Button } from './ui/Button.tsx';

interface MockTestsProps {
  tests: MockTest[];
  onSubmitResult: (result: TestResult) => void;
  userId: string;
}

export const MockTests: React.FC<MockTestsProps> = ({ tests, onSubmitResult, userId }) => {
  const [activeTest, setActiveTest] = useState<MockTest | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const handleStartTest = (test: MockTest) => {
    setActiveTest(test);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsFinished(false);
    setTimeLeft(test.duration * 60);
  };

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleFinish = () => {
    if (!activeTest) return;

    let correctCount = 0;
    activeTest.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const result: TestResult = {
      id: Math.random().toString(36).substr(2, 9),
      testId: activeTest.id,
      userId,
      score: (correctCount / activeTest.questions.length) * 100,
      totalQuestions: activeTest.questions.length,
      correctAnswers: correctCount,
      date: new Date().toISOString()
    };

    onSubmitResult(result);
    setIsFinished(true);
  };

  if (isFinished && activeTest) {
    const correctCount = activeTest.questions.filter(q => answers[q.id] === q.correctAnswer).length;
    const score = Math.round((correctCount / activeTest.questions.length) * 100);

    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Card className="p-8 text-center animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-6">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Test Completed!</h2>
          <p className="text-gray-500 mb-8">Great job on finishing the <strong>{activeTest.title}</strong></p>
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 dark:bg-slate-700/50 p-4 rounded-xl">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{score}%</div>
              <div className="text-xs text-gray-500 uppercase font-bold mt-1">Score</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
              <div className="text-2xl font-bold text-green-600">{correctCount}</div>
              <div className="text-xs text-green-600 uppercase font-bold mt-1">Correct</div>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl">
              <div className="text-2xl font-bold text-red-600">{activeTest.questions.length - correctCount}</div>
              <div className="text-xs text-red-600 uppercase font-bold mt-1">Wrong</div>
            </div>
          </div>

          <div className="space-y-4 text-left border-t border-gray-100 dark:border-slate-700 pt-8 mt-4">
            <h3 className="font-bold text-lg dark:text-white mb-4">Detailed Review:</h3>
            {activeTest.questions.map((q, idx) => (
              <div key={q.id} className="p-4 rounded-lg bg-gray-50 dark:bg-slate-700/30 border border-gray-100 dark:border-slate-700">
                <p className="font-medium text-gray-900 dark:text-gray-100 mb-2">{idx + 1}. {q.text}</p>
                <div className="flex items-center gap-2 text-sm">
                  {answers[q.id] === q.correctAnswer ? (
                    <span className="text-green-600 flex items-center gap-1 font-bold">
                      <CheckCircle size={14} /> Correct: {q.options[q.correctAnswer]}
                    </span>
                  ) : (
                    <>
                      <span className="text-red-600 flex items-center gap-1 font-bold">
                        <XCircle size={14} /> Your answer: {q.options[answers[q.id]] || 'Unanswered'}
                      </span>
                      <span className="text-gray-400 mx-2">|</span>
                      <span className="text-green-600 font-bold">Correct: {q.options[q.correctAnswer]}</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Button className="mt-8" fullWidth onClick={() => setActiveTest(null)}>Back to Tests</Button>
        </Card>
      </div>
    );
  }

  if (activeTest) {
    const question = activeTest.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / activeTest.questions.length) * 100;

    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{activeTest.title}</h2>
            <div className="flex items-center gap-2 text-blue-600 font-bold">
              <Timer size={20} />
              <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
            </div>
          </div>
          <div className="w-full h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 transition-all" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="mt-2 text-sm text-gray-500">Question {currentQuestionIndex + 1} of {activeTest.questions.length}</p>
        </div>

        <Card className="p-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8">{question.text}</h3>
          <div className="space-y-4">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(question.id, idx)}
                className={`w-full text-left p-5 rounded-xl border-2 transition-all ${
                  answers[question.id] === idx
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600 font-bold'
                    : 'border-gray-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-slate-600 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs ${
                     answers[question.id] === idx ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 text-gray-400'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  {option}
                </div>
              </button>
            ))}
          </div>
        </Card>

        <div className="flex justify-between mt-8">
          <Button
            variant="secondary"
            disabled={currentQuestionIndex === 0}
            onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
            className="gap-2"
          >
            <ChevronLeft size={20} /> Previous
          </Button>
          
          {currentQuestionIndex === activeTest.questions.length - 1 ? (
            <Button variant="primary" onClick={handleFinish} className="gap-2">
              Finish Test <CheckCircle size={20} />
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
              className="gap-2"
            >
              Next Question <ArrowRight size={20} />
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mock Practice Tests</h1>
        <p className="text-gray-500 dark:text-gray-400">Evaluate your learning with timed MCQ tests and performance feedback.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tests.map(test => (
          <Card key={test.id} className="group">
            <CardBody className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg text-green-600">
                  <ClipboardList size={24} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded text-gray-600 dark:text-gray-300">
                  {test.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{test.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-1"><ClipboardList size={16} /> {test.questions.length} Questions</div>
                <div className="flex items-center gap-1"><Timer size={16} /> {test.duration} Minutes</div>
              </div>
              <Button fullWidth onClick={() => handleStartTest(test)}>Start Test</Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};
