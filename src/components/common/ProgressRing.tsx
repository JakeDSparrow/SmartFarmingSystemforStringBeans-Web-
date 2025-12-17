import React from 'react';

interface ProgressRingProps {
  percentage: number;
  label?: string;
}

const ProgressRing: React.FC<ProgressRingProps> = ({ percentage, label }) => {
  return (
    <div className="relative w-32 h-32">
      <svg className="transform -rotate-90 w-32 h-32">
        <circle 
          cx="64" 
          cy="64" 
          r="56" 
          stroke="#e5e7eb" 
          strokeWidth="12" 
          fill="none" 
        />
        <circle
          cx="64"
          cy="64"
          r="56"
          stroke="#3b82f6"
          strokeWidth="12"
          fill="none"
          strokeDasharray={`${2 * Math.PI * 56}`}
          strokeDashoffset={`${2 * Math.PI * 56 * (1 - percentage / 100)}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-blue-600">{percentage}%</span>
        {label && <span className="text-xs text-gray-500 mt-1">{label}</span>}
      </div>
    </div>
  );
};

export default ProgressRing;