import React from 'react'

type Props = {
  label?: string
  value?: any
  type?: string
  onChange?: (v: any) => void
  placeholder?: string
  name?: string
}

export default function InputField({ label, value, type='text', onChange, placeholder }: Props) {
  return (
    <div>
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <input
        className="mt-1 block w-full rounded-md p-2 border"
        value={value ?? ''}
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  )
}
