import { List, Tabs, Image, Skeleton } from 'antd'
import { useEffect, useState } from 'react'
import { useGetAllTimetablesQuery } from '../../../../hooks/useGetAllTimetablesQuery'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export function Timetables() {
  const [id, setId] = useState(null)

  const { data: timetables, isLoading, isSuccess } = useGetAllTimetablesQuery()

  const items = timetables?.rows.map((item) => ({
    key: item.id,
    label: format(new Date(item.date), 'iiii (dd.MM.yyyy)', { locale: ru }),
  }))

  useEffect(() => {
    if (items && !id) {
      setId(items[0].key)
    }
  }, [items, id])

  const getFilteredTimetables = () => {
    const filteredTimetables = timetables?.rows.filter((item) => item.id === id)
    return filteredTimetables
  }

  const handleChange = (key) => {
    setId(key)
  }

  return (
    <>
      <Tabs items={items} onChange={handleChange} />
      {isLoading && <Skeleton active />}
      {isSuccess && (
        <List
          dataSource={getFilteredTimetables()}
          bordered
          renderItem={(item) => (
            <List.Item key={item.id}>
              <Image src={`${import.meta.env.VITE_BASE_URL}/${item.image}`} />
            </List.Item>
          )}
        />
      )}
    </>
  )
}
