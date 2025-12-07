import { Company } from '../types/Company'
import { save, load } from './storage'

const KEY = 'companies_v1'

export const getCompanies = (): Company[] => load(KEY) || []

export const upsertCompany = (company: Company) => {
  const list = getCompanies()
  const exists = list.findIndex(c => c.id === company.id)
  if (exists >= 0) list[exists] = company
  else list.unshift(company)
  save(KEY, list)
  return list
}

export const deleteCompany = (id: string) => {
  const list = getCompanies().filter(c => c.id !== id)
  save(KEY, list)
  return list
}
