import { Badge, Popconfirm, Space, Table, Tag } from 'antd'
import { useState } from 'react'
import { UpdateTeacherForm } from '../UpdateTeacherForm/UpdateTeacherForm'
import { useGetAllTeachersQuery } from '../../../../hooks/useGetAllTeachersQuery'
import { useRemoveTeacherByIdQuery } from '../../hooks/useRemoveTeacherByIdQuery'
import { useTableFilterAndSearch } from '../../../../hooks/useTableFilterAndSearch'
import { ActionsColumn } from '../../../../components'

export function TeachersTable() {
  const { getColumnSearchProps } = useTableFilterAndSearch()
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Фамилия',
      dataIndex: 'lastName',
      key: 'lastName',
      ...getColumnSearchProps('lastName', 'фамилии'),
    },
    {
      title: 'Имя',
      dataIndex: 'firstName',
      key: 'firstName',
      ...getColumnSearchProps('firstName', 'имени'),
    },
    {
      title: 'Отчество',
      dataIndex: 'surname',
      key: 'surname',
      ...getColumnSearchProps('surname', 'отчеству'),
    },
    {
      title: 'Должность',
      dataIndex: 'role',
      key: 'role',
      ...getColumnSearchProps('role', 'должности'),
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
      ...getColumnSearchProps('phone', 'телефону'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email', 'email'),
    },
    {
      title: 'Телеграм',
      dataIndex: 'telegram',
      key: 'telegram',
      ...getColumnSearchProps('telegram', 'telegram'),
    },
    {
      title: 'Предметы',
      dataIndex: 'lessons',
      key: 'lessons',
      render: (_, { lessons }) => (
        <>
          {lessons.length ? (
            lessons.map((lesson) => {
              return (
                <Tag color='geekblue' key={lesson.value}>
                  {lesson.description.toUpperCase()}
                </Tag>
              )
            })
          ) : (
            <Tag color='volcano'>НЕТ ПРЕДМЕТОВ</Tag>
          )}
        </>
      ),
    },
    {
      title: 'Действия',
      dataIndex: 'operations',
      key: 'operations',
      render: (_, record) =>
        teachers?.rows.length >= 1 ? (
          <ActionsColumn
            record={record}
            removeItem={removeTeacher}
            showModal={showModal}
          />
        ) : null,
    },
  ]

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [id, setId] = useState(null)

  const showModal = (id) => {
    setId(id)
    setIsModalOpen(true)
  }

  const { data: teachers, isSuccess } = useGetAllTeachersQuery()

  const { mutate: removeTeacher } = useRemoveTeacherByIdQuery()

  return (
    <>
      <UpdateTeacherForm
        id={id}
        setId={setId}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      {isSuccess && (
        <Badge count={teachers?.count} color='blue'>
          <Table
            tableLayout='fixed'
            columns={columns}
            dataSource={teachers?.rows}
            pagination={{
              defaultPageSize: '5',
              showSizeChanger: true,
              pageSizeOptions: [5, 10, 15],
            }}
          />
        </Badge>
      )}
    </>
  )
}
