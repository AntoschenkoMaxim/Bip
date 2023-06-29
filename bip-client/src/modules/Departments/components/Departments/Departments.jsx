import { List, Tabs } from 'antd'
import { useEffect, useState } from 'react'
import { useGetAllDepartmentsQuery } from '../../../../hooks/useGetAllDepartmentsQuery'
import { TeacherDrawer } from '../TeacherDrawer/TeacherDrawer'

export function Departments() {
  const [id, setId] = useState(null)
  const [teacherId, setTeacherId] = useState()
  const [open, setOpen] = useState(false)

  const { data: departments, isSuccess } = useGetAllDepartmentsQuery()

  const items = departments?.rows.map((item) => ({
    key: item.id,
    label: item.description,
  }))

  useEffect(() => {
    if (items && !id) {
      setId(items[0].key)
    }
  }, [items, id])

  const getFilteredLessons = () => {
    const filteredLessons = departments?.rows
      .filter((item) => item.id === id)
      .flatMap((item) => item.lessons)
    return filteredLessons
  }

  const handleChange = (key) => {
    setId(key)
  }

  const showDrawer = (id) => {
    setTeacherId(id)
    setOpen(true)
  }

  return (
    <>
      <Tabs items={items} onChange={handleChange} />
      {isSuccess && (
        <List
          dataSource={getFilteredLessons()}
          bordered
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[
                <a
                  onClick={() => showDrawer(item.teacherId)}
                  key={`a-${item.id}`}
                >
                  Дополнительно
                </a>,
              ]}
            >
              <List.Item.Meta
                title={item.description}
                description={item.description}
              />
            </List.Item>
          )}
        />
      )}
      <TeacherDrawer
        teacherId={teacherId}
        setTeacherId={setTeacherId}
        open={open}
        setOpen={setOpen}
      />
    </>
  )
}
