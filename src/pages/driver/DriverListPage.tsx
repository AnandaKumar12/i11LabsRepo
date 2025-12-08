import React, { useMemo, useState } from 'react'
import { getDrivers, deleteDriver } from '../../services/driverService'
import { Driver } from '../../types/Driver'
import { useNavigate } from 'react-router-dom'
import Pagination from '../../components/tables/Pagination'
import DriverTable from '../../components/tables/DriverTable'

function usePagination<T>(items: T[], pageSize: number) {
  const [page, setPage] = useState(1)
  const total = Math.max(1, Math.ceil(items.length / pageSize))
  const paged = items.slice((page - 1) * pageSize, page * pageSize)
  return { page, setPage, total, paged }
}

export default function DriverListPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [searchTriggered, setSearchTriggered] = useState(false)
  const drivers = getDrivers()

  const filtered = useMemo(() => {
    if (!searchTriggered) return []
    if (!query.trim()) return drivers
    const q = query.toLowerCase()
    return drivers.filter(d =>
      d.firstName.toLowerCase().includes(q) ||
      d.lastName?.toLowerCase().includes(q) ||
      d.email?.toLowerCase().includes(q) ||
      d.mobile?.toLowerCase().includes(q)
    )
  }, [drivers, query, searchTriggered])

  const { page, setPage, total, paged } = usePagination<Driver>(filtered, 5)

  const onEdit = (d: Driver) => navigate(`/drivers/edit/${d.id}`)
  const onDelete = (id: string) => { deleteDriver(id); navigate(0) }

  const handleQueryChange = (value: string) => {
    setQuery(value)
    if (!value.trim()) setSearchTriggered(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Search by Name / Email / Mobile"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            className="p-2 border rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setSearchTriggered(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>

        {searchTriggered && (
          <button
            type="button"
            onClick={() => {
              setQuery("")
              setSearchTriggered(false)
              setPage(1)
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition mb-4"
          >
            Cancel
          </button>
        )}

        {searchTriggered && (
          <p className="mb-2 text-sm text-gray-600">
            Showing {filtered.length} {filtered.length === 1 ? 'driver' : 'drivers'}
          </p>
        )}

        {searchTriggered && paged.length > 0 && (
          <>
            <DriverTable items={paged} onEdit={onEdit} onDelete={onDelete} className="mb-4" />

            <Pagination
              page={page}
              total={total}
              onPrev={() => setPage(Math.max(1, page - 1))}
              onNext={() => setPage(Math.min(total, page + 1))}
              count={filtered.length}
            />
          </>
        )}

      </div>
    </div>
  )
}
