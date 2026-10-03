import React, { useRef, useState, useEffect } from 'react';
import { Upload, Camera, Image as ImageIcon, Sparkles, Clipboard, ArrowRight } from 'lucide-react';
import { SAMPLE_IMAGES, SampleImage } from '../utils/sampleImages';

interface ImageUploaderProps {
  onImageSelected: (dataUrl: string, name?: string) => void;
  onOpenCamera: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, onOpenCamera }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [samplePreviews, setSamplePreviews] = useState<Record<string, string>>({});

  // Preload sample image thumbnails
  useEffect(() => {
    const previews: Record<string, string> = {};
    SAMPLE_IMAGES.forEach((sample) => {
      try {
        previews[sample.id] = sample.createDataUrl();
      } catch (e) {
        console.error('Error generating sample preview:', e);
      }
    });
    setSamplePreviews(previews);
  }, []);

  // Handle global paste
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          if (file) {
            handleFile(file);
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPEG, PNG, WEBP, etc.)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === 'string') {
        onImageSelected(e.target.result, file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSampleClick = (sample: SampleImage) => {
    const dataUrl = samplePreviews[sample.id] || sample.createDataUrl();
    onImageSelected(dataUrl, `${sample.title}.jpg`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Intro */}
      <div className="text-center max-w-2xl mx-auto space-y-3 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Simple Cartoonizer • Zero Complicated Settings</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Turn Any Photo into a{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-400">
            Cartoon
          </span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
          Upload your portrait, pet, or scenery. Choose from simple cartoon styles and compare before-and-after instantly.
        </p>
      </div>

      {/* Main Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative group rounded-3xl border-2 border-dashed transition-all p-8 sm:p-12 text-center ${
          isDragging
            ? 'border-rose-400 bg-rose-500/10 scale-[1.01]'
            : 'border-slate-800 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-900/90'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          accept="image/*"
          className="hidden"
        />

        <div className="max-w-md mx-auto space-y-5">
          {/* Animated upload icon */}
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-amber-500/20 via-rose-500/20 to-indigo-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
            <Upload className="w-10 h-10 animate-bounce" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Drag & drop your photo here</h3>
            <p className="text-xs text-slate-400">
              Supports JPG, PNG, WEBP, HEIC • Instant client-side processing
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-500 text-white shadow-lg shadow-rose-500/25 hover:opacity-95 transition-all flex items-center gap-2"
            >
              <ImageIcon className="w-4 h-4" />
              <span>Browse Image</span>
            </button>

            <button
              onClick={onOpenCamera}
              className="px-5 py-3 rounded-xl font-semibold text-sm bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white transition-colors flex items-center gap-2"
            >
              <Camera className="w-4 h-4 text-amber-400" />
              <span>Take Photo</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-1">
            <Clipboard className="w-3.5 h-3.5" />
            <span>Tip: You can also press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-300 font-mono">Ctrl+V</kbd> to paste an image directly</span>
          </div>
        </div>
      </div>

      {/* Instant Sample Presets */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-white text-base">Or try with an instant sample photo</h3>
          </div>
          <span className="text-xs text-slate-400">Click to convert instantly</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {SAMPLE_IMAGES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => handleSampleClick(sample)}
              className="group text-left rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 p-3 transition-all hover:shadow-xl hover:shadow-slate-950/50 hover:-translate-y-0.5"
            >
              <div className="relative rounded-xl overflow-hidden aspect-square mb-3 bg-slate-950 border border-slate-800/80">
                {samplePreviews[sample.id] ? (
                  <img
                    src={samplePreviews[sample.id]}
                    alt={sample.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-600">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                )}
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-950/80 backdrop-blur-sm text-amber-300 border border-amber-500/30">
                  {sample.badge}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-amber-400 transition-colors">
                    {sample.title}
                  </h4>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-1">{sample.category}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
