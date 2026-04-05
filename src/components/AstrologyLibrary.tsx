import { motion } from 'motion/react';
import { BookOpen, Sun, Moon, Star, Compass, Layout, Zap, Shield, Waves, Wind, Flame, Mountain } from 'lucide-react';
import { translations, Language } from '../lib/translations';

interface AstrologyLibraryProps {
  language: Language;
}

export default function AstrologyLibrary({ language }: AstrologyLibraryProps) {
  const t = translations[language];
  
  return (
    <div className="w-full max-w-5xl mx-auto space-y-12 pb-20">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-serif text-white text-glow">{t.libraryTitle}</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          {t.libraryDesc}
        </p>
      </div>

      {/* The Big Three */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-2">
          <BookOpen className="text-purple-400" size={20} />
          <h3 className="text-2xl font-serif text-purple-200">{t.bigThree}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard 
            icon={<Sun className="text-yellow-400" />}
            title={t.sunSign}
            desc={t.sunSignDesc}
          />
          <InfoCard 
            icon={<Moon className="text-blue-300" />}
            title={t.moonSign}
            desc={t.moonSignDesc}
          />
          <InfoCard 
            icon={<Star className="text-purple-400" />}
            title={t.risingSign}
            desc={t.risingSignDesc}
          />
        </div>
      </section>

      {/* The Four Elements */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-2">
          <Compass className="text-purple-400" size={20} />
          <h3 className="text-2xl font-serif text-purple-200">{t.fourElements}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ElementCard 
            icon={<Flame className="text-orange-500" />}
            title={t.fire}
            signs={t.fireSigns}
            desc={t.fireDesc}
          />
          <ElementCard 
            icon={<Mountain className="text-emerald-600" />}
            title={t.earth}
            signs={t.earthSigns}
            desc={t.earthDesc}
          />
          <ElementCard 
            icon={<Wind className="text-sky-400" />}
            title={t.air}
            signs={t.airSigns}
            desc={t.airDesc}
          />
          <ElementCard 
            icon={<Waves className="text-blue-500" />}
            title={t.water}
            signs={t.waterSigns}
            desc={t.waterDesc}
          />
        </div>
      </section>

      {/* The 12 Houses */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-2">
          <Layout className="text-purple-400" size={20} />
          <h3 className="text-2xl font-serif text-purple-200">{t.twelveHouses}</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { h: t.house1, t: t.house1Title, d: t.house1Desc },
            { h: t.house2, t: t.house2Title, d: t.house2Desc },
            { h: t.house3, t: t.house3Title, d: t.house3Desc },
            { h: t.house4, t: t.house4Title, d: t.house4Desc },
            { h: t.house5, t: t.house5Title, d: t.house5Desc },
            { h: t.house6, t: t.house6Title, d: t.house6Desc },
            { h: t.house7, t: t.house7Title, d: t.house7Desc },
            { h: t.house8, t: t.house8Title, d: t.house8Desc },
            { h: t.house9, t: t.house9Title, d: t.house9Desc },
            { h: t.house10, t: t.house10Title, d: t.house10Desc },
            { h: t.house11, t: t.house11Title, d: t.house11Desc },
            { h: t.house12, t: t.house12Title, d: t.house12Desc },
          ].map((house, i) => (
            <div key={i} className="glass-card p-4 hover:bg-white/5 transition-colors border-l-2 border-l-purple-500/30">
              <span className="text-[10px] uppercase tracking-widest text-purple-400 font-bold">{house.h}</span>
              <h4 className="text-white font-medium">{house.t}</h4>
              <p className="text-[11px] text-slate-500 mt-1">{house.d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function InfoCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="glass-card p-6 space-y-4">
      <div className="p-3 bg-white/5 w-fit rounded-2xl">{icon}</div>
      <h4 className="text-xl font-serif text-white">{title}</h4>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function ElementCard({ icon, title, signs, desc }: { icon: React.ReactNode; title: string; signs: string; desc: string }) {
  return (
    <div className="glass-card p-6 space-y-3">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white/5 rounded-lg">{icon}</div>
        <h4 className="text-lg font-serif text-white">{title}</h4>
      </div>
      <p className="text-[10px] uppercase tracking-widest text-purple-400 font-bold">{signs}</p>
      <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}
