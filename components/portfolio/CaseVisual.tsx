'use client'

import type { CSSProperties, ReactElement } from 'react'

type CaseVisualProps = {
  index: number
}

/* ============================================================
 * CaseVisual — "The Field Atlas"
 * Six original, abstract compositions that share a single
 * instrument-panel visual language: corner brackets, soft
 * grid backdrop, an EKG/wave backbone, an oversized serif
 * numeral as a typographic anchor, and ambient orbiting dots.
 * ============================================================ */

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

const W = 400
const H = 240

/**
 * Frame: corner brackets + soft inset border + tiny reticle marks.
 * Every composition uses this to feel like one instrument panel.
 */
function Frame({ label, code, meta }: { label: string; code: string; meta: string }) {
  return (
    <>
      <path
        d="M16 28 L16 16 L40 16 M384 16 L384 28 M16 212 L16 224 L40 224 M384 224 L384 212"
        style={frameStyle}
      />
      {/* inset reticle marks */}
      <g style={whisper}>
        <line x1="200" y1="14" x2="200" y2="20" />
        <line x1="200" y1="220" x2="200" y2="226" />
        <line x1="14" y1="120" x2="20" y2="120" />
        <line x1="380" y1="120" x2="386" y2="120" />
      </g>
      {/* code label top-left, meta top-right */}
      <text x="32" y="26" style={{ ...monoStyle, fontSize: 4, opacity: 0.55 }}>
        {code}
      </text>
      <text x="368" y="26" textAnchor="end" style={{ ...monoStyle, fontSize: 4, opacity: 0.45 }}>
        {meta}
      </text>
      {/* large label across bottom */}
      <text
        x="200"
        y="232"
        textAnchor="middle"
        style={{ ...serifStyle, fontSize: 7, letterSpacing: '0.32em', opacity: 0.5, textTransform: 'uppercase', fontWeight: 500 }}
      >
        {label}
      </text>
    </>
  )
}

/**
 * OrbitingAmbient: a faint dashed ellipse with a small bright dot.
 * The dot slowly traces the orbit.
 */
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

/**
 * Sparkline: a small data line with markers and a trailing fill.
 */
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
      <path d={fillD} style={{ ...redSoft, stroke: 'none', fill: 'var(--gateway-red)' }} className="case-visual__trend" />
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

/* ---------- 01 — GOVTECH: "CITIZEN SIGNAL" ---------- *
 * A vertical "transmission tower" with layered broadcast rings,
 * EKG backbone, and a document pulse rising into a final seal.
 */
function GovTechArt(): ReactElement {
  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid meet" aria-hidden="true" className="case-visual__svg">
      <Frame label="01 · Citizen Signal" code="FIELD / GOV-01" meta="ROUTE 06" />

      {/* Soft horizontal grid */}
      <g style={whisper}>
        {[60, 100, 140, 180].map((y) => (
          <line key={y} x1="48" y1={y} x2="352" y2={y} />
        ))}
      </g>

      {/* Vertical transmission axis */}
      <line x1="200" y1="44" x2="200" y2="206" style={faint} />

      {/* Broadcast rings (concentric arcs from axis) */}
      {[1, 2, 3, 4].map((ring) => (
        <g key={ring}>
          <ellipse
            cx="200"
            cy="180"
            rx={ring * 22}
            ry={ring * 6}
            style={{ ...faint, opacity: 0.1 + (5 - ring) * 0.05 }}
            className="case-visual__ping"
          />
        </g>
      ))}

      {/* Tower mast */}
      <g style={stroke}>
        <line x1="200" y1="60" x2="200" y2="200" />
        <line x1="190" y1="80" x2="210" y2="80" />
        <line x1="186" y1="105" x2="214" y2="105" />
        <line x1="180" y1="135" x2="220" y2="135" />
        <line x1="172" y1="170" x2="228" y2="170" />
        {/* crown */}
        <circle cx="200" cy="58" r="3" style={redFill} className="case-visual__pulse" />
      </g>

      {/* EKG backbone */}
      <path
        d="M48 196 L88 196 L96 188 L104 204 L112 196 L160 196 L168 178 L176 196 L200 196 L208 184 L216 196 L264 196 L272 188 L280 204 L288 196 L352 196"
        style={red}
        className="case-visual__trend"
      />

      {/* Six dispatch steps climbing the mast */}
      {[80, 105, 130, 155, 180, 200].map((y, i) => (
        <g key={y}>
          <circle
            cx="200"
            cy={y}
            r={i === 5 ? 4 : 2.6}
            style={i === 5 ? redFill : { ...redFill, opacity: 0.65 }}
            className="case-visual__pulse"
          />
          <line
            x1={i % 2 === 0 ? 200 : 200}
            y1={y}
            x2={i % 2 === 0 ? 240 : 160}
            y2={y}
            style={faint}
          />
          <text
            x={i % 2 === 0 ? 244 : 116}
            y={y + 1.5}
            textAnchor={i % 2 === 0 ? 'start' : 'end'}
            style={{ ...monoStyle, fontSize: 3.5, opacity: 0.55 }}
          >
            {`STEP · 0${i + 1}`}
          </text>
        </g>
      ))}

      {/* Final seal */}
      <g style={red}>
        <rect x="232" y="42" width="44" height="14" rx="1" className="case-visual__stamp" />
        <text
          x="254"
          y="52"
          textAnchor="middle"
          style={{ ...monoStyle, fontSize: 5, fill: 'var(--gateway-red)', letterSpacing: '0.3em' }}
        >
          SEALED
        </text>
      </g>

      {/* Ambient particle */}
      <OrbitingAmbient cx={120} cy={120} rx={70} ry={36} duration={11} />
    </svg>
  )
}

