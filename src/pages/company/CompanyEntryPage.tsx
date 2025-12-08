import React, { useState } from 'react'
import CompanyForm from '../../components/forms/CompanyForm'
import { upsertCompany, getCompanies } from '../../services/companyService'
import { useNavigate, useParams } from 'react-router-dom'

export default function CompanyEntryPage() {
  const navigate = useNavigate()
  const params = useParams()
  const companies = getCompanies()

  const [selectedCompany, setSelectedCompany] = useState<any | null>(null)

  const editing = params.id
    ? companies.find(c => c.id === params.id)
    : selectedCompany || undefined

  const handleSave = (c: any) => {
    upsertCompany(c)
    navigate('/companies')
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        {editing ? 'Edit Company' : 'Add Company'}
      </h2>
      <CompanyForm
        initial={editing}
        onSave={handleSave}
        onCancel={() => navigate('/companies')}
      />
    </div>
  )
}
