'use client'
import { motion } from 'framer-motion'
import { buttonHover } from '@/lib/animations'
import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  icon?: React.ReactNode
}

export function Button({ children, variant = 'primary', size = 'md', className = '', onClick, type = 'button', disabled, icon }: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 gap-2'
  
  const variants = {
    primary: 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm hover:shadow-md',
    secondary: 'bg-crimson text-white hover:bg-crimson-dark shadow-sm hover:shadow-md',
    ghost: 'border border-slate-200 text-slate-700 hover:bg-slate-50',
    gold: 'bg-amber-500 text-white hover:bg-amber-600 shadow-sm hover:shadow-md',
    outline: 'border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  }

  return (
    <motion.button
      {...buttonHover}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.button>
  )
}
