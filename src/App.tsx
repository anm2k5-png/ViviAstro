import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Moon, Star, BookOpen, Home, Settings, X, Globe } from 'lucide-react';
import ZodiacForm from './components/ZodiacForm';
import ChartAnalysis from './components/ChartAnalysis';
import AstrologyLibrary from './components/AstrologyLibrary';
import { analyzeBirthChart, BirthData, AstrologyAnalysis } from './lib/gemini';
import { translations, Language } from './lib/translations';

type View = 'home' | 'library' | 'analysis';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AstrologyAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('English');

  const t = translations[language];

  const handleAnalyze = async (data: BirthData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await analyzeBirthChart({ ...data, language });
      setAnalysis(result);
      setView('analysis');
    } catch (err) {
      console.error(err);
      setError(t.errorObscured);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysis(null);
    setError(null);
    setView('home');
  };

  return (
    <div className="min-h-screen relative font-sans">
      {/* Ambient Background */}
      <div className="atmosphere" />
      <div className="stars" />

      {/* Header */}
      <header className="pt-12 pb-8 px-6 text-center relative">
        <div className="absolute top-8 right-8 flex gap-4">
          <button 
            onClick={() => setView('home')}
            className={`p-3 rounded-full transition-all ${view === 'home' ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40' : 'bg-white/5 text-slate-400 hover:text-white'}`}
            title={t.home}
          >
            <Home size={20} />
          </button>
          <button 
            onClick={() => setView('library')}
            className={`p-3 rounded-full transition-all ${view === 'library' ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40' : 'bg-white/5 text-slate-400 hover:text-white'}`}
            title={t.library}
          >
            <BookOpen size={20} />
          </button>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="p-3 rounded-full bg-white/5 text-slate-400 hover:text-white transition-all"
            title={t.settings}
          >
            <Settings size={20} />
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
        >
          <Sparkles size={16} className="text-purple-400" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold">{t.celestialInsights}</span>
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-4 tracking-tight text-glow">
          Vivi<span className="italic text-purple-400">Astro</span>
        </h1>
        <p className="text-slate-400 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
          {t.tagline}
        </p>
      </header>

      <main className="px-6 pb-20">
        <AnimatePresence mode="wait">
          {/* Settings Modal */}
          {isSettingsOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsSettingsOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-md glass-card p-8 space-y-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <Settings className="text-purple-400" size={20} />
                    <h2 className="text-xl font-serif text-white">{t.cosmicSettings}</h2>
                  </div>
                  <button 
                    onClick={() => setIsSettingsOpen(false)}
                    className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-slate-500 font-medium flex items-center gap-2">
                      <Globe size={14} /> {t.analysisLanguage}
                    </label>
                    <div className="relative">
                      <select
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none cursor-pointer"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as Language)}
                      >
                        <option value="English" className="bg-slate-900">English</option>
                        <option value="Vietnamese" className="bg-slate-900">Vietnamese</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                        <Globe size={14} />
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-500 italic">
                      {t.languageDesc}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-purple-900/20"
                >
                  {t.savePreferences}
                </button>
              </motion.div>
            </motion.div>
          )}

          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <ZodiacForm onSubmit={handleAnalyze} isLoading={isLoading} language={language} />
              
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-center mt-6 text-sm font-medium"
                >
                  {error}
                </motion.p>
              )}

              {/* Decorative Elements */}
              <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <FeatureItem 
                  icon={<Moon size={24} className="text-purple-400" />}
                  title={t.lunarWisdom}
                  desc={t.lunarWisdomDesc}
                />
                <FeatureItem 
                  icon={<Star size={24} className="text-purple-400" />}
                  title={t.planetaryAlignment}
                  desc={t.planetaryAlignmentDesc}
                />
                <FeatureItem 
                  icon={<Sparkles size={24} className="text-purple-400" />}
                  title={t.personalizedPath}
                  desc={t.personalizedPathDesc}
                />
              </div>
            </motion.div>
          )}

          {view === 'library' && (
            <motion.div
              key="library"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <AstrologyLibrary language={language} />
            </motion.div>
          )}

          {view === 'analysis' && analysis && (
            <motion.div
              key="analysis"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ChartAnalysis analysis={analysis} onReset={handleReset} language={language} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-slate-600 text-[10px] uppercase tracking-widest">
          &copy; 2026 ViviAstro &bull; {t.poweredBy}
        </p>
      </footer>
    </div>
  );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="space-y-3 p-6 rounded-3xl hover:bg-white/5 transition-colors group">
      <div className="inline-flex p-4 rounded-2xl bg-white/5 group-hover:bg-purple-500/10 transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-serif text-white">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
