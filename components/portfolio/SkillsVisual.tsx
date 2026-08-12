'use client'

import type { CSSProperties, ReactElement } from 'react'

/* ============================================================
 * SkillsVisual — "The Practice Atlas"
 * Four original abstract compositions that share the same
 * instrument-panel language as CaseVisual: corner brackets,
 * soft grid backdrop, EKG backbone, big serif numeral,
 * and orbiting ambient dots. Each visualises a discipline
 * through systems thinking rather than literal depiction.
 * ============================================================ */

type SkillsVisualProps = {
  index: number
}

const stroke: CSSProperties = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  vectorEffect: 'non-scaling-stroke',
}

const faint: CSSProperties = { ...stroke, opacity: 0.22 }
const whisper: CSSProperties = { ...stroke, opacity: 0.1 }

const red: CSSProperties = { ...stroke, stroke: 'var(--gateway-red)' }
const redFill: CSSProperties = { fill: 'var(--gateway-red)', stroke: 'none' }
const redSoft: CSSProperties = { fill: 'var(--gateway-red)', stroke: 'none', opacity: 0.18 }
const redGlow: CSSProperties = {
  ...red,
  filter: 'drop-shadow(0 0 3px color-mix(in srgb, var(--gateway-red) 60%, transparent))',
}

const monoStyle: CSSProperties = {
  fontFamily: 'var(--gateway-mono)',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  fill: 'currentColor',
}

const tabStyle: CSSProperties = {
  ...monoStyle,
  fontSize: 4,
  fill: 'var(--gateway-red)',
  opacity: 0.95,
}

const serifStyle: CSSProperties = {
  fontFamily: 'Bodoni Moda, serif',
  letterSpacing: '-0.04em',
  fill: 'currentColor',
}

const frameStyle: CSSProperties = {
  ...stroke,
  strokeWidth: 1.2,
  strokeDasharray: '4 3',
  opacity: 0.4,
}

function Frame({ label, code, meta }: { label: string; code: string; meta: string }) {
  return (
    <>
      <path
        d="M16 28 L16 16 L40 16 M384 16 L384 28 M16 212 L16 224 L40 224 M384 224 L384 212"
        style={frameStyle}
      />
      <g style={whisper}>
        <line x1="200" y1="14" x2="200" y2="20" />
        <line x1="200" y1="220" x2="200" y2="226" />
        <line x1="14" y1="120" x2="20" y2="120" />
        <line x1="380" y1="120" x2="386" y2="120" />
      </g>
      <text x="32" y="26" style={{ ...monoStyle, fontSize: 4, opacity: 0.55 }}>
        {code}
      </text>
      <text x="368" y="26" textAnchor="end" style={{ ...monoStyle, fontSize: 4, opacity: 0.45 }}>
        {meta}
      </text>
      <text
        x="200"
        y="232"
        textAnchor="middle"
        style={{
          ...serifStyle,
          fontSize: 7,
          letterSpacing: '0.32em',
          opacity: 0.5,
          textTransform: 'uppercase',
          fontWeight: 500,
        }}
      >
        {label}
      </text>
    </>
  )
}

function OrbitingAmbient({
  cx,
  cy,
  rx,
  ry,
  duration = 8,
  delay = 0,
  direction = 1,
}: {
  cx: number
  cy: number
  rx: number
  ry: number
  duration?: number
  delay?: number
  direction?: 1 | -1
}) {
  const pathD = `M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 ${direction > 0 ? 1 : 0} ${cx + rx} ${cy} A ${rx} ${ry} 0 1 ${direction > 0 ? 1 : 0} ${cx - rx} ${cy}`
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} style={whisper} />
      <circle
        r="1.6"
        style={{
          fill: 'var(--gateway-red)',
          stroke: 'none',
          offsetPath: `path('${pathD}')`,
          animation: `case-visual-travel ${duration}s linear infinite`,
          animationDelay: `-${delay}s`,
        }}
        className="case-visual__travel"
      />
    </g>
  )
}

