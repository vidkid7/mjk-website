'use client'
import React from 'react'

export function NepalFlagPennant({ className = '', width = 80, height = 100 }: { className?: string; width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 80 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="flagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C8102E" />
          <stop offset="100%" stopColor="#8B0000" />
        </linearGradient>
      </defs>
      {/* Double pennant shape */}
      <path d="M5 0 L5 100 L5 95 L75 70 L5 50 L75 25 L5 0 Z" fill="url(#flagGrad)" stroke="#003893" strokeWidth="3" />
      {/* Moon symbol */}
      <circle cx="30" cy="18" r="7" fill="white" />
      <circle cx="33" cy="16" r="6" fill="url(#flagGrad)" />
      {/* Sun symbol */}
      <g transform="translate(28, 68)">
        {[...Array(12)].map((_, i) => (
          <line key={i} x1="0" y1="-10" x2="0" y2="-7" stroke="white" strokeWidth="1.5"
            transform={`rotate(${i * 30})`} />
        ))}
        <circle cx="0" cy="0" r="5" fill="white" />
      </g>
    </svg>
  )
}

export function MountainSilhouette({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 1440 400" className={className} preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
        </linearGradient>
      </defs>
      {/* Background mountains */}
      <path d="M0,400 L0,280 L100,220 L200,260 L300,180 L400,230 L500,140 L600,200 L700,100 L800,170 L900,80 L1000,150 L1100,60 L1200,130 L1300,90 L1440,160 L1440,400 Z" 
        fill="rgba(255,255,255,0.05)" />
      {/* Foreground mountains */}
      <path d="M0,400 L0,320 L120,260 L240,300 L360,200 L480,270 L600,160 L720,240 L840,120 L960,210 L1080,150 L1200,220 L1320,170 L1440,230 L1440,400 Z" 
        fill="url(#mountainGrad)" />
      {/* Snow caps */}
      <path d="M840,120 L820,145 L860,145 Z" fill="rgba(255,255,255,0.3)" />
      <path d="M1080,150 L1060,172 L1100,172 Z" fill="rgba(255,255,255,0.25)" />
      <path d="M500,140 L480,165 L520,165 Z" fill="rgba(255,255,255,0.2)" />
    </svg>
  )
}

export function SunSymbol({ className = '', size = 40 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(20, 20)">
        {[...Array(12)].map((_, i) => (
          <line key={i} x1="0" y1="-16" x2="0" y2="-11" stroke="#D4A843" strokeWidth="2"
            transform={`rotate(${i * 30})`} />
        ))}
        <circle cx="0" cy="0" r="8" fill="none" stroke="#D4A843" strokeWidth="2" />
        <circle cx="0" cy="0" r="4" fill="#D4A843" />
      </g>
    </svg>
  )
}

export function MoonSymbol({ className = '', size = 40 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="12" fill="none" stroke="#D4A843" strokeWidth="2" />
      <circle cx="23" cy="17" r="10" fill="var(--deep-blue, #001F5B)" />
      <path d="M12,8 Q18,12 12,20" fill="#D4A843" />
    </svg>
  )
}

export function DhakaPattern({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 opacity-5 ${className}`}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id="dhaka" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="#D4A843" strokeWidth="0.5" />
            <circle cx="30" cy="30" r="5" fill="none" stroke="#D4A843" strokeWidth="0.5" />
            <path d="M15 15 L45 15 L45 45 L15 45 Z" fill="none" stroke="#D4A843" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dhaka)" />
      </svg>
    </div>
  )
}
