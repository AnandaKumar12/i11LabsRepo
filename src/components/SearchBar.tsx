import React from 'react'

export default function SearchBar({ value, onChange, placeholder }: { value: string, onChange: (v: string)=>void, placeholder?: string }) {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 border rounded w-full"
    />
  )
}
