import React, { useEffect, useState } from 'react'
import { Driver } from '../../types/Driver'
import InputField from './InputField'
import { save, load } from '../../services/storage'

type Props = {
  initial?: Partial<Driver>
  onSave: (d: Driver) => void
  onCancel?: () => void
}

const uid = () => Math.random().toString(36).slice(2, 9)

const nameRegex = /^[A-Za-z]{2,}$/
const mobileRegex = /^[6-9][0-9]{9}$/

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
const cityStateRegex = /^[A-Za-z\s]+$/
const zipRegex = /^[0-9]{5,6}$/

export default function DriverForm({ initial, onSave, onCancel }: Props) {
  const [form, setForm] = useState<Partial<Driver>>(initial || {})

  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [mobileError, setMobileError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [dobError, setDobError] = useState('')
  const [licenseError, setLicenseError] = useState('')
  const [experienceError, setExperienceError] = useState('')
  const [zipError, setZipError] = useState('')
  const [cityError, setCityError] = useState('')
  const [stateError, setStateError] = useState('')

  useEffect(() => setForm(initial || {}), [initial])

  const change = (k: keyof Driver, v: any) =>
    setForm(s => ({ ...s, [k]: v }))


  const submit = (e?: React.FormEvent) => {
    e?.preventDefault()
    let hasError = false


    if (!form.firstName?.trim()) {
      setFirstNameError("First Name is required")
      hasError = true
    } else if (!nameRegex.test(form.firstName.trim())) {
      setFirstNameError("Enter valid First Name (letters only, min 2)")
      hasError = true
    } else setFirstNameError("")

    if (!form.mobile?.trim()) {
      setMobileError("Mobile Number is required")
      hasError = true
    } else if (!mobileRegex.test(form.mobile.trim())) {
      setMobileError("Enter valid 10-digit Indian mobile number")
      hasError = true
    } else setMobileError("")


    if (form.email && !emailRegex.test(form.email)) {
      setEmailError("Enter valid email")
      hasError = true
    } else setEmailError("")

    if (form.dob) {
      const today = new Date().toISOString().split("T")[0]
      if (form.dob >= today) {
        setDobError("DOB must be a past date")
        hasError = true
      } else setDobError("")
    }

    if (form.licenseNumber && form.licenseNumber.length < 5) {
      setLicenseError("License number must be at least 5 characters")
      hasError = true
    } else setLicenseError("")

    if (form.experienceYears && (form.experienceYears < 0 || form.experienceYears > 60)) {
      setExperienceError("Experience must be between 0 - 60 years")
      hasError = true
    } else setExperienceError("")

    if (form.city && !cityStateRegex.test(form.city)) {
      setCityError("City must contain letters only")
      hasError = true
    } else setCityError("")

    if (form.state && !cityStateRegex.test(form.state)) {
      setStateError("State must contain letters only")
      hasError = true
    } else setStateError("")

    if (form.zip && !zipRegex.test(form.zip)) {
      setZipError("Zip must be 5 or 6 digits")
      hasError = true
    } else setZipError("")

    if (hasError) return

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

    const list: Driver[] = load('drivers') || []

    const duplicate = list.find(
      d => d.mobile === driver.mobile && d.id !== driver.id
    )

    if (duplicate) {
      alert("A driver with this mobile already exists!")
      return
    }

    const idx = list.findIndex(d => d.id === driver.id)
    if (idx >= 0) list[idx] = driver
    else list.unshift(driver)

    save('drivers', list)
    alert("Driver saved successfully!")
    onSave(driver)
  }


  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <InputField label="First Name *" value={form.firstName}
            onChange={(v) => { change('firstName', v); setFirstNameError(""); }} />
          {firstNameError && <p className="text-red-600 text-sm">{firstNameError}</p>}
        </div>

        <div>
          <InputField label="Last Name" value={form.lastName}
            onChange={(v) => { change('lastName', v); setLastNameError(""); }} />
          {lastNameError && <p className="text-red-600 text-sm">{lastNameError}</p>}
        </div>

        <div>
          <InputField label="Email" type="email" value={form.email}
            onChange={(v) => { change('email', v); setEmailError(""); }} />
          {emailError && <p className="text-red-600 text-sm">{emailError}</p>}
        </div>

        <div>
          <InputField label="Mobile *" value={form.mobile}
            onChange={(v) => { change('mobile', v); setMobileError(""); }} />
          {mobileError && <p className="text-red-600 text-sm">{mobileError}</p>}
        </div>

        <div>
          <InputField
            label="Date of Birth (DD/MM/YYYY)"
            type="text"
            value={form.dob ?? ""}
            onChange={(v) => {
              if (/^[0-9/]*$/.test(v)) {
                change("dob", v);
              }
            }}
            placeholder="DD/MM/YYYY"
          />
          {dobError && (
            <p className="text-red-600 text-sm mt-1">{dobError}</p>
          )}
        </div>

        <div>
          <InputField label="License" value={form.licenseNumber}
            onChange={(v) => { change('licenseNumber', v); setLicenseError(""); }} />
          {licenseError && <p className="text-red-600 text-sm">{licenseError}</p>}
        </div>

        <div>
          <InputField
            label="Experience"
            type="text"
            value={form.experienceYears ?? ""}
            onChange={(v) => {

              if (/^[0-9]*$/.test(v)) {
                change("experienceYears", v === "" ? undefined : v);
              }
              setExperienceError("");
            }}
          />
          {experienceError && (
            <p className="text-red-600 text-sm">{experienceError}</p>
          )}
        </div>

        <InputField label="Address 1" value={form.address1} onChange={v => change('address1', v)} />
        <InputField label="Address 2" value={form.address2} onChange={v => change('address2', v)} />

        <div>
          <InputField label="City" value={form.city}
            onChange={(v) => { change('city', v); setCityError(""); }} />
          {cityError && <p className="text-red-600 text-sm">{cityError}</p>}
        </div>

        <div>
          <InputField label="State" value={form.state}
            onChange={(v) => { change('state', v); setStateError(""); }} />
          {stateError && <p className="text-red-600 text-sm">{stateError}</p>}
        </div>

        <div>
          <InputField
            label="Zip Code"
            type="text"
            value={form.zip ?? ""}
            onChange={(v) => {
              if (/^[0-9]*$/.test(v)) {
                change("zip", v === "" ? undefined : v);
              }
            }}

          />
        </div>
      </div>

      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
          Save
        </button>
        <button type="button" className="px-4 py-2 border rounded"
          onClick={() => onCancel?.()}>
          Cancel
        </button>
      </div>
    </form>
  )
}
