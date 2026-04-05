import { motion } from 'motion/react';
import { Star, Moon, Sun, ArrowLeft, Share2, Download, Flame, Droplets, Mountain, Wind, Heart, Zap, MessageCircle, Compass, Layers, ZapOff, Sparkles, Home } from 'lucide-react';
import { AstrologyAnalysis, HouseDetail } from '../lib/gemini';
import { translations, Language } from '../lib/translations';
import ReactMarkdown from 'react-markdown';

interface ChartAnalysisProps {
  analysis: AstrologyAnalysis;
  onReset: () => void;
  language: Language;
}

export default function ChartAnalysis({ analysis, onReset, language }: ChartAnalysisProps) {
  const t = translations[language];

  const getElementIcon = (element: string) => {
    switch (element.toLowerCase()) {
      case 'fire': return <Flame className="text-orange-500" />;
      case 'water': return <Droplets className="text-blue-400" />;
      case 'earth': return <Mountain className="text-emerald-500" />;
      case 'air': return <Wind className="text-slate-300" />;
      default: return <Star className="text-purple-400" />;
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode.toLowerCase()) {
      case 'cardinal': return <Zap className="text-yellow-400" />;
      case 'fixed': return <Layers className="text-purple-400" />;
      case 'mutable': return <Compass className="text-cyan-400" />;
      default: return <Star className="text-purple-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-4xl mx-auto space-y-8 pb-20"
    >
      <div className="flex justify-between items-center">
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft size={16} /> {t.newAnalysis}
        </button>
        <div className="flex gap-4">
          <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 transition-colors">
            <Share2 size={18} />
          </button>
          <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 transition-colors">
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <SignCard icon={<Sun className="text-yellow-400" />} label={t.sunSign} value={analysis.sunSign} />
        <SignCard icon={<Moon className="text-blue-300" />} label={t.moonSign} value={analysis.moonSign} />
        <SignCard icon={<Star className="text-purple-400" />} label={t.risingSign} value={analysis.risingSign} />
        <SignCard icon={getElementIcon(analysis.element)} label={t.element} value={analysis.element} />
        <SignCard icon={getModeIcon(analysis.mode)} label={t.mode} value={analysis.mode} />
        <SignCard icon={<Compass className="text-pink-400" />} label={t.chartRuler} value={analysis.chartRuler} />
      </div>

      {/* Natal Chart Image */}
      {analysis.chartImageUrl && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card overflow-hidden group relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-6 left-8 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
            <h3 className="text-2xl font-serif text-white mb-1">{t.cosmicNatalChart}</h3>
            <p className="text-slate-300 text-sm">{t.chartDesc}</p>
          </div>
          <img 
            src={analysis.chartImageUrl} 
            alt="Astrological Natal Chart" 
            className="w-full h-auto aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      )}

      {/* Summary */}
      <div className="glass-card p-8">
        <h3 className="text-xl font-serif text-purple-200 mb-4">{t.celestialSummary}</h3>
        <p className="text-slate-300 leading-relaxed italic">"{analysis.summary}"</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Planetary Positions */}
          <div className="glass-card p-8">
            <h3 className="text-xl font-serif text-purple-200 mb-6">{t.planetaryAlignments}</h3>
            <div className="grid grid-cols-1 gap-6">
              <PlanetDetail 
                icon={<Sun size={20} className="text-yellow-400" />} 
                label={t.sun} 
                sign={analysis.planets.sun.sign}
                degree={analysis.planets.sun.degree}
                interpretation={analysis.planets.sun.interpretation}
                theme={t.sunTheme} 
              />
              <PlanetDetail 
                icon={<Moon size={20} className="text-blue-300" />} 
                label={t.moon} 
                sign={analysis.planets.moon.sign}
                degree={analysis.planets.moon.degree}
                interpretation={analysis.planets.moon.interpretation}
                theme={t.moonTheme} 
              />
              <PlanetDetail 
                icon={<MessageCircle size={20} className="text-cyan-400" />} 
                label={t.mercury} 
                sign={analysis.planets.mercury.sign}
                degree={analysis.planets.mercury.degree}
                interpretation={analysis.planets.mercury.interpretation}
                theme={t.mercuryTheme} 
              />
              <PlanetDetail 
                icon={<Heart size={20} className="text-pink-400" />} 
                label={t.venus} 
                sign={analysis.planets.venus.sign}
                degree={analysis.planets.venus.degree}
                interpretation={analysis.planets.venus.interpretation}
                theme={t.venusTheme} 
              />
              <PlanetDetail 
                icon={<Zap size={20} className="text-red-400" />} 
                label={t.mars} 
                sign={analysis.planets.mars.sign}
                degree={analysis.planets.mars.degree}
                interpretation={analysis.planets.mars.interpretation}
                theme={t.marsTheme} 
              />
              <PlanetDetail 
                icon={<Sparkles size={20} className="text-yellow-500" />} 
                label={t.jupiter} 
                sign={analysis.planets.jupiter.sign}
                degree={analysis.planets.jupiter.degree}
                interpretation={analysis.planets.jupiter.interpretation}
                theme={t.jupiterTheme} 
              />
              <PlanetDetail 
                icon={<Layers size={20} className="text-orange-400" />} 
                label={t.saturn} 
                sign={analysis.planets.saturn.sign}
                degree={analysis.planets.saturn.degree}
                interpretation={analysis.planets.saturn.interpretation}
                theme={t.saturnTheme} 
              />
              <PlanetDetail 
                icon={<ZapOff size={20} className="text-cyan-300" />} 
                label={t.uranus} 
                sign={analysis.planets.uranus.sign}
                degree={analysis.planets.uranus.degree}
                interpretation={analysis.planets.uranus.interpretation}
                theme={t.uranusTheme} 
              />
              <PlanetDetail 
                icon={<Droplets size={20} className="text-blue-400" />} 
                label={t.neptune} 
                sign={analysis.planets.neptune.sign}
                degree={analysis.planets.neptune.degree}
                interpretation={analysis.planets.neptune.interpretation}
                theme={t.neptuneTheme} 
              />
              <PlanetDetail 
                icon={<Flame size={20} className="text-red-500" />} 
                label={t.pluto} 
                sign={analysis.planets.pluto.sign}
                degree={analysis.planets.pluto.degree}
                interpretation={analysis.planets.pluto.interpretation}
                theme={t.plutoTheme} 
              />
            </div>
          </div>

          {/* House Placements */}
          <div className="glass-card p-8">
            <h3 className="text-xl font-serif text-purple-200 mb-6">{t.housePlacements}</h3>
            <div className="grid grid-cols-1 gap-4">
              {analysis.houses.map((house) => (
                <HouseItem key={house.number} house={house} />
              ))}
            </div>
          </div>

          {/* Aspect Patterns */}
          {analysis.aspectPatterns && analysis.aspectPatterns.length > 0 && (
            <div className="glass-card p-8">
              <h3 className="text-xl font-serif text-purple-200 mb-6">{t.cosmicPatterns}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {analysis.aspectPatterns.map((pattern, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/10 flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                      <Layers size={18} className="text-purple-400" />
                    </div>
                    <span className="text-slate-200 font-medium">{pattern}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="glass-card p-8">
            <h3 className="text-xl font-serif text-purple-200 mb-6">{t.inDepthAnalysis}</h3>
            <div className="markdown-body">
              <ReactMarkdown>{analysis.detailedAnalysis}</ReactMarkdown>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Key Traits */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-serif text-purple-200 mb-4">{t.keyTraits}</h3>
            <div className="flex flex-wrap gap-2">
              {analysis.keyTraits.map((trait, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs text-purple-300"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>

          {/* Lucky Elements */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-lg font-serif text-purple-200">{t.luckyElements}</h3>
            <div className="space-y-3">
              <LuckyItem label={t.color} value={analysis.luckyElements.color} />
              <LuckyItem label={t.number} value={analysis.luckyElements.number.toString()} />
              <LuckyItem label={t.stone} value={analysis.luckyElements.stone} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SignCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="glass-card p-6 flex flex-col items-center text-center space-y-2 border-t-2 border-t-purple-500/30">
      <div className="p-3 bg-white/5 rounded-full mb-2">{icon}</div>
      <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">{label}</span>
      <span className="text-lg font-serif text-white">{value}</span>
    </div>
  );
}

function PlanetDetail({ icon, label, sign, degree, interpretation, theme }: { icon: React.ReactNode; label: string; sign: string; degree: string; interpretation: string; theme: string }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className="glass-card p-6 space-y-4 transition-colors duration-300 hover:border-purple-400/40 cursor-default group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/5 rounded-lg group-hover:bg-purple-500/10 transition-colors">{icon}</div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{label}</p>
            <p className="text-lg font-serif text-white">{sign} <span className="text-sm text-slate-400 ml-1">{degree}</span></p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-widest text-purple-400 font-bold">{theme}</p>
        </div>
      </div>
      <p className="text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3 italic">
        {interpretation}
      </p>
    </motion.div>
  );
}

function HouseItem({ house }: { house: HouseDetail }) {
  return (
    <motion.div 
      whileHover={{ x: 4 }}
      className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all group"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 group-hover:scale-110 transition-transform">
          <Home size={20} />
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">{house.theme}</h4>
            <span className="text-xs font-serif text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-full">{house.sign}</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">{house.interpretation}</p>
        </div>
      </div>
    </motion.div>
  );
}

function LuckyItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
      <span className="text-xs text-slate-500 uppercase tracking-wider">{label}</span>
      <span className="text-sm text-slate-200 font-medium">{value}</span>
    </div>
  );
}
