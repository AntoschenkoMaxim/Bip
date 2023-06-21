import { useState, useMemo, useEffect } from 'react'
import useDebounce from './useDebounce'

const useListSearch = (initialData) => {
  const [searchText, setSearchText] = useState('')
  const [data, setData] = useState(initialData)
  const debouncedSearchText = useDebounce(searchText, 300)

  useEffect(() => {
    setData(initialData)
  }, [initialData])

  const filteredData = useMemo(() => {
    if (!debouncedSearchText || !data) {
      return data || []
    }

    const lowerCaseSearchText = debouncedSearchText.toLowerCase()
    return data.filter((item) =>
      item.title.toLowerCase().includes(lowerCaseSearchText)
    )
  }, [data, debouncedSearchText])

  const handleSearch = (value) => {
    setSearchText(value)
  }

  return { searchText, handleSearch, filteredData }
}

export default useListSearch
