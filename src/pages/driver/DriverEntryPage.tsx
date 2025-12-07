import React, { useState } from 'react'
import DriverForm from '../../components/forms/DriverForm'
import { upsertDriver, getDrivers } from '../../services/driverService'
import { useNavigate, useParams } from 'react-router-dom'

export default function DriverEntryPage() {
  const navigate = useNavigate()
  const params = useParams()
  const drivers = getDrivers()

  const [selectedDriver, setSelectedDriver] = useState<any | null>(null)

  const editing = params.id
    ? drivers.find(d => d.id === params.id)
    : selectedDriver || undefined

  const handleSave = (d: any) => {
    upsertDriver(d)
    navigate('/drivers')
  }
const handleSearchByMobile = (mobile: string) => {
  if (!mobile.trim()) return alert("Please enter a mobile number") // ✅ mandatory for search
  const found = drivers.find(d => d.mobile === mobile)
  if (!found) return alert("No driver found with that mobile number")
  setSelectedDriver(found)
}

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{editing ? 'Edit Driver' : 'Add Driver'}</h2>
      <DriverForm
        initial={editing}
        onSave={handleSave}
        onCancel={() => navigate('/drivers')}
        // Only pass search prop when you want search (e.g., editing/search page)
        onSearchMobile={params.id ? handleSearchByMobile : undefined}
      />
    </div>
  )
}