/* ---------- 02 — DATA: "FIELD TOPOGRAPHY" ---------- *
 * Concentric contour rings like a survey map, with depth shadings,
 * a north arrow, a depth sound, and an orbital "scan" sweep.
 */
function DataArt(): ReactElement {
  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid meet" aria-hidden="true" className="case-visual__svg">
      <Frame label="02 · Field Topography" code="FIELD / DATA-02" meta="7 PLOTS" />

      {/* Concentric contour ellipses */}
      {[10, 26, 44, 64, 86].map((rx, i) => (
        <ellipse
          key={rx}
          cx="200"
          cy="128"
          rx={rx * 1.6}
          ry={rx * 0.7}
          style={{
            ...stroke,
            opacity: 0.12 + i * 0.07,
            strokeDasharray: i % 2 === 0 ? '0' : '2 3',
          }}
        />
      ))}

      {/* Depth cross marks (lat/lon) */}
      <g style={whisper}>
        <line x1="40" y1="128" x2="360" y2="128" />
        <line x1="200" y1="40" x2="200" y2="216" />
      </g>

      {/* North arrow */}
      <g style={stroke}>
        <line x1="56" y1="48" x2="56" y2="76" />
        <path d="M50 60 L56 50 L62 60 Z" style={redFill} />
        <text x="60" y="52" style={{ ...monoStyle, fontSize: 4, opacity: 0.6 }}>N</text>
      </g>

      {/* Depth profile bar (bottom) */}
      <g style={stroke}>
        <rect x="48" y="196" width="304" height="10" rx="1" />
        <line x1="120" y1="196" x2="120" y2="206" style={faint} />
        <line x1="200" y1="196" x2="200" y2="206" style={faint} />
        <line x1="280" y1="196" x2="280" y2="206" style={faint} />
        <text x="48" y="218" style={{ ...monoStyle, fontSize: 3.5, opacity: 0.5 }}>DEPTH</text>
        <text x="356" y="218" textAnchor="end" style={{ ...monoStyle, fontSize: 3.5, opacity: 0.5 }}>YIELD</text>
      </g>

      {/* The depth bar (gradient via red rect) */}
      <rect x="48" y="196" width="304" height="10" rx="1" style={{ ...redSoft, stroke: 'none' }} />
      <rect x="120" y="196" width="80" height="10" style={{ fill: 'var(--gateway-red)', stroke: 'none', opacity: 0.7 }} />
      <line x1="200" y1="194" x2="200" y2="208" style={red} />

      {/* Big serif "+18%" as typographic anchor */}
      <text
        x="200"
        y="120"
        textAnchor="middle"
        style={{ ...serifStyle, fontSize: 36, fontWeight: 500, fill: 'var(--gateway-red)', opacity: 0.85 }}
      >
        +18%
      </text>
      <text
        x="200"
        y="156"
        textAnchor="middle"
        style={{ ...monoStyle, fontSize: 4, opacity: 0.55 }}
      >
        YIELD TREND · 30 D
      </text>

      {/* Sparkline accent under big number */}
      <Sparkline points={[6, 12, 9, 18, 14, 24, 22, 32]} y={180} x={80} width={240} markerIndex={7} />

      {/* Orbital particle (slow) */}
      <OrbitingAmbient cx={200} cy={128} rx={120} ry={70} duration={14} />
    </svg>
  )
}

