import { useState, useEffect } from 'react'

type SetValue<T> = (value: T) => void
type UseLocalStorageResult<T> = [T | undefined, SetValue<T>]

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): UseLocalStorageResult<T> {
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item === null || item === undefined) {
        return undefined
      }
      return JSON.parse(item) as T
    } catch (error) {
      console.error(error)
      return undefined
    }
  })

  useEffect(() => {
    if (storedValue === undefined) {
      window.localStorage.removeItem(key)
    } else {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue))
      } catch (error) {
        console.error(error)
        window.localStorage.removeItem(key)
      }
    }
  }, [key, storedValue])

  return [storedValue ?? initialValue, setStoredValue]
}