function Sparkline({
  points,
  y,
  x = 56,
  width = 288,
  markerIndex = -1,
}: {
  points: number[]
  y: number
  x?: number
  width?: number
  markerIndex?: number
}) {
  const stepX = width / (points.length - 1)
  const d = points
    .map((p, i) => {
      const px = x + i * stepX
      const py = y - p
      return `${i === 0 ? 'M' : 'L'} ${px.toFixed(2)} ${py.toFixed(2)}`
    })
    .join(' ')
  const fillD = `${d} L ${x + width} ${y} L ${x} ${y} Z`
  return (
    <g>
      <path d={d} style={red} className="case-visual__trend" />
      <path d={fillD} style={{ fill: 'var(--gateway-red)', stroke: 'none' }} className="case-visual__trend" />
      {points.map((p, i) => (
        <circle
          key={i}
          cx={x + i * stepX}
          cy={y - p}
          r={i === markerIndex ? 3 : 1.6}
          style={i === markerIndex ? redFill : { fill: 'var(--gateway-red)', stroke: 'none', opacity: 0.8 }}
        />
      ))}
    </g>
  )
}

/* ---------- 01 — WEB PLATFORMS: "Signal Stream" ---------- *
 * A row of radiating transmission arcs, a frequency band of
 * oscillating bars (audio waveform), and a streaming data dot
 * that travels left → right. A big "∞" suggests perpetual
 * uptime / scalable delivery.
 */
function WebArt(): ReactElement {
  const bars = [12, 22, 36, 50, 64, 50, 38, 56, 72, 60, 44, 28, 40, 56, 68, 50, 32, 22, 38, 50]
  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid meet" aria-hidden="true" className="case-visual__svg">
      <Frame label="01 · Signal Stream" code="SKILL / WEB-01" meta="04 CHANNELS" />

      {/* Soft horizontal grid */}
      <g style={whisper}>
        {[60, 100, 140, 180].map((y) => (
          <line key={y} x1="48" y1={y} x2="352" y2={y} />
        ))}
      </g>

      {/* Transmission arc (top) */}
      <g style={faint}>
        <path d="M 60 84 Q 200 36, 340 84" className="case-visual__trend" />
      </g>
      <g style={red}>
        <path d="M 60 84 Q 130 56, 200 50" className="case-visual__trend" />
        <path d="M 200 50 Q 270 56, 340 84" className="case-visual__trend" />
      </g>

      {/* Waveform bars */}
      <g>
        {bars.map((h, i) => {
          const x = 60 + i * 14
          const y = 132 - h / 2
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width="6"
              height={h}
              style={{
                fill: i === 4 || i === 14 ? 'var(--gateway-red)' : 'currentColor',
                opacity: i === 4 || i === 14 ? 0.95 : 0.45,
                stroke: 'none',
                transformOrigin: `center ${132}px`,
                transformBox: 'fill-box',
                animation: `case-visual-float 1.${i % 5 + 2}s ease-in-out infinite`,
                animationDelay: `${(i % 6) * 0.12}s`,
              }}
            />
          )
        })}
      </g>

      {/* Transmission tower / pole on the right */}
      <g style={stroke}>
        <line x1="332" y1="60" x2="332" y2="170" />
        <line x1="324" y1="76" x2="340" y2="76" />
        <line x1="320" y1="92" x2="344" y2="92" />
        <line x1="316" y1="112" x2="348" y2="112" />
        <circle cx="332" cy="58" r="3" style={redFill} className="case-visual__pulse" />
      </g>
      <g>
        {[1, 2, 3].map((ring) => (
          <ellipse
            key={ring}
            cx="332"
            cy="58"
            rx={ring * 14}
            ry={ring * 5}
            style={{ ...faint, opacity: 0.1 + (4 - ring) * 0.05 }}
            className="case-visual__ping"
          />
        ))}
      </g>

      {/* Big infinity / cycle mark (typographic anchor) */}
      <text
        x="200"
        y="100"
        textAnchor="middle"
        style={{ ...serifStyle, fontSize: 36, fontWeight: 500, fill: 'var(--gateway-red)', opacity: 0.85 }}
      >
        ∞
      </text>
      <text
        x="200"
        y="180"
        textAnchor="middle"
        style={{ ...monoStyle, fontSize: 4, opacity: 0.55 }}
      >
        UPTIME · 99.9%
      </text>

      {/* Streaming dot at base */}
      <circle
        r="2.6"
        style={{
          fill: 'var(--gateway-red)',
          stroke: 'none',
          offsetPath: `path('M60 196 L340 196')`,
          animation: 'case-visual-travel 2.8s linear infinite',
        }}
        className="case-visual__travel"
      />
    </svg>
  )
}

