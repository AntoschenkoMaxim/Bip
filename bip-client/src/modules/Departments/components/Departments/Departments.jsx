import { Avatar, Col, Divider, Drawer, Image, List, Row, Tabs, Tag } from 'antd'
import { intlFormatDistance } from 'date-fns'
import { useState } from 'react'
import { useGetAllDepartmentsQuery } from '../../../../hooks/useGetAllDepartmentsQuery'
import { TeacherDrawer } from '../TeacherDrawer/TeacherDrawer'

export function Departments() {
  const [id, setId] = useState()
  const [teacherId, setTeacherId] = useState()
  const [open, setOpen] = useState(false)

  const showDrawer = (id) => {
    setTeacherId(id)
    setOpen(true)
  }

  const { data: departments, isSuccess } = useGetAllDepartmentsQuery()

  const items = departments?.rows.map((item) => ({
    key: item.id,
    label: item.description,
  }))

  const func = () => {
    const lessons = departments?.rows
      .filter((item) => item.id === id)
      .map((item) => item.lessons)
      .flat()
    return lessons
  }

  const onChange = (key) => {
    setId(key)
  }

  return (
    <>
      <Tabs items={items} onChange={onChange} />
      {isSuccess && (
        <List
          dataSource={func()}
          bordered
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[
                <a
                  // onClick={() => showDrawer(item.teacherId)}
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
