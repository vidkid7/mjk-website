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

export function BuddhaStatueSilhouette({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 680" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="buddhaStatueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
        </linearGradient>
      </defs>
      <g fill="url(#buddhaStatueGrad)">
        <path d="M260 38c26 31 43 66 43 103 0 23-8 43-22 58 50 14 84 59 84 113 0 32-12 61-31 83 44 13 82 38 109 74 30 40 47 89 47 142H30c0-53 17-102 47-142 27-36 65-61 109-74-19-22-31-51-31-83 0-54 34-99 84-113-14-15-22-35-22-58 0-37 17-72 43-103Z" />
        <path d="M120 566c32-37 79-58 140-58s108 21 140 58H120Z" opacity=".55" />
        <path d="M74 610h372l30 52H44l30-52Z" opacity=".65" />
        <path d="M164 276c-46 32-80 84-92 143 40-44 87-70 141-78-23-15-40-38-49-65Z" opacity=".45" />
        <path d="M356 276c46 32 80 84 92 143-40-44-87-70-141-78 23-15 40-38 49-65Z" opacity=".45" />
      </g>
      <g fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="4">
        <path d="M188 610c21-26 45-39 72-39s51 13 72 39" />
        <path d="M170 184c18 26 48 41 90 41s72-15 90-41" />
      </g>
    </svg>
  )
}

export function WavingNepalFlag({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 680 760" className={`proper-nepal-flag ${className}`} style={style} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="properNepalFlagRed" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="42%" stopColor="#dc143c" />
          <stop offset="100%" stopColor="#a30f2b" />
        </linearGradient>
        <filter id="properNepalFlagWave" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.011 0.045" numOctaves="2" seed="7" result="windNoise">
            <animate attributeName="baseFrequency" dur="5.5s" values="0.009 0.04;0.017 0.055;0.011 0.045;0.009 0.04" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="windNoise" scale="14" xChannelSelector="R" yChannelSelector="G">
            <animate attributeName="scale" dur="5.5s" values="8;18;12;8" repeatCount="indefinite" />
          </feDisplacementMap>
        </filter>
        <filter id="properNepalFlagShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="24" stdDeviation="18" floodColor="#020617" floodOpacity=".45" />
        </filter>
      </defs>

      <g className="proper-nepal-flag-cloth" filter="url(#properNepalFlagShadow)">
        <g filter="url(#properNepalFlagWave)">
          <path d="M72 42v648L96 666l506-186L197 356l368-197L72 42Z" fill="#003893" />
          <path d="M112 104v499l376-138L122 353l329-176L112 104Z" fill="url(#properNepalFlagRed)" />
          <path d="M112 104v499l376-138L122 353l329-176L112 104Z" fill="rgba(255,255,255,0.08)" />
          <path d="M110 108c93 58 178 91 338 73M122 354c104 42 205 80 363 112" stroke="rgba(255,255,255,0.2)" strokeWidth="12" fill="none" />

          <g transform="translate(205 208)">
            <path d="M0 64c19 23 52 37 91 37s72-14 91-37c-12 49-47 83-91 83S12 113 0 64Z" fill="white" />
            <circle cx="91" cy="57" r="42" fill="white" />
            <circle cx="108" cy="47" r="40" fill="#dc143c" />
            {[...Array(8)].map((_, i) => (
              <path key={i} d="M91 0l8 25h26l-21 15 8 25-21-15-21 15 8-25-21-15h26z" fill="white" transform={`rotate(${i * 45} 91 57) scale(.34) translate(174 38)`} />
            ))}
          </g>

          <g transform="translate(214 482)">
            {[...Array(12)].map((_, i) => (
              <path key={i} d="M0 -78L13 -25H-13Z" fill="white" transform={`rotate(${i * 30})`} />
            ))}
            <circle r="50" fill="white" />
            <circle r="23" fill="#dc143c" opacity=".16" />
          </g>
        </g>
      </g>
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

export function AnimatedNepalFlagBackground({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.18),transparent_28%),linear-gradient(120deg,rgba(5,24,54,0.94),rgba(9,31,63,0.86)_46%,rgba(99,12,26,0.72))]" />

      <div className="nepal-flag-wave absolute -left-[14%] top-[14%] h-[58%] w-[132%] opacity-[0.34] sm:top-[18%] sm:h-[54%]">
        <img
          src="/nepal-flag-wave.png"
          alt=""
          className="h-full w-full object-cover object-center"
          draggable={false}
        />
      </div>

      <div className="nepal-flag-wave nepal-flag-wave-delayed absolute -right-[20%] bottom-[12%] h-[44%] w-[112%] opacity-[0.18]">
        <img
          src="/nepal-flag-wave.png"
          alt=""
          className="h-full w-full object-cover object-center"
          draggable={false}
        />
      </div>

      <div className="flag-light-band absolute left-[-8%] top-[28%] h-24 w-[120%] rotate-[-5deg] bg-white/10 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.72),rgba(2,6,23,0.16)_48%,rgba(2,6,23,0.62)),linear-gradient(180deg,rgba(2,6,23,0.58),rgba(2,6,23,0.14)_42%,rgba(2,6,23,0.8))]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.65)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.65)_1px,transparent_1px)] [background-size:72px_72px]" />
    </div>
  )
}
