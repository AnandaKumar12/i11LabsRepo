import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import CompanyListPage from '../pages/company/CompanyListPage'
import CompanyEntryPage from '../pages/company/CompanyEntryPage'
import DriverListPage from '../pages/driver/DriverListPage'
import DriverEntryPage from '../pages/driver/DriverEntryPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/companies' replace />} />
      <Route path='/companies' element={<CompanyListPage />} />
      <Route path='/companies/new' element={<CompanyEntryPage />} />
      <Route path='/companies/edit/:id' element={<CompanyEntryPage />} />
      <Route path='/drivers' element={<DriverListPage />} />
      <Route path='/drivers/new' element={<DriverEntryPage />} />
      <Route path='/drivers/edit/:id' element={<DriverEntryPage />} />
    </Routes>
  )
}
