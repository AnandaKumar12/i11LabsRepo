import React from 'react'
import { Company } from '../../types/Company'

type Props = {
  items: Company[]
  onEdit: (c: Company) => void
  onDelete: (id: string) => void
  className?: string // optional for custom styling
}

export default function CompanyTable({ items, onEdit, onDelete, className }: Props) {
  return (
    <div className={`space-y-2 ${className}`}>
      {items.map(c => ( //thsi will send my object to main screen
        <div
          key={c.id}
          className="p-4 border rounded-lg flex justify-between items-start shadow hover:shadow-lg transition-shadow duration-200 bg-white"
        >
          <div>
            <div className="font-semibold text-gray-800">{c.name}</div>
            <div className="text-sm text-gray-500">
              Reg#: {c.registrationNumber || '-'} • {c.city || ''}{c.state ? ', ' + c.state : ''}
            </div>
            <div className="text-sm text-gray-600">
              Contact: {c.primaryFirstName} {c.primaryLastName} • {c.primaryEmail || '-'}
            </div>
            <div className="text-sm text-gray-600">
              Mobile: {c.primaryMobile || '-'}
            </div>
          </div>
          <div className="flex gap-2 mt-2 md:mt-0">
            <button
              onClick={() => onEdit(c)}
              className="px-3 py-1 rounded border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => { if (confirm('Delete company?')) onDelete(c.id) }}
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
