/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { CartoonControls } from './components/CartoonControls';
import { ComparisonSlider } from './components/ComparisonSlider';
import { CameraModal } from './components/CameraModal';
import {
  cartoonizeImage,
  CartoonStyle,
  CartoonIntensity,
  ColorBoost,
} from './utils/cartoonizer';
import { Sparkles, AlertCircle, Info } from 'lucide-react';

export default function App() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [cartoonImage, setCartoonImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>('photo.jpg');

  // Simple options
  const [style, setStyle] = useState<CartoonStyle>('comic');
  const [intensity, setIntensity] = useState<CartoonIntensity>('balanced');
  const [colorBoost, setColorBoost] = useState<ColorBoost>('vibrant');

  // Execution states
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isAiMode, setIsAiMode] = useState<boolean>(false);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<{
    type: 'info' | 'error' | 'success';
    message: string;
  } | null>(null);

  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Hidden image loader element to get natural dimensions
  const imageElementRef = useRef<HTMLImageElement | null>(null);

  // Show auto-dismiss notification
  const showNotification = (
    type: 'info' | 'error' | 'success',
    message: string,
    durationMs = 4500
  ) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification((curr) => (curr?.message === message ? null : curr));
    }, durationMs);
  };

  // Convert image using client-side algorithm
  const processInstantCartoon = useCallback(
    async (
      imgSrc: string,
      currentStyle: CartoonStyle,
      currentIntensity: CartoonIntensity,
      currentColorBoost: ColorBoost
    ) => {
      setIsProcessing(true);

      try {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = imgSrc;

        await new Promise((res, rej) => {
          if (img.complete && img.naturalWidth) {
            res(null);
          } else {
            img.onload = () => res(null);
            img.onerror = (e) => rej(e);
          }
        });

        imageElementRef.current = img;

        const resultDataUrl = await cartoonizeImage(img, {
          style: currentStyle,
          intensity: currentIntensity,
          colorBoost: currentColorBoost,
        });

        setCartoonImage(resultDataUrl);
      } catch (err: any) {
        console.error('Failed to cartoonize image:', err);
        showNotification('error', 'Error rendering cartoon: ' + (err.message || 'unknown error'));
      } finally {
        setIsProcessing(false);
      }
    },
    []
  );

  // Convert image using AI Gemini model
  const processAiCartoon = async (
    imgSrc: string,
    currentStyle: CartoonStyle
  ) => {
    setIsAiLoading(true);
    showNotification('info', 'Contacting Gemini AI to re-imagine your photo as a cartoon...');

    try {
      const response = await fetch('/api/ai/cartoonize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: imgSrc,
          style: currentStyle,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.image) {
        throw new Error(data.error || 'Failed to generate cartoon with AI');
      }

      setCartoonImage(data.image);
      showNotification('success', 'AI Cartoon generation complete!');
    } catch (err: any) {
      console.warn('AI Cartoon error, falling back to Instant engine:', err);
      showNotification(
        'error',
        err.message || 'AI quota reached. Using instant cartoon engine instead!'
      );
      // Fallback seamlessly to client-side engine
      setIsAiMode(false);
      processInstantCartoon(imgSrc, currentStyle, intensity, colorBoost);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Re-run whenever image, style, intensity, or colorBoost changes
  useEffect(() => {
    if (!originalImage) return;

    if (isAiMode) {
      processAiCartoon(originalImage, style);
    } else {
      processInstantCartoon(originalImage, style, intensity, colorBoost);
    }
  }, [originalImage, style, intensity, colorBoost, isAiMode]);

  const handleImageSelected = (dataUrl: string, name?: string) => {
    setOriginalImage(dataUrl);
    if (name) setImageName(name);
  };

  const handleReset = () => {
    setOriginalImage(null);
    setCartoonImage(null);
    setIsAiMode(false);
    setNotification(null);
  };

  const handleToggleAiMode = (ai: boolean) => {
    setIsAiMode(ai);
  };

  const handleDownload = () => {
    if (!cartoonImage) return;
    const link = document.createElement('a');
    const baseName = imageName.replace(/\.[^/.]+$/, '');
    link.download = `toonify_${style}_${baseName}.png`;
    link.href = cartoonImage;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('success', 'Cartoon saved to downloads!');
  };

  const handleCopy = async () => {
    if (!cartoonImage) return;

    try {
      const res = await fetch(cartoonImage);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      showNotification('success', 'Cartoon copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy image to clipboard:', err);
      showNotification('info', 'Right-click the cartoon and select "Copy Image" to copy.');
    }
  };

  const getStyleDisplayName = (s: CartoonStyle) => {
    switch (s) {
      case 'comic':
        return 'Classic Comic';
      case 'anime':
        return 'Anime Cel';
      case '3d':
        return '3D Animation';
      case 'retro':
        return 'Retro Toon';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-rose-500 selection:text-white">
      {/* App Header */}
      <Header
        hasImage={Boolean(originalImage)}
        onReset={handleReset}
        isProcessing={isProcessing || isAiLoading}
      />

      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-20 right-4 z-50 max-w-sm w-full animate-in slide-in-from-top-3 fade-in duration-200">
          <div
            className={`p-3.5 rounded-2xl border shadow-xl flex items-start gap-3 backdrop-blur-md ${
              notification.type === 'error'
                ? 'bg-rose-950/90 border-rose-800 text-rose-200'
                : notification.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-800 text-emerald-200'
                : 'bg-indigo-950/90 border-indigo-800 text-indigo-200'
            }`}
          >
            {notification.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            ) : notification.type === 'success' ? (
              <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            )}
            <p className="text-xs font-medium leading-relaxed">{notification.message}</p>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 sm:py-8">
        {!originalImage ? (
          /* Step 1: Upload or pick sample photo */
          <ImageUploader
            onImageSelected={handleImageSelected}
            onOpenCamera={() => setIsCameraOpen(true)}
          />
        ) : (
          /* Step 2: Convert with simple options & interactive split viewer */
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Simple Options Bar */}
            <CartoonControls
              style={style}
              onStyleChange={setStyle}
              intensity={intensity}
              onIntensityChange={setIntensity}
              colorBoost={colorBoost}
              onColorBoostChange={setColorBoost}
              isAiMode={isAiMode}
              onToggleAiMode={handleToggleAiMode}
              isAiLoading={isAiLoading}
              isProcessing={isProcessing}
            />

            {/* Split Comparison Slider & Viewers */}
            {cartoonImage && (
              <ComparisonSlider
                originalUrl={originalImage}
                cartoonUrl={cartoonImage}
                isProcessing={isProcessing || isAiLoading}
                styleName={getStyleDisplayName(style)}
                onDownload={handleDownload}
                onCopy={handleCopy}
                copied={copied}
              />
            )}
          </div>
        )}
      </main>

      {/* Camera Capture Modal */}
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={(dataUrl) => handleImageSelected(dataUrl, 'selfie.jpg')}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>Toonify • Simple Photo to Cartoon Converter</p>
          <p className="text-[11px] text-slate-600">
            Built-in multi-style cartoon rendering • No complex settings
          </p>
        </div>
      </footer>
    </div>
  );
}