/* ---------- 03 — EDUCATION: "KNOWLEDGE CONSTELLATION" ---------- *
 * A network of nodes (people ↔ courses ↔ outcomes) connected by
 * Bezier lines, with traveling signal packets along the edges.
 */
function EducationArt(): ReactElement {
  const left = [56, 92, 128, 164, 200].map((x) => ({ x, y: 60 + (x % 80) }))
  const right = [200, 236, 272, 308, 344].map((x) => ({ x, y: 180 - (x % 60) }))
  const center = { x: 200, y: 128 }
  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid meet" aria-hidden="true" className="case-visual__svg">
      <Frame label="03 · Knowledge Constellation" code="FIELD / EDU-03" meta="06 RECORDS" />

      {/* Bezier edges (left → center → right) */}
      {left.map((p, i) => {
        const cp1x = (p.x + center.x) / 2
        const cp1y = p.y
        const cp2x = cp1x
        const cp2y = center.y
        const d = `M ${p.x} ${p.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${center.x} ${center.y}`
        return (
          <g key={`l${i}`}>
            <path d={d} style={faint} className="case-visual__link" />
            <circle
              r="1.6"
              style={{
                fill: 'var(--gateway-red)',
                stroke: 'none',
                offsetPath: `path('${d}')`,
                animation: `case-visual-travel 4.${i}s linear infinite`,
              }}
              className="case-visual__travel"
            />
          </g>
        )
      })}
      {right.map((p, i) => {
        const cp1x = (center.x + p.x) / 2
        const cp1y = center.y
        const cp2x = cp1x
        const cp2y = p.y
        const d = `M ${center.x} ${center.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p.x} ${p.y}`
        return (
          <g key={`r${i}`}>
            <path d={d} style={faint} className="case-visual__link" />
            <circle
              r="1.6"
              style={{
                fill: 'var(--gateway-red)',
                stroke: 'none',
                offsetPath: `path('${d}')`,
                animation: `case-visual-travel 4.${i + 3}s linear infinite`,
              }}
              className="case-visual__travel"
            />
          </g>
        )
      })}

      {/* Left nodes (people) */}
      {left.map((p, i) => (
        <g key={`ln${i}`}>
          <circle cx={p.x} cy={p.y} r="6" style={{ ...stroke, opacity: 0.6 }} />
          <circle cx={p.x} cy={p.y} r="2" style={redFill} className="case-visual__pulse" />
          <text
            x={p.x}
            y={p.y + 18}
            textAnchor="middle"
            style={{ ...monoStyle, fontSize: 3.5, opacity: 0.55 }}
          >
            {`S-0${i + 1}`}
          </text>
        </g>
      ))}

      {/* Right nodes (outcomes) */}
      {right.map((p, i) => (
        <g key={`rn${i}`}>
          <rect x={p.x - 6} y={p.y - 6} width="12" height="12" style={{ ...stroke, opacity: 0.6 }} />
          <line x1={p.x - 4} y1={p.y - 1} x2={p.x + 4} y2={-1} />
          <line x1={p.x - 4} y1={p.y + 3} x2={p.x + 2} y2={3} style={red} />
          <text
            x={p.x}
            y={p.y + 18}
            textAnchor="middle"
            style={{ ...monoStyle, fontSize: 3.5, opacity: 0.55 }}
          >
            {`O-0${i + 1}`}
          </text>
        </g>
      ))}

      {/* Central hub */}
      <g>
        <circle cx={center.x} cy={center.y} r="22" style={whisper} className="case-visual__ping" />
        <circle cx={center.x} cy={center.y} r="14" style={whisper} className="case-visual__ping" />
        <circle cx={center.x} cy={center.y} r="9" style={{ ...red, strokeWidth: 1.4 }} />
        <circle cx={center.x} cy={center.y} r="3" style={redFill} className="case-visual__pulse" />
      </g>

      {/* Big "06" as the typographic anchor */}
      <text
        x="200"
        y="48"
        textAnchor="middle"
        style={{ ...serifStyle, fontSize: 14, fontWeight: 500, fill: 'var(--gateway-red)', letterSpacing: '-0.04em' }}
      >
        06
      </text>
      <text x="200" y="58" textAnchor="middle" style={{ ...monoStyle, fontSize: 3.5, opacity: 0.5 }}>
        SYNCED
      </text>
    </svg>
  )
}

