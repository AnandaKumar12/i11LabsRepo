import { Driver } from '../types/Driver'
import { save, load } from './storage'

const KEY = 'drivers_v1'

export const getDrivers = (): Driver[] => load(KEY) || []

export const upsertDriver = (driver: Driver) => {
  const list = getDrivers()
  const exists = list.findIndex(d => d.id === driver.id)
  if (exists >= 0) list[exists] = driver
  else list.unshift(driver)
  save(KEY, list)
  return list
}

export const deleteDriver = (id: string) => {
  const list = getDrivers().filter(d => d.id !== id)
  save(KEY, list)
  return list
}
