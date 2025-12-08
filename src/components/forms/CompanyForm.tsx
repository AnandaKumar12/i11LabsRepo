import React, { useEffect, useState } from 'react'
import { Company } from '../../types/Company'
import InputField from './InputField'
import { save, load } from '../../services/storage'

type Props = {
  initial?: Partial<Company>
  onSave: (c: Company) => void
  onCancel?: () => void
}

const uid = () => Math.random().toString(36).slice(2, 9)

export default function CompanyForm({ initial, onSave, onCancel }: Props) {
  const [form, setForm] = useState<Partial<Company>>(initial || {})
  const [errors, setErrors] = useState<{ [k: string]: string }>({})

  useEffect(() => setForm(initial || {}), [initial])

  const change = (k: keyof Company, v: any) => {
    setForm(s => ({ ...s, [k]: v }))

    setErrors(prev => ({ ...prev, [k]: '' }))
  }

  const validate = () => {
    let e: any = {}

    if (!form.name?.trim()) e.name = "Company name is required"
    if (!form.registrationNumber?.trim()) e.registrationNumber = "Registration No. is required"

    if (form.primaryEmail && form.primaryEmail.trim() !== "") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.primaryEmail)) {
        e.primaryEmail = "Invalid email"
      }
    }

    if (form.primaryMobile && form.primaryMobile.trim() !== "") {
      if (!/^[0-9+ -]{7,15}$/.test(form.primaryMobile)) {
        e.primaryMobile = "Mobile number must be 7–15 digits, + or - allowed"
      }
    }

    if (form.zip && form.zip.trim() !== "") {
      if (!/^[0-9]+$/.test(form.zip)) {
        e.zip = "Zip must be numeric"
      }
    }

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!validate()) return

    const company: Company = {
      id: form.id || uid(),
      name: form.name!,
      establishedOn: form.establishedOn || '',
      registrationNumber: form.registrationNumber!,
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

    const existing: Company[] = load('companies') || []

    const duplicate = existing.find(
      c => c.registrationNumber === company.registrationNumber && c.id !== company.id
    )
    if (duplicate) {
      alert('A company with this Registration Number already exists!')
      return
    }

    const index = existing.findIndex(c => c.id === company.id)
    if (index >= 0) existing[index] = company
    else existing.unshift(company)

    save('companies', existing)
    alert('Company saved successfully!')
    onSave(company)
    setForm({})
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <InputField
            label="Company Name *"
            value={form.name}
            onChange={v => change('name', v)}
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <InputField
            label="Established On"
            type="date"
            value={form.establishedOn}
            onChange={v => change('establishedOn', v)}
          />
        </div>

        <div>
          <InputField
            label="Registration Number *"
            value={form.registrationNumber}
            onChange={v => change('registrationNumber', v)}
          />
          {errors.registrationNumber && (
            <p className="text-red-600 text-sm mt-1">{errors.registrationNumber}</p>
          )}
        </div>

        <div>
          <InputField
            label="Primary Contact First Name"
            type="text"
            value={form.primaryFirstName ?? ""}
            onChange={(v) => {
              if (/^[A-Za-z\s]*$/.test(v)) {
                change("primaryFirstName", v)
              }
            }}
          />
          {errors.primaryFirstName && <p className="text-red-600 text-sm mt-1">{errors.primaryFirstName}</p>}
        </div>

        <div>
          <InputField
            label="Primary Contact Last Name"
            type="text"
            value={form.primaryLastName ?? ""}
            onChange={(v) => {
              if (/^[A-Za-z\s]*$/.test(v)) {
                change("primaryLastName", v)
              }
            }}
          />
          {errors.primaryLastName && <p className="text-red-600 text-sm mt-1">{errors.primaryLastName}</p>}
        </div>

        <div>
          <InputField
            label="Website"
            value={form.website}
            onChange={v => change('website', v)}
          />
          {errors.website && <p className="text-red-600 text-sm mt-1">{errors.website}</p>}
        </div>

        <div>
          <InputField
            label="Address 1"
            value={form.address1}
            onChange={v => change('address1', v)}
          />
        </div>

        <div>
          <InputField
            label="Address 2"
            value={form.address2}
            onChange={v => change('address2', v)}
          />
        </div>

        <div>
          <InputField
            label="City"
            value={form.city}
            onChange={v => change('city', v)}
          />
        </div>

        <div>
          <InputField
            label="State"
            value={form.state}
            onChange={v => change('state', v)}
          />
        </div>

        <div>
          <InputField
            label="Zip Code"
            type="text"
            value={form.zip ?? ""}
            onChange={(v) => {
              if (/^[0-9]*$/.test(v)) change("zip", v === "" ? undefined : v)
            }}
          />
          {errors.zip && <p className="text-red-600 text-sm mt-1">{errors.zip}</p>}
        </div>

        <div>
          <InputField
            label="Primary Contact Email"
            type="email"
            value={form.primaryEmail}
            onChange={v => change('primaryEmail', v)}
          />
          {errors.primaryEmail && <p className="text-red-600 text-sm mt-1">{errors.primaryEmail}</p>}
        </div>

        <div>
          <InputField
            label="Primary Contact Mobile"
            type="text"
            value={form.primaryMobile ?? ""}
            onChange={(v) => {
              if (/^[0-9+ -]*$/.test(v)) change("primaryMobile", v)
            }}
          />
          {errors.primaryMobile && <p className="text-red-600 text-sm mt-1">{errors.primaryMobile}</p>}
        </div>

      </div>

      <div className="flex gap-3 mt-4">
        <button type="submit" className="px-4 py-2 rounded bg-green-600 text-white">
          Save
        </button>
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