/* ---------- 02 — CUSTOM SOFTWARE: "Logic Mesh" ---------- *
 * A network of decision-gate nodes connected by bezier edges.
 * Each node is a small square or circle; packets travel along
 * the edges. Big typographic "{ }" as the design anchor.
 */
function SoftwareArt(): ReactElement {
  const nodes = [
    { x: 60, y: 100, type: 'square' },
    { x: 60, y: 168, type: 'square' },
    { x: 200, y: 134, type: 'diamond' },
    { x: 340, y: 100, type: 'square' },
    { x: 340, y: 168, type: 'square' },
  ]
  const edges = [
    { from: 0, to: 2, cp: [110, 84] },
    { from: 1, to: 2, cp: [110, 184] },
    { from: 2, to: 3, cp: [290, 84] },
    { from: 2, to: 4, cp: [290, 184] },
    { from: 0, to: 1, cp: [40, 134] },
    { from: 3, to: 4, cp: [360, 134] },
  ]
  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid meet" aria-hidden="true" className="case-visual__svg">
      <Frame label="02 · Logic Mesh" code="SKILL / SOFT-02" meta="06 EDGES" />

      {/* Bezier edges */}
      {edges.map((e, i) => {
        const a = nodes[e.from]
        const b = nodes[e.to]
        const [cpx, cpy] = e.cp
        const d = `M ${a.x} ${a.y} Q ${cpx} ${cpy}, ${b.x} ${b.y}`
        return (
          <g key={i}>
            <path d={d} style={faint} className="case-visual__link" />
            <circle
              r="1.8"
              style={{
                fill: 'var(--gateway-red)',
                stroke: 'none',
                offsetPath: `path('${d}')`,
                animation: `case-visual-travel 3.${i + 1}s linear infinite`,
                animationDelay: `-${i * 0.5}s`,
              }}
              className="case-visual__travel"
            />
          </g>
        )
      })}

      {/* Nodes */}
      {nodes.map((n, i) => {
        const isHub = i === 2
        return (
          <g key={i}>
            {n.type === 'diamond' ? (
              <g>
                <circle cx={n.x} cy={n.y} r="14" style={whisper} className="case-visual__ping" />
                <path
                  d={`M ${n.x} ${n.y - 9} L ${n.x + 9} ${n.y} L ${n.x} ${n.y + 9} L ${n.x - 9} ${n.y} Z`}
                  style={{ ...red, strokeWidth: 1.4 }}
                />
                <circle cx={n.x} cy={n.y} r="2.4" style={redFill} className="case-visual__pulse" />
              </g>
            ) : (
              <g>
                <rect x={n.x - 8} y={n.y - 8} width="16" height="16" style={{ ...stroke, opacity: 0.7 }} />
                <circle cx={n.x} cy={n.y} r="2" style={redFill} className="case-visual__pulse" />
              </g>
            )}
            {isHub ? null : (
              <text
                x={n.x}
                y={n.y + 22}
                textAnchor="middle"
                style={{ ...monoStyle, fontSize: 3.5, opacity: 0.55 }}
              >
                {`N-0${i + 1}`}
              </text>
            )}
          </g>
        )
      })}

      {/* Big { } anchor */}
      <text
        x="200"
        y="58"
        textAnchor="middle"
        style={{ ...serifStyle, fontSize: 24, fontWeight: 500, fill: 'var(--gateway-red)', letterSpacing: '-0.04em' }}
      >
        { '{ }' }
      </text>

      {/* EKG across the bottom */}
      <path
        d="M40 200 L100 200 L108 192 L116 208 L124 200 L180 200 L188 188 L196 200 L220 200 L228 192 L236 208 L244 200 L300 200 L308 188 L316 200 L360 200"
        style={red}
        className="case-visual__trend"
      />
    </svg>
  )
}

/* ---------- 03 — UI/UX: "Compositional Field" ---------- *
 * A precise measurement grid with a single card centered,
 * its corners anchored, and a typographic specimen
 * (Aa) showing letterform construction. Big "Aa" anchor.
 */