/* ---------- 04 — BUSINESS: "LEDGER HORIZON" ---------- *
 * A horizontal "horizon line" with currency columns rising
 * like a city skyline, a receipt strip running through them,
 * and a TOTAL sun rising on the right.
 */
function BusinessArt(): ReactElement {
  const bars = [
    { x: 56, h: 28, val: 0.4 },
    { x: 92, h: 44, val: 0.6 },
    { x: 128, h: 36, val: 0.5 },
    { x: 164, h: 60, val: 0.8 },
    { x: 200, h: 50, val: 0.7 },
  ]
  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid meet" aria-hidden="true" className="case-visual__svg">
      <Frame label="04 · Ledger Horizon" code="FIELD / BIZ-04" meta="NPR · 7D" />

      {/* Horizon line */}
      <line x1="40" y1="170" x2="360" y2="170" style={faint} />

      {/* Tick marks on horizon */}
      <g style={faint}>
        {[56, 92, 128, 164, 200, 240, 280, 320].map((x) => (
          <line key={x} x1={x} y1="170" x2={x} y2="174" />
        ))}
      </g>

      {/* Currency columns (rising like a skyline) */}
      {bars.map((b, i) => (
        <g key={b.x} className="case-visual__float" style={{ animationDelay: `${i * 0.3}s` }}>
          <rect
            x={b.x}
            y={170 - b.h}
            width="22"
            height={b.h}
            style={i === 3 ? red : { ...stroke, fill: 'rgba(0,0,0,0.04)' }}
          />
          <text
            x={b.x + 11}
            y={170 - b.h - 4}
            textAnchor="middle"
            style={{
              ...serifStyle,
              fontSize: 5,
              fontWeight: 500,
              fill: i === 3 ? 'var(--gateway-red)' : 'currentColor',
            }}
          >
            ${(b.val * 100).toFixed(0)}
          </text>
        </g>
      ))}

      {/* Receipt strip running through middle */}
      <g style={faint}>
        <line x1="40" y1="118" x2="360" y2="118" />
        <line x1="40" y1="124" x2="360" y2="124" />
      </g>
      <text x="200" y="116" textAnchor="middle" style={{ ...monoStyle, fontSize: 3.5, opacity: 0.5 }}>
        ─── RECEIPT ───
      </text>

      {/* Sun (total) on the right */}
      <g>
        <circle cx="312" cy="100" r="36" style={whisper} className="case-visual__ping" />
        <circle cx="312" cy="100" r="22" style={{ ...red, strokeWidth: 1.2 }} />
        <circle cx="312" cy="100" r="14" style={redSoft} />
        <text
          x="312"
          y="98"
          textAnchor="middle"
          style={{ ...serifStyle, fontSize: 13, fontWeight: 500, fill: 'var(--gateway-red)' }}
        >
          $
        </text>
        <text
          x="312"
          y="112"
          textAnchor="middle"
          style={{ ...monoStyle, fontSize: 4, fill: 'currentColor', opacity: 0.7 }}
        >
          12,480
        </text>
      </g>

      {/* Big serif "12.4K" as typographic anchor on the right */}
      <text
        x="312"
        y="200"
        textAnchor="middle"
        style={{ ...serifStyle, fontSize: 18, fontWeight: 500, letterSpacing: '-0.04em', fill: 'var(--gateway-red)' }}
      >
        12.4K
      </text>
      <text x="312" y="212" textAnchor="middle" style={{ ...monoStyle, fontSize: 3.5, opacity: 0.55 }}>
        RECONCILED
      </text>

      {/* Beam from sun to last column */}
      <line x1="290" y1="100" x2="222" y2="110" style={redGlow} />

      {/* EKG across the bottom */}
      <path
        d="M40 222 L80 222 L88 214 L96 230 L104 222 L160 222 L168 210 L176 222 L200 222 L208 218 L216 222 L260 222 L268 210 L276 222 L320 222 L328 214 L336 230 L344 222 L360 222"
        style={red}
        className="case-visual__trend"
      />
    </svg>
  )
}

