import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Download,
  Copy,
  Check,
  Columns,
  Split,
  Eye,
  Sparkles,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react';

export type ViewMode = 'slider' | 'side-by-side' | 'cartoon-only';

interface ComparisonSliderProps {
  originalUrl: string;
  cartoonUrl: string;
  isProcessing: boolean;
  styleName: string;
  onDownload: () => void;
  onCopy: () => void;
  copied: boolean;
}

export const ComparisonSlider: React.FC<ComparisonSliderProps> = ({
  originalUrl,
  cartoonUrl,
  isProcessing,
  styleName,
  onDownload,
  onCopy,
  copied,
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<ViewMode>('slider');
  const [isHoldingOriginal, setIsHoldingOriginal] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleEnd]);

  return (
    <div className="space-y-4">
      {/* Top Action & View Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
        {/* View Mode Switcher */}
        <div className="inline-flex items-center p-1 bg-slate-950/80 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setViewMode('slider')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              viewMode === 'slider'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Split className="w-3.5 h-3.5" />
            <span>Split Slider</span>
          </button>

          <button
            onClick={() => setViewMode('side-by-side')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              viewMode === 'side-by-side'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Side by Side</span>
          </button>

          <button
            onClick={() => setViewMode('cartoon-only')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              viewMode === 'cartoon-only'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Cartoon Only</span>
          </button>
        </div>

        {/* Hold to Compare & Export Actions */}
        <div className="flex items-center gap-2">
          {viewMode === 'cartoon-only' && (
            <button
              onMouseDown={() => setIsHoldingOriginal(true)}
              onMouseUp={() => setIsHoldingOriginal(false)}
              onMouseLeave={() => setIsHoldingOriginal(false)}
              onTouchStart={() => setIsHoldingOriginal(true)}
              onTouchEnd={() => setIsHoldingOriginal(false)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors select-none"
            >
              {isHoldingOriginal ? 'Showing Original' : 'Hold to View Original'}
            </button>
          )}

          <button
            onClick={onCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            title="Copy cartoon image to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy</span>
              </>
            )}
          </button>

          <button
            onClick={onDownload}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-500 text-white shadow-md shadow-rose-500/20 hover:opacity-95 transition-opacity"
            title="Download cartoon in full resolution"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PNG</span>
          </button>
        </div>
      </div>

      {/* Main Image Display Box */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800/80 shadow-2xl flex items-center justify-center min-h-[380px] max-h-[680px]">
        {/* Processing Spinner Overlay */}
        {isProcessing && (
          <div className="absolute inset-0 z-30 bg-slate-950/70 backdrop-blur-xs flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 p-0.5 animate-spin">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <p className="text-xs font-semibold text-slate-300">Rendering {styleName} cartoon...</p>
          </div>
        )}

        {/* 1. Split Slider View */}
        {viewMode === 'slider' && (
          <div
            ref={containerRef}
            className="relative w-full h-full select-none cursor-ew-resize overflow-hidden flex items-center justify-center p-2"
            onMouseDown={(e) => {
              setIsDragging(true);
              handleMove(e.clientX);
            }}
            onTouchStart={(e) => {
              setIsDragging(true);
              handleMove(e.touches[0].clientX);
            }}
          >
            {/* Base layer: Original image */}
            <img
              src={originalUrl}
              alt="Original"
              className="max-h-[640px] w-auto max-w-full object-contain rounded-2xl pointer-events-none"
              referrerPolicy="no-referrer"
            />

            {/* Top layer: Cartoon image clipped by slider position */}
            <div
              className="absolute inset-0 flex items-center justify-center p-2 pointer-events-none overflow-hidden"
              style={{
                clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`,
              }}
            >
              <img
                src={cartoonUrl}
                alt="Cartoonized"
                className="max-h-[640px] w-auto max-w-full object-contain rounded-2xl"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Split Handle Divider Line */}
            <div
              className="absolute top-0 bottom-0 z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Vertical line with glow */}
              <div className="w-0.5 h-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] -translate-x-1/2" />

              {/* Center Grab Handle Circle */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-950/90 border-2 border-white shadow-xl flex items-center justify-center text-white backdrop-blur-sm pointer-events-auto cursor-ew-resize hover:scale-110 active:scale-95 transition-transform">
                <Split className="w-4 h-4 text-amber-400 rotate-90" />
              </div>
            </div>

            {/* Labels overlay */}
            <div className="absolute top-5 left-5 pointer-events-none z-10 px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-slate-700/60 text-[11px] font-bold text-slate-300">
              Original Photo
            </div>
            <div className="absolute top-5 right-5 pointer-events-none z-10 px-3 py-1 rounded-full bg-rose-500/20 backdrop-blur-md border border-rose-500/40 text-[11px] font-bold text-rose-300 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-rose-400" />
              <span>Cartoon Version</span>
            </div>

            {/* Bottom Slider instructions */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-10 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[10px] text-slate-400 font-medium hidden sm:block">
              Drag slider left or right to compare
            </div>
          </div>
        )}

        {/* 2. Side-by-Side View */}
        {viewMode === 'side-by-side' && (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {/* Original Box */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center p-2">
              <img
                src={originalUrl}
                alt="Original"
                className="max-h-[500px] w-auto max-w-full object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-sm border border-slate-700 text-xs font-bold text-slate-300">
                Original
              </span>
            </div>

            {/* Cartoon Box */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center p-2">
              <img
                src={cartoonUrl}
                alt="Cartoonized"
                className="max-h-[500px] w-auto max-w-full object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-rose-500/20 backdrop-blur-sm border border-rose-500/40 text-xs font-bold text-rose-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Cartoon</span>
              </span>
            </div>
          </div>
        )}

        {/* 3. Cartoon Only View */}
        {viewMode === 'cartoon-only' && (
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <img
              src={isHoldingOriginal ? originalUrl : cartoonUrl}
              alt={isHoldingOriginal ? 'Original' : 'Cartoonized'}
              className="max-h-[640px] w-auto max-w-full object-contain rounded-2xl shadow-xl transition-all"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-xs font-semibold text-slate-300">
              {isHoldingOriginal ? 'Original View' : `Style: ${styleName}`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
