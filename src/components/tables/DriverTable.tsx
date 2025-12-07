import React from 'react'
import { Driver } from '../../types/Driver'

type Props = {
  items: Driver[]
  onEdit: (d: Driver) => void
  onDelete: (id: string) => void
  className?: string // optional for extra styling
}

export default function DriverTable({ items, onEdit, onDelete, className }: Props) {
  return (
    <div className={`space-y-2 ${className}`}>
      {items.map(d => (
        <div
          key={d.id}
          className="p-4 border rounded-lg flex justify-between items-start shadow hover:shadow-lg transition-shadow duration-200 bg-white"
        >
          <div>
            <div className="font-semibold text-gray-800">{d.firstName} {d.lastName}</div>
            <div className="text-sm text-gray-500">
              License: {d.licenseNumber || '-'} • Exp: {d.experienceYears ?? 0} yrs
            </div>
            <div className="text-sm text-gray-600">
              {d.city || ''}{d.state ? ', ' + d.state : ''} • {d.email || '-'} • {d.mobile || '-'}
            </div>
          </div>
          <div className="flex gap-2 mt-2 md:mt-0">
            <button
              onClick={() => onEdit(d)}
              className="px-3 py-1 rounded border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => { if (confirm('Delete driver?')) onDelete(d.id) }}
              className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
