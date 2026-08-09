type SignalPillProps = {
  label: string
  tone?: 'live' | 'warm' | 'quiet'
}

export default function SignalPill({ label, tone = 'live' }: SignalPillProps) {
  return (
    <span className={`signal-pill signal-pill--${tone}`}>
      <span className="signal-pill__dot" aria-hidden="true" />
      <span>{label}</span>
    </span>
  )
}
