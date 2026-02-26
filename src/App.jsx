import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TitleInputCard from './components/TitleInputCard';
import ResultsDashboard from './components/ResultsDashboard';
import ChecklistPanel from './components/ChecklistPanel';
import DetailedModal from './components/DetailedModal';
import HistorySection from './components/HistorySection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import SignInPage from './pages/SignInPage.jsx';

import { AuthProvider } from './contexts/AuthContext';
import { getHistory, saveToHistory, clearHistory } from './utils/history';

function HomePage() {
  return <Hero />;
}

function AnalyzePage({ status, onAnalyze, onRowClick, analysis }) {
  return (
    <section className="pt-28 pb-20 bg-white min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Analyze your publication title
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Run an AI-powered PRGI compliance check on your proposed title and
            instantly see conflict risk, guidance and recommendations.
          </p>
        </div>

        <div id="analyze" className="w-full relative z-10">
          <TitleInputCard onAnalyze={onAnalyze} status={status} />
        </div>

        {status === 'complete' && (
          <section
            id="results"
            className="mt-12 py-10 bg-gray-50 border border-gray-100 rounded-2xl shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
          >
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
                </span>
                <p className="text-sm font-semibold text-success uppercase tracking-wider">
                  Analysis Complete
                </p>
              </div>

              <ResultsDashboard analysis={analysis} onRowClick={onRowClick} />
              <ChecklistPanel />
            </div>
          </section>
        )}
      </div>
    </section>
  );
}

function HistoryPage({ history, onClearHistory }) {
  return <HistorySection history={history} onClear={onClearHistory} />;
}

function AboutPage() {
  return (
    <>
      <AboutSection />
      <Footer />
    </>
  );
}

function AppContent() {
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'complete'
  const [selectedResult, setSelectedResult] = useState(null);
  const [historyItems, setHistoryItems] = useState([]);
  const [analysisResult, setAnalysisResult] = useState(null);

  useEffect(() => {
    // Load initial history
    setHistoryItems(getHistory());
  }, []);

  const handleAnalyze = async ({ title, language, periodicity }) => {
    setStatus('loading');

    try {
      const body = {
        id: Date.now(),
        title,
        language,
        periodicity,
        application_status: 'pending',
      };

      const response = await fetch('https://paridashub-uniquility-backend.hf.space/validate-async', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setAnalysisResult(data);

      const riskPercent =
        typeof data.risk_score === 'number'
          ? Math.round(data.risk_score * 100)
          : typeof data.similarity_percent === 'number'
            ? Math.round(data.similarity_percent)
            : 0;

      const updatedHistory = saveToHistory({
        title: data.query_title ?? title,
        score: riskPercent,
        decision: data.final_decision,
      });
      setHistoryItems(updatedHistory);
      setStatus('complete');
    } catch (err) {
      console.error('Error calling validate-async endpoint', err);
      setStatus('idle');
    }
  };

  const handleClearHistory = () => {
    const cleared = clearHistory();
    setHistoryItems(cleared);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background relative selection:bg-primary/20 selection:text-primary-900">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route
            path="/analyze"
            element={
              <AnalyzePage
                status={status}
                onAnalyze={handleAnalyze}
                onRowClick={setSelectedResult}
                analysis={analysisResult}
              />
            }
          />
          <Route
            path="/history"
            element={
              <HistoryPage
                history={historyItems}
                onClearHistory={handleClearHistory}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>

      {/* Comparison Modal Overlay */}
      {selectedResult && (
        <DetailedModal
          result={selectedResult}
          onClose={() => setSelectedResult(null)}
        />
      )}
    </div>
  );
}

// Wrap in provider at root level
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
