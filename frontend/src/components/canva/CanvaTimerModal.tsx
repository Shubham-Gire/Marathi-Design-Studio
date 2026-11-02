import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, X, Clock } from 'lucide-react';

interface CanvaTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CanvaTimerModal: React.FC<CanvaTimerModalProps> = ({ isOpen, onClose }) => {
  const [seconds, setSeconds] = useState(300); // 5 minutes default
  const [isRunning, setIsRunning] = useState(false);
  const [presetTime, setPresetTime] = useState(300);

  useEffect(() => {
    let interval: any = null;
    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0 && isRunning) {
      setIsRunning(false);
      try {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        audio.play().catch(() => {});
      } catch {}
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(remSecs).padStart(2, '0')}`;
  };

  const setPreset = (s: number) => {
    setIsRunning(false);
    setPresetTime(s);
    setSeconds(s);
  };

  return (
    <div className="fixed bottom-14 left-4 z-50 w-72 bg-[#1e2023] text-gray-200 border border-[#343538] rounded-2xl shadow-2xl p-4 select-none backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-150">
      <div className="flex items-center justify-between pb-3 border-b border-[#2d2e30]">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-purple-400" />
          <span className="font-extrabold text-sm text-white">Design Timer</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Big Digital Display */}
      <div className="py-4 text-center">
        <span className="font-mono text-4xl font-black text-white tracking-wider">
          {formatTime(seconds)}
        </span>
      </div>

      {/* Preset Buttons */}
      <div className="grid grid-cols-4 gap-1.5 mb-4">
        {[
          { label: '1m', secs: 60 },
          { label: '3m', secs: 180 },
          { label: '5m', secs: 300 },
          { label: '10m', secs: 600 }
        ].map((p) => (
          <button
            key={p.label}
            onClick={() => setPreset(p.secs)}
            className={`py-1 rounded-lg text-xs font-bold transition-colors ${
              presetTime === p.secs && !isRunning
                ? 'bg-[#8b3dff] text-white'
                : 'bg-[#27282b] hover:bg-[#343538] text-gray-300'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-2 font-bold text-xs transition-colors ${
            isRunning
              ? 'bg-amber-600 hover:bg-amber-500 text-white'
              : 'bg-[#8b3dff] hover:bg-[#7a30e8] text-white shadow-md shadow-purple-900/40'
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Start Timer</span>
            </>
          )}
        </button>

        <button
          onClick={() => {
            setIsRunning(false);
            setSeconds(presetTime);
          }}
          className="p-2 bg-[#27282b] hover:bg-[#343538] rounded-xl text-gray-300 hover:text-white transition-colors"
          title="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