function UiArt(): ReactElement {
  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid meet" aria-hidden="true" className="case-visual__svg">
      <Frame label="03 · Compositional Field" code="SKILL / UI-03" meta="TOKENS · 12" />

      {/* 8px grid backdrop */}
      <g style={whisper}>
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 36} y1="40" x2={i * 36} y2="200" />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={`h${i}`} x1="36" y1={40 + i * 40} x2="364" y2={40 + i * 40} />
        ))}
      </g>

      {/* Centered card with anchors */}
      <g>
        <rect x="120" y="60" width="160" height="120" rx="3" style={stroke} />

        {/* Anchor corner crosshairs */}
        <g style={red}>
          <line x1="116" y1="56" x2="124" y2="56" />
          <line x1="120" y1="52" x2="120" y2="60" />
          <line x1="276" y1="56" x2="284" y2="56" />
          <line x1="280" y1="52" x2="280" y2="60" />
          <line x1="116" y1="184" x2="124" y2="184" />
          <line x1="120" y1="180" x2="120" y2="188" />
          <line x1="276" y1="184" x2="284" y2="184" />
          <line x1="280" y1="180" x2="280" y2="188" />
        </g>

        {/* Anchor points */}
        <g style={redFill}>
          <circle cx="120" cy="60" r="2.2" className="case-visual__pulse" />
          <circle cx="280" cy="60" r="2.2" className="case-visual__pulse" style={{ animationDelay: '0.4s' }} />
          <circle cx="280" cy="180" r="2.2" className="case-visual__pulse" style={{ animationDelay: '0.8s' }} />
          <circle cx="120" cy="180" r="2.2" className="case-visual__pulse" style={{ animationDelay: '1.2s' }} />
        </g>

        {/* Card internal skeleton */}
        <g style={faint}>
          <line x1="132" y1="76" x2="200" y2="76" />
          <line x1="132" y1="84" x2="184" y2="84" />
          <line x1="132" y1="96" x2="268" y2="96" />
          <rect x="132" y="104" width="136" height="20" rx="1" />
          <rect x="132" y="132" width="64" height="36" rx="1" />
          <rect x="204" y="132" width="64" height="36" rx="1" />
        </g>
        <rect x="136" y="108" width="60" height="2" style={redFill} />
      </g>

      {/* Measurement bars */}
      <g style={red}>
        <line x1="120" y1="50" x2="280" y2="50" />
        <line x1="120" y1="46" x2="120" y2="54" />
        <line x1="280" y1="46" x2="280" y2="54" />

        <line x1="110" y1="60" x2="110" y2="180" />
        <line x1="106" y1="60" x2="114" y2="60" />
        <line x1="106" y1="180" x2="114" y2="180" />
      </g>
      <text
        x="200"
        y="46"
        textAnchor="middle"
        style={{ ...monoStyle, fontSize: 4, fill: 'var(--gateway-red)', opacity: 1 }}
      >
        160
      </text>
      <text
        x="98"
        y="120"
        textAnchor="middle"
        transform="rotate(-90 98 120)"
        style={{ ...monoStyle, fontSize: 4, fill: 'var(--gateway-red)', opacity: 1 }}
      >
        120
      </text>

      {/* Big "Aa" specimen anchor */}
      <text
        x="200"
        y="146"
        textAnchor="middle"
        style={{ ...serifStyle, fontSize: 56, fontWeight: 500, fill: 'var(--gateway-red)', opacity: 0.95 }}
      >
        Aa
      </text>

      {/* Color tokens row */}
      <g>
        {[
          { x: 64, c: '#c9342e' },
          { x: 96, c: '#191817' },
          { x: 128, c: '#716d67' },
          { x: 160, c: '#f0e9df' },
        ].map((t) => (
          <g key={t.x}>
            <rect x={t.x} y="194" width="20" height="14" rx="1" style={{ fill: t.c, stroke: 'currentColor', opacity: 0.85, strokeWidth: 0.5 }} />
            <text
              x={t.x + 10}
              y="218"
              textAnchor="middle"
              style={{ ...monoStyle, fontSize: 3, opacity: 0.5 }}
            >
              {t.c.replace('#', '').toUpperCase()}
            </text>
          </g>
        ))}
        <rect x="64" y="194" width="124" height="14" rx="1" style={{ fill: 'none', stroke: 'currentColor', strokeDasharray: '2 2', opacity: 0.2 }} />
      </g>

      {/* Right side label "SCALE / 1:1" */}
      <text
        x="280"
        y="218"
        textAnchor="end"
        style={{ ...monoStyle, fontSize: 3.5, opacity: 0.5 }}
      >
        SCALE · 1:1
      </text>
    </svg>
  )
}

