import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Clock, User, Sparkles } from 'lucide-react';
import { BirthData } from '../lib/gemini';
import { translations, Language } from '../lib/translations';

interface ZodiacFormProps {
  onSubmit: (data: BirthData) => void;
  isLoading: boolean;
  language: Language;
}

export default function ZodiacForm({ onSubmit, isLoading, language }: ZodiacFormProps) {
  const t = translations[language];
  const [formData, setFormData] = useState<BirthData>({
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl mx-auto p-8 glass-card shadow-2xl"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif text-glow text-white mb-2">{t.beginJourney}</h2>
        <p className="text-slate-400 text-sm">{t.enterDetails}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-slate-500 font-medium flex items-center gap-2">
            <User size={14} /> {t.fullName}
          </label>
          <input
            required
            type="text"
            placeholder={t.namePlaceholder}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-slate-500 font-medium flex items-center gap-2">
              <Calendar size={14} /> {t.birthDate}
            </label>
            <input
              required
              type="date"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all [color-scheme:dark]"
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-slate-500 font-medium flex items-center gap-2">
              <Clock size={14} /> {t.birthTime}
            </label>
            <input
              required
              type="time"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all [color-scheme:dark]"
              value={formData.birthTime}
              onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-slate-500 font-medium flex items-center gap-2">
            <MapPin size={14} /> {t.birthPlace}
          </label>
          <input
            required
            type="text"
            placeholder={t.placePlaceholder}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            value={formData.birthPlace}
            onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 text-white font-medium py-4 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-purple-900/20"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
              {t.analyzeChart}
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}
