import { cn } from '@/lib/utils'

export type GlassSurfaceVariant = 'panel' | 'inset' | 'action' | 'dark'

const glassSurfaceClasses: Record<GlassSurfaceVariant, string> = {
  panel: 'glass-panel',
  inset: 'glass-inset',
  action: 'glass-action',
  dark: 'admin-card',
}

export function glassSurfaceClass(variant: GlassSurfaceVariant, className?: string) {
  return cn(glassSurfaceClasses[variant], className)
}
