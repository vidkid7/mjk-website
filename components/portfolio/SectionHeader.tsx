import FieldLabel from '@/components/portfolio/FieldLabel'

export default function SectionHeader({
  index,
  eyebrow,
  heading,
  className = '',
}: {
  index?: string
  eyebrow: string
  heading: string
  className?: string
}) {
  return (
    <div className={className}>
      <FieldLabel index={index} label={eyebrow} />
      <h2 className="mt-5 max-w-2xl font-fraunces text-3xl font-semibold leading-[1.08] tracking-[-0.02em] text-night-50 sm:text-4xl lg:text-5xl">
        {heading}
      </h2>
    </div>
  )
}
