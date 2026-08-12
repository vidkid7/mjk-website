'use client'

import { createElement, type ReactNode } from 'react'

type RevealTag = 'div' | 'li' | 'article' | 'section'

export default function Reveal({
  children,
  as = 'div',
  className = '',
}: {
  children: ReactNode
  as?: RevealTag
  delay?: number
  className?: string
  y?: number
  blur?: boolean
}) {
  return createElement(as, { className }, children)
}