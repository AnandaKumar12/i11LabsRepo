import React, { useMemo, useState } from 'react'
import { getCompanies, deleteCompany } from '../../services/companyService'
import CompanyTable from '../../components/tables/CompanyTable'
import Pagination from '../../components/tables/Pagination'
import { Company } from '../../types/Company'
import { useNavigate } from 'react-router-dom'

function usePagination<T>(items: T[], pageSize: number) {
  const [page, setPage] = useState(1)
  const total = Math.max(1, Math.ceil(items.length / pageSize))
  const paged = items.slice((page - 1) * pageSize, page * pageSize)
  return { page, setPage, total, paged }
}

export default function CompanyListPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [searchTriggered, setSearchTriggered] = useState(false)
  const companies = getCompanies()

  const filtered = useMemo(() => {
    if (!searchTriggered) return []
    if (!query.trim()) return companies

    const q = query.toLowerCase()
    return companies.filter(
      c =>
        c.name.toLowerCase().includes(q) ||
        c.registrationNumber?.toLowerCase().includes(q) ||
        c.primaryEmail?.toLowerCase().includes(q) ||
        c.primaryMobile?.toLowerCase().includes(q)
    )
  }, [companies, query, searchTriggered])

  const { page, setPage, total, paged } = usePagination<Company>(filtered, 5)

  const onEdit = (c: Company) => navigate(`/companies/edit/${c.id}`)
  const onDelete = (id: string) => {
    deleteCompany(id)
    navigate(0)
  }

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
            placeholder="Search by Company Name / Email / Mobile"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            className="p-2 border rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setSearchTriggered(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>
        {searchTriggered && (
          <button
            onClick={() => {
              setQuery("");
              setSearchTriggered(false);
              setPage(1);
            }}
            className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        )}



        {searchTriggered && (
          <p className="mb-2 text-sm text-gray-600">
            Showing {filtered.length} {filtered.length === 1 ? 'company' : 'companies'}
          </p>
        )}

        {searchTriggered && paged.length > 0 && (
          <>
            <CompanyTable
              items={paged}
              onEdit={onEdit}
              onDelete={onDelete}
              className="min-w-full divide-y divide-gray-200 rounded-lg shadow"
            />

            <Pagination
              page={page}
              total={total}
              onPrev={() => setPage(Math.max(1, page - 1))}
              onNext={() => setPage(Math.min(total, page + 1))}
              count={filtered.length}
            />
          </>
        )}

        {searchTriggered && filtered.length === 0 && (
          <p className="text-red-500 font-medium mt-4">No companies found.</p>
        )}
      </div>
    </div>
  )
}
