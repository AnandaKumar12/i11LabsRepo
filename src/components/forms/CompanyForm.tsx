import React, { useEffect, useState } from 'react'
import { Company } from '../../types/Company'
import InputField from './InputField'

type Props = {
  initial?: Partial<Company>
  onSave: (c: Company) => void
  onCancel?: () => void
  onSearchMobile?: (mobile: string) => void
}

const uid = () => Math.random().toString(36).slice(2, 9)

export default function CompanyForm({ initial, onSave, onCancel, onSearchMobile }: Props) {
  const [form, setForm] = useState<Partial<Company>>(initial || {})
  // const [searchMobile, setSearchMobile] = useState('')
  const [regError, setRegError] = useState('')
  const [companyError, setCompanyError] = useState('')


  useEffect(() => setForm(initial || {}), [initial])

  const change = (k: keyof Company, v: any) =>
    setForm(s => ({ ...s, [k]: v }))

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault()

    if (!form.name || form.name.trim() === '') {
      setCompanyError("Company name is required")
      return
    }
    setCompanyError("")

    if (!form.registrationNumber || form.registrationNumber.trim() === '') {
      setRegError("Registration Number is required")
      return
    }
    setRegError("")

    const company: Company = {
      id: (form.id as string) || uid(),
      name: (form.name || '').trim(),
      establishedOn: form.establishedOn || '',
      registrationNumber: form.registrationNumber || '',
      website: form.website || '',
      address1: form.address1 || '',
      address2: form.address2 || '',
      city: form.city || '',
      state: form.state || '',
      zip: form.zip || '',
      primaryFirstName: form.primaryFirstName || '',
      primaryLastName: form.primaryLastName || '',
      primaryEmail: form.primaryEmail || '',
      primaryMobile: form.primaryMobile || '',
    }

    onSave(company)
    setForm({})
  }

  return (
    <form onSubmit={submit} className="space-y-4">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <InputField
            label="Company Name *"
            value={form.name}
            onChange={(v) => {
              change('name', v)
              if (v.trim() !== "") setCompanyError("")
            }}
          />
          {companyError && (
            <p className="text-red-600 text-sm mt-1">{companyError}</p>
          )}
        </div>
        <InputField label="Established On" type="date" value={form.establishedOn} onChange={v => change('establishedOn', v)} />


        <div>
          <InputField
            label="Registration Number *"
            value={form.registrationNumber}
            onChange={(v) => {
              change('registrationNumber', v)
              if (v.trim() !== "") setRegError("")
            }}
          />
          {regError && (
            <p className="text-red-600 text-sm mt-1">{regError}</p>
          )}
        </div>

        <InputField label="Website" value={form.website} onChange={v => change('website', v)} />
        <InputField label="Primary Contact Mobile" value={form.primaryMobile} onChange={v => change('primaryMobile', v)} />
        <InputField label="Primary Contact First Name" value={form.primaryFirstName} onChange={v => change('primaryFirstName', v)} />
        <InputField label="Primary Contact Last Name" value={form.primaryLastName} onChange={v => change('primaryLastName', v)} />
        <InputField label="Address 1" value={form.address1} onChange={v => change('address1', v)} />
        <InputField label="Address 2" value={form.address2} onChange={v => change('address2', v)} />
        <InputField label="City" value={form.city} onChange={v => change('city', v)} />
        <InputField label="State" value={form.state} onChange={v => change('state', v)} />
        <InputField label="Zip Code" value={form.zip} onChange={v => change('zip', v)} />
        <InputField label="Primary Contact Email" type="email" value={form.primaryEmail} onChange={v => change('primaryEmail', v)} />
      </div>

      <div className="flex gap-2">
        <button className="px-4 py-2 rounded bg-green-600 text-white">Save</button>
        <button
          type="button"
          onClick={() => { setForm({}); onCancel?.(); }}
          className="px-4 py-2 rounded border"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
