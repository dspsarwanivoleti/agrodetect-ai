
import React, { useRef, useState, useEffect } from 'react';
import { Camera, RefreshCw, X, Zap, Loader2 } from 'lucide-react';
import { analyzePlantImage } from '../services/gemini';
import { PlantScan } from '../types';

interface CameraScannerProps {
  onScanComplete: (scan: PlantScan) => void;
  onClose: () => void;
}

const CameraScanner: React.FC<CameraScannerProps> = ({ onScanComplete, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError("Unable to access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setAnalyzing(true);
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const base64 = canvas.toDataURL('image/jpeg').split(',')[1];
      const imageUrl = canvas.toDataURL('image/jpeg');

      try {
        const result = await analyzePlantImage(base64);
        const newScan: PlantScan = {
          id: Date.now().toString(),
          timestamp: Date.now(),
          imageUrl,
          ...result
        };
        onScanComplete(newScan);
      } catch (err) {
        setError("Failed to analyze image. Try again.");
      } finally {
        setAnalyzing(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Header */}
      <div className="p-4 flex justify-between items-center text-white safe-pt">
        <button onClick={onClose} className="p-2"><X size={24} /></button>
        <span className="font-semibold">Plant Scanner</span>
        <button onClick={startCamera} className="p-2"><RefreshCw size={20} /></button>
      </div>

      {/* Camera View */}
      <div className="flex-1 relative overflow-hidden bg-zinc-900 flex items-center justify-center">
        {error ? (
          <div className="text-white text-center p-6">
            <p className="mb-4">{error}</p>
            <button onClick={onClose} className="bg-green-600 px-6 py-2 rounded-full">Go Back</button>
          </div>
        ) : (
          <>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="w-full h-full object-cover"
            />
            {/* Guide Overlay */}
            <div className="absolute inset-0 border-[40px] border-black/40 pointer-events-none">
              <div className="w-full h-full border-2 border-white/50 rounded-2xl relative">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-500 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-500 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-500 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-500 rounded-br-lg" />
              </div>
            </div>
          </>
        )}
        
        {analyzing && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white backdrop-blur-sm transition-all">
            <div className="relative">
              <Loader2 size={48} className="animate-spin text-green-500" />
              <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" size={20} />
            </div>
            <p className="mt-4 font-medium">Analyzing Leaf Patterns...</p>
            <p className="text-xs text-gray-400 mt-1 italic">Engineered with CNN-ready AI</p>
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="p-10 flex justify-center items-center bg-zinc-950 safe-pb">
        <button 
          onClick={captureAndAnalyze}
          disabled={analyzing}
          className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl active:scale-95 transition-transform disabled:opacity-50"
        >
          <div className="w-16 h-16 border-4 border-zinc-950 rounded-full bg-green-500 flex items-center justify-center">
            <Camera size={32} className="text-white" />
          </div>
        </button>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default CameraScanner;
