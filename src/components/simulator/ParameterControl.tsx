import { useId } from 'react'

interface ParameterControlProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  unit: string
  onChange: (value: number) => void
}

export default function ParameterControl({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: ParameterControlProps) {
  const id = useId()

  return (
    <div className="parameter-control">
      <div className="parameter-control-heading">
        <label htmlFor={id}>{label}</label>

        <output htmlFor={id}>
          {value.toLocaleString()}
          {' '}
          <span>{unit}</span>
        </output>
      </div>

      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={`${value} ${unit}`}
        onChange={(event) =>
          onChange(Number(event.target.value))
        }
      />

      <div className="parameter-control-bounds">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  )
}
