type SignalPillProps = {
  label: string
  tone?: 'live' | 'warm' | 'quiet'
  href?: string
}

export default function SignalPill({ label, tone = 'live', href }: SignalPillProps) {
  const content = (
    <>
      <span className="signal-pill__dot" aria-hidden="true" />
      <span>{label}</span>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`signal-pill signal-pill--${tone}`}
        aria-label={label}
      >
        {content}
      </a>
    )
  }

  return (
    <span className={`signal-pill signal-pill--${tone}`}>
      {content}
    </span>
  )
}
