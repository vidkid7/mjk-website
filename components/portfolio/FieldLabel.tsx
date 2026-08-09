type FieldLabelProps = {
  index?: string
  label: string
  detail?: string
}

export default function FieldLabel({ index, label, detail }: FieldLabelProps) {
  return (
    <div className="field-label" aria-label={detail ? `${label}: ${detail}` : label}>
      {index && <span className="field-label__index">{index}</span>}
      <span className="field-label__name">{label}</span>
      {detail && <span className="field-label__detail">{detail}</span>}
    </div>
  )
}