/* ---------- 05 — RETAIL: "SHELF STREAM" ---------- *
 * Vertical "shelves" of product silhouettes, with a scan
 * laser sweeping through them, accumulating into a single
 * totalized beam on the right.
 */
function RetailArt(): ReactElement {
  const shelves = [
    { y: 60, h: 40 },
    { y: 112, h: 32 },
    { y: 158, h: 24 },
  ]
  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid meet" aria-hidden="true" className="case-visual__svg">
      <Frame label="05 · Shelf Stream" code="FIELD / POS-05" meta="06 SKU" />

      {/* Three horizontal shelves with products */}
      {shelves.map((s, i) => (
        <g key={s.y}>
          <line x1="40" y1={s.y + s.h} x2="248" y2={s.y + s.h} style={faint} />
          {/* product silhouettes */}
          {[0, 1, 2, 3, 4].map((p) => {
            const x = 48 + p * 38
            const hh = 8 + ((p * 7 + i * 5) % s.h)
            return (
              <rect
                key={p}
                x={x}
                y={s.y + s.h - hh}
                width="28"
                height={hh}
                style={{ ...stroke, opacity: 0.45 }}
                className="case-visual__float"
              />
            )
          })}
        </g>
      ))}

      {/* Scan beam (vertical line) */}
      <line x1="248" y1="48" x2="248" y2="194" style={redGlow} className="case-visual__scanline" />

      {/* To the right: a "stream" of dot tokens being collected */}
      <g>
        {[60, 84, 108, 132, 156, 180].map((y, i) => (
          <g key={y}>
            <line
              x1="248"
              y1={y}
              x2="296"
              y2={y}
              style={{ ...red, opacity: 0.6 }}
              className="case-visual__route"
            />
            <circle
              cx="296"
              cy={y}
              r={3 + (i % 2) * 1.5}
              style={{ ...redSoft }}
              className="case-visual__ping"
            />
          </g>
        ))}
      </g>

      {/* Totaling beaker (right) */}
      <g style={stroke}>
        <path d="M328 60 L328 200 L368 200 L368 60" />
        <line x1="324" y1="60" x2="372" y2="60" style={red} />
        <path
          d="M328 130 Q 348 122, 368 130 L 368 198 L 328 198 Z"
          style={{ fill: 'var(--gateway-red)', stroke: 'none', opacity: 0.5 }}
          className="case-visual__total"
        />
        {/* Measurement ticks */}
        <g style={faint}>
          <line x1="368" y1="90" x2="372" y2="90" />
          <line x1="368" y1="120" x2="372" y2="120" />
          <line x1="368" y1="150" x2="372" y2="150" />
          <line x1="368" y1="180" x2="372" y2="180" />
        </g>
      </g>

      {/* Big serif "$48" anchor */}
      <text
        x="200"
        y="218"
        textAnchor="middle"
        style={{ ...serifStyle, fontSize: 16, fontWeight: 500, letterSpacing: '-0.04em', fill: 'var(--gateway-red)' }}
      >
        $48 · SCAN SETTLED
      </text>
    </svg>
  )
}

/* ---------- 06 — DOCUMENT: "ROOT MEMORY" ---------- *
 * A tree of file leaves branching outward, a search beam
 * illuminating a single match, and a circular "memory
 * ring" showing the query resolving.
 */
