import { Badge, Button, Divider, Table, Tag } from 'antd'
import { useState } from 'react'
import { TeacherForm } from '../TeacherForm/TeacherForm'
import { useGetAllTeachersQuery } from '../../../../hooks/useGetAllTeachersQuery'
import { useRemoveTeacherByIdQuery } from '../../hooks/useRemoveTeacherByIdQuery'
import { useTableFilterAndSearch } from '../../../../hooks/useTableFilterAndSearch'
import { ActionsColumn } from '../../../../components'
import { useUpdateTeacherByIdQuery } from '../../hooks/useUpdateTeacherByIdQuery'
import { useCreateTeacherQuery } from '../../hooks/useCreateTeacherQuery'

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
            showModal={showUpdateModal}
          />
        ) : null,
    },
  ]
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState()

  const showUpdateModal = (record) => {
    setSelectedRecord(record)
    setIsUpdateModalOpen(true)
  }

  const showCreateModal = () => {
    setIsCreateModalOpen(true)
  }

  const { data: teachers, isSuccess } = useGetAllTeachersQuery()

  const { mutate: createTeacher } = useCreateTeacherQuery()

  const { mutate: updateTeacher } = useUpdateTeacherByIdQuery()

  const { mutate: removeTeacher } = useRemoveTeacherByIdQuery()

  return (
    <>
      <Button onClick={showCreateModal}>Добавить преподавателя</Button>
      <TeacherForm
        key='create'
        setSelectedRecord={setSelectedRecord}
        isModalOpen={isCreateModalOpen}
        setIsModalOpen={setIsCreateModalOpen}
        title='Создание преподавателя'
        btnTitle='Создать'
        onSubmit={createTeacher}
      />
      <Divider />
      {selectedRecord && (
        <TeacherForm
          key='update'
          id={selectedRecord.id}
          setSelectedRecord={setSelectedRecord}
          isModalOpen={isUpdateModalOpen}
          setIsModalOpen={setIsUpdateModalOpen}
          title='Редактирование преподавателя'
          btnTitle='Обновить'
          initialData={{
            lastName: selectedRecord.lastName,
            firstName: selectedRecord.firstName,
            surname: selectedRecord.surname,
            phone: selectedRecord.phone,
            email: selectedRecord.email,
            telegram: selectedRecord.telegram,
            role: selectedRecord.role,
          }}
          onSubmit={updateTeacher}
        />
      )}
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
