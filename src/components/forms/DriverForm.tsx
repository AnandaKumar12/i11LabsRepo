import React, { useEffect, useState } from 'react'
import { Driver } from '../../types/Driver'
import InputField from './InputField'

type Props = {
  initial?: Partial<Driver>
  onSave: (d: Driver) => void
  onCancel?: () => void
}

const uid = () => Math.random().toString(36).slice(2, 9)

export default function DriverForm({ initial, onSave, onCancel }: Props) {
  const [form, setForm] = useState<Partial<Driver>>(initial || {})

  // Field-level error states
  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [mobileError, setMobileError] = useState('')

  useEffect(() => setForm(initial || {}), [initial])

  const change = (k: keyof Driver, v: any) =>
    setForm(s => ({ ...s, [k]: v }))

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault()

    // First Name Validation
    if (!form.firstName?.trim()) {
      setFirstNameError("First Name is required")
      return
    }
    setFirstNameError("")

    // Last Name Validation
    if (!form.lastName?.trim()) {
      setLastNameError("Last Name is required")
      return
    }
    setLastNameError("")

    // Mobile Validation
    if (!form.mobile?.trim()) {
      setMobileError("Mobile Number is required")
      return
    }
    setMobileError("")

    const driver: Driver = {
      id: form.id || uid(),
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: (form.email || '').trim(),
      mobile: form.mobile.trim(),
      dob: form.dob || '',
      licenseNumber: (form.licenseNumber || '').trim(),
      experienceYears: form.experienceYears || 0,
      address1: (form.address1 || '').trim(),
      address2: (form.address2 || '').trim(),
      city: (form.city || '').trim(),
      state: (form.state || '').trim(),
      zip: (form.zip || '').trim(),
    }

    onSave(driver)
    setForm(initial || {}) // reset form
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* First Name */}
        <div>
          <InputField
            label="First Name *"
            value={form.firstName}
            onChange={(v) => {
              change('firstName', v)
              if (v.trim() !== '') setFirstNameError("")
            }}
          />
          {firstNameError && <p className="text-red-600 text-sm mt-1">{firstNameError}</p>}
        </div>

        {/* Last Name */}
        <div>
          <InputField
            label="Last Name *"
            value={form.lastName}
            onChange={(v) => {
              change('lastName', v)
              if (v.trim() !== '') setLastNameError("")
            }}
          />
          {lastNameError && <p className="text-red-600 text-sm mt-1">{lastNameError}</p>}
        </div>

        {/* Email */}
        <InputField label="Email" type="email" value={form.email} onChange={v => change('email', v)} />

        {/* Mobile */}
        <div>
          <InputField
            label="Mobile *"
            value={form.mobile}
            onChange={(v) => {
              change('mobile', v)
              if (v.trim() !== '') setMobileError("")
            }}
          />
          {mobileError && <p className="text-red-600 text-sm mt-1">{mobileError}</p>}
        </div>

        <InputField label="Date of Birth" type="date" value={form.dob} onChange={v => change('dob', v)} />
        <InputField label="License #" value={form.licenseNumber} onChange={v => change('licenseNumber', v)} />
        <InputField label="Experience (yrs)" type="number" value={form.experienceYears} onChange={v => change('experienceYears', Number(v))} />
        <InputField label="Address 1" value={form.address1} onChange={v => change('address1', v)} />
        <InputField label="Address 2" value={form.address2} onChange={v => change('address2', v)} />
        <InputField label="City" value={form.city} onChange={v => change('city', v)} />
        <InputField label="State" value={form.state} onChange={v => change('state', v)} />
        <InputField label="Zip" value={form.zip} onChange={v => change('zip', v)} />
      </div>

      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 rounded bg-green-600 text-white">Save</button>
        <button type="button" onClick={() => { setForm(initial || {}); onCancel?.() }} className="px-4 py-2 rounded border">Cancel</button>
      </div>
    </form>
  )
}