function DocumentArt(): ReactElement {
  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid meet" aria-hidden="true" className="case-visual__svg">
      <Frame label="06 · Root Memory" code="FIELD / DOC-06" meta="247 IDX" />

      {/* Concentric memory rings (right) */}
      <g>
        {[40, 56, 72, 88].map((r, i) => (
          <circle
            key={r}
            cx="312"
            cy="128"
            r={r}
            style={{
              ...stroke,
              opacity: 0.12 + i * 0.06,
              strokeDasharray: i === 0 ? '0' : '3 4',
            }}
          />
        ))}
        <circle cx="312" cy="128" r="6" style={red} />
        <circle cx="312" cy="128" r="2" style={redFill} className="case-visual__pulse" />
      </g>

      {/* Trunk (left) */}
      <line x1="64" y1="40" x2="64" y2="200" style={faint} className="case-visual__tree" />
      <circle cx="64" cy="40" r="4" style={redFill} className="case-visual__pulse" />
      <circle cx="64" cy="200" r="2" style={{ fill: 'currentColor', opacity: 0.6 }} />

      {/* Branches (curved lines fanning out) */}
      {[
        { y: 64, len: 80, up: true },
        { y: 100, len: 100, up: true },
        { y: 136, len: 90, up: false },
        { y: 168, len: 70, up: false },
      ].map((b, i) => {
        const cpY = b.up ? b.y - 24 : b.y + 24
        const d = `M 64 ${b.y} C 110 ${cpY}, 150 ${cpY}, ${64 + b.len} ${b.y}`
        return (
          <g key={b.y}>
            <path d={d} style={faint} className="case-visual__tree" />
            <circle
              cx={64 + b.len}
              cy={b.y}
              r="3"
              style={i === 1 ? redFill : { ...redFill, opacity: 0.6 }}
              className="case-visual__pulse"
            />
            {/* A "file leaf" at the tip */}
            <rect
              x={64 + b.len + 6}
              y={b.y - 6}
              width="36"
              height="12"
              rx="1"
              style={{ ...stroke, opacity: 0.45 }}
            />
            <line
              x1={64 + b.len + 10}
              y1={b.y}
              x2={64 + b.len + 38}
              y2={b.y}
              style={faint}
            />
          </g>
        )
      })}

      {/* Connector from one branch to the memory ring */}
      <g>
        <path
          d="M180 100 C 230 100, 250 116, 270 128"
          style={redGlow}
          className="case-visual__link"
        />
        <circle
          r="1.6"
          style={{
            fill: 'var(--gateway-red)',
            stroke: 'none',
            offsetPath: `path('M180 100 C 230 100, 250 116, 270 128')`,
            animation: 'case-visual-travel 3s linear infinite',
          }}
          className="case-visual__travel"
        />
      </g>

      {/* Search query line at bottom */}
      <g style={stroke}>
        <line x1="40" y1="216" x2="170" y2="216" />
        <text x="40" y="212" style={{ ...monoStyle, fontSize: 4, opacity: 0.6 }}>QUERY</text>
        <line x1="180" y1="216" x2="220" y2="216" style={red} className="case-visual__cursor" />
        <text x="40" y="226" style={{ ...monoStyle, fontSize: 3.5, opacity: 0.5 }}>EVIDENCE</text>
        <line x1="180" y1="226" x2="252" y2="226" style={faint} />
      </g>

      {/* Big serif "247 → 1" anchor */}
      <text
        x="200"
        y="60"
        textAnchor="middle"
        style={{ ...serifStyle, fontSize: 18, fontWeight: 500, letterSpacing: '-0.04em', fill: 'var(--gateway-red)' }}
      >
        247 → 1
      </text>
      <text x="200" y="72" textAnchor="middle" style={{ ...monoStyle, fontSize: 3.5, opacity: 0.55 }}>
        RESOLVED
      </text>
    </svg>
  )
}

export default function CaseVisual({ index }: CaseVisualProps): ReactElement {
  switch (index % 6) {
    case 0:
      return <GovTechArt />
    case 1:
      return <DataArt />
    case 2:
      return <EducationArt />
    case 3:
      return <BusinessArt />
    case 4:
      return <RetailArt />
    case 5:
    default:
      return <DocumentArt />
  }
}
