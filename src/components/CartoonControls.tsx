import React from 'react';
import { CartoonStyle, CartoonIntensity, ColorBoost } from '../utils/cartoonizer';
import { Palette, Sparkles, Sliders, Zap, Bot } from 'lucide-react';

interface CartoonControlsProps {
  style: CartoonStyle;
  onStyleChange: (style: CartoonStyle) => void;
  intensity: CartoonIntensity;
  onIntensityChange: (intensity: CartoonIntensity) => void;
  colorBoost: ColorBoost;
  onColorBoostChange: (colorBoost: ColorBoost) => void;
  isAiMode: boolean;
  onToggleAiMode: (ai: boolean) => void;
  isAiLoading: boolean;
  isProcessing: boolean;
}

interface StyleCard {
  id: CartoonStyle;
  name: string;
  emoji: string;
  tagline: string;
  borderGradient: string;
}

const STYLES: StyleCard[] = [
  {
    id: 'comic',
    name: 'Classic Comic',
    emoji: '🎨',
    tagline: 'Bold ink lines & pop-art colors',
    borderGradient: 'from-amber-500 to-rose-500',
  },
  {
    id: 'anime',
    name: 'Anime / Cel',
    emoji: '🌸',
    tagline: 'Smooth cel-shading & soft glow',
    borderGradient: 'from-rose-500 to-purple-500',
  },
  {
    id: '3d',
    name: '3D Animation',
    emoji: '🎬',
    tagline: 'Soft Pixar 3D volumetric feel',
    borderGradient: 'from-cyan-500 to-blue-500',
  },
  {
    id: 'retro',
    name: 'Retro Toon',
    emoji: '🖍️',
    tagline: '90s Saturday morning cartoon',
    borderGradient: 'from-emerald-500 to-amber-500',
  },
];

export const CartoonControls: React.FC<CartoonControlsProps> = ({
  style,
  onStyleChange,
  intensity,
  onIntensityChange,
  colorBoost,
  onColorBoostChange,
  isAiMode,
  onToggleAiMode,
  isAiLoading,
  isProcessing,
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-6 shadow-xl backdrop-blur-sm">
      {/* Top row: Engine Mode switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">Cartoon Options</h2>
        </div>

        {/* Engine switcher tabs */}
        <div className="inline-flex p-1 bg-slate-950/80 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => onToggleAiMode(false)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              !isAiMode
                ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Instant Magic</span>
          </button>

          <button
            onClick={() => onToggleAiMode(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              isAiMode
                ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-purple-300" />
            <span>AI Re-imagine</span>
          </button>
        </div>
      </div>

      {/* 1. Cartoon Styles Grid */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <span>1. Choose Style</span>
            <span className="text-[10px] text-slate-500 font-normal">(Click any to transform)</span>
          </label>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {STYLES.map((s) => {
            const isSelected = style === s.id;
            return (
              <button
                key={s.id}
                onClick={() => onStyleChange(s.id)}
                disabled={isProcessing || isAiLoading}
                className={`relative text-left p-3 rounded-2xl border transition-all ${
                  isSelected
                    ? 'bg-slate-800/90 border-rose-500/80 shadow-lg shadow-rose-500/10 ring-2 ring-rose-500/30'
                    : 'bg-slate-950/60 hover:bg-slate-800/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between mb-1.5">
                  <span className="text-2xl">{s.emoji}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-rose-500 shadow-sm shadow-rose-400" />
                  )}
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-white">{s.name}</h3>
                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{s.tagline}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Simple Fine-Tuning Controls (Line Strength & Vibrancy) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
        {/* Outline Strength */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>Cartoon Outlines</span>
            </span>
            <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
              {intensity}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800">
            {(['subtle', 'balanced', 'bold'] as CartoonIntensity[]).map((level) => (
              <button
                key={level}
                onClick={() => onIntensityChange(level)}
                disabled={isProcessing || isAiLoading}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold capitalize transition-all ${
                  intensity === level
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Color Vibrancy */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span>Color Vibrancy</span>
            </span>
            <span className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider">
              {colorBoost}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800">
            {(['natural', 'vibrant', 'pop'] as ColorBoost[]).map((boost) => (
              <button
                key={boost}
                onClick={() => onColorBoostChange(boost)}
                disabled={isProcessing || isAiLoading}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold capitalize transition-all ${
                  colorBoost === boost
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {boost}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
