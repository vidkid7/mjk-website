import { cn } from '@/lib/utils'

type LiquidBackdropProps = {
  variant?: 'public' | 'admin'
  className?: string
}

export function LiquidBackdrop({ variant = 'public', className }: LiquidBackdropProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('liquid-backdrop', `liquid-backdrop--${variant}`, className)}
    >
      <span className="liquid-blob liquid-blob--crimson pointer-events-none" />
      <span className="liquid-blob liquid-blob--gold pointer-events-none" />
      <span className="liquid-blob liquid-blob--blue pointer-events-none" />
      <span className="liquid-grain pointer-events-none" />
    </div>
  )
}
