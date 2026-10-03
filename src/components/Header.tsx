import React from 'react';
import { Sparkles, Wand2, RefreshCw } from 'lucide-react';

interface HeaderProps {
  hasImage: boolean;
  onReset: () => void;
  isProcessing: boolean;
}

export const Header: React.FC<HeaderProps> = ({ hasImage, onReset, isProcessing }) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-500 p-0.5 shadow-lg shadow-rose-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Wand2 className="w-5 h-5 text-amber-400 animate-float-sparkle" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center">
                Toon<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-400">ify</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full">
                Cartoonizer
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Turn any photo into a cartoon with simple options</p>
          </div>
        </div>

        {/* Right action */}
        <div className="flex items-center gap-3">
          {hasImage && (
            <button
              onClick={onReset}
              disabled={isProcessing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition-colors"
              title="Upload another picture"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
              <span>Change Image</span>
            </button>
          )}

          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Instant & Private</span>
          </div>
        </div>
      </div>
    </header>
  );
};