/* ---------- 04 — AUTOMATION: "Pulse Stream" ---------- *
 * A streaming EKG backbone with three cascading waterfall
 * bars above (high / med / low frequency), and a big +24/7
 * typographic anchor suggesting perpetual automation.
 */
function AutoArt(): ReactElement {
  const waterfall1 = [10, 18, 8, 22, 14, 28, 20, 16, 30, 24, 18, 32]
  const waterfall2 = [8, 12, 16, 10, 18, 14, 20, 12, 16, 22, 14, 18]
  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid meet" aria-hidden="true" className="case-visual__svg">
      <Frame label="04 · Pulse Stream" code="SKILL / AUTO-04" meta="24/7 LIVE" />

      {/* Top waterfall band */}
      <g>
        {waterfall1.map((h, i) => {
          const x = 56 + i * 24
          return (
            <rect
              key={i}
              x={x}
              y={56 - h}
              width="14"
              height={h}
              style={{
                fill: i === 8 ? 'var(--gateway-red)' : 'currentColor',
                opacity: i === 8 ? 0.85 : 0.32,
                stroke: 'none',
                transformOrigin: `bottom`,
                transformBox: 'fill-box',
                animation: `case-visual-bar-rise 1.${i % 5 + 2}s ease-in-out infinite`,
                animationDelay: `${(i % 4) * 0.2}s`,
              }}
            />
          )
        })}
      </g>

      {/* Mid waterfall band */}
      <g>
        {waterfall2.map((h, i) => {
          const x = 56 + i * 24
          return (
            <rect
              key={i}
              x={x}
              y={104 - h}
              width="14"
              height={h}
              style={{
                fill: i === 4 ? 'var(--gateway-red)' : 'currentColor',
                opacity: i === 4 ? 0.85 : 0.25,
                stroke: 'none',
                transformOrigin: `bottom`,
                transformBox: 'fill-box',
                animation: `case-visual-bar-rise 1.${i % 5 + 2}s ease-in-out infinite`,
                animationDelay: `${(i % 3) * 0.25 + 0.1}s`,
              }}
            />
          )
        })}
      </g>

      {/* EKG backbone — the through-line */}
      <path
        d="M40 156 L80 156 L88 144 L96 168 L104 156 L120 156 L128 132 L136 180 L144 156 L200 156 L208 144 L216 168 L224 156 L240 156 L248 132 L256 180 L264 156 L320 156 L328 144 L336 168 L344 156 L360 156"
        style={red}
        className="case-visual__trend"
      />
      <circle
        r="3"
        style={{
          ...redFill,
          stroke: '#fff',
          strokeWidth: 0.6,
          offsetPath:
            "path('M40 156 L80 156 L88 144 L96 168 L104 156 L120 156 L128 132 L136 180 L144 156 L200 156 L208 144 L216 168 L224 156 L240 156 L248 132 L256 180 L264 156 L320 156 L328 144 L336 168 L344 156 L360 156')",
          animation: 'case-visual-travel 5s linear infinite',
        }}
        className="case-visual__travel"
      />

      {/* Big typographic anchor */}
      <text
        x="200"
        y="124"
        textAnchor="middle"
        style={{ ...serifStyle, fontSize: 26, fontWeight: 500, fill: 'var(--gateway-red)', letterSpacing: '-0.04em' }}
      >
        24/7
      </text>

      {/* Frequency labels */}
      <g style={{ ...monoStyle, fontSize: 3, opacity: 0.5 }}>
        <text x="40" y="50">HIGH</text>
        <text x="40" y="98">MID</text>
        <text x="40" y="148">PULSE</text>
      </g>

      {/* Ambient orbit (large) */}
      <OrbitingAmbient cx={200} cy={170} rx={120} ry={26} duration={13} />
    </svg>
  )
}

export default function SkillsVisual({ index }: SkillsVisualProps): ReactElement {
  switch (index % 4) {
    case 0:
      return <WebArt />
    case 1:
      return <SoftwareArt />
    case 2:
      return <UiArt />
    case 3:
    default:
      return <AutoArt />
  }
}
