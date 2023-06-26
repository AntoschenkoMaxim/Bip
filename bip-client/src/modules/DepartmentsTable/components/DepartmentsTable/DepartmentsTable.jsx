import { Badge, Button, Divider, Space, Table, Tag } from 'antd'
import { useState } from 'react'
import { useRemoveDepartmentByIdQuery } from '../../hooks/useRemoveDepartmentByIdQuery'
import { useGetAllDepartmentsQuery } from '../../../../hooks/useGetAllDepartmentsQuery'
import { useTableFilterAndSearch } from '../../../../hooks/useTableFilterAndSearch'
import { ActionsColumn } from '../../../../components'
import { DepartmentForm } from '../DepartmentForm/DepartmentForm'
import { useCreateDepartmentQuery } from '../../hooks/useCreateDepartmentQuery'
import { useUpdateDepartmentByIdQuery } from '../../hooks/useUpdateDepartmentByIdQuery'
import { AddLessonForm } from '../AddLessonForm/AddLessonForm'

export function DepartmentsTable() {
  const { getColumnSearchProps } = useTableFilterAndSearch()

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Значение',
      dataIndex: 'value',
      key: 'value',
      ...getColumnSearchProps('value', 'значению'),
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
      ...getColumnSearchProps('description', 'описанию'),
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
        departments?.rows.length >= 1 ? (
          <ActionsColumn
            record={record}
            removeItem={removeDepartment}
            showModal={showUpdateModal}
          />
        ) : null,
    },
  ]

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState()

  const showAddModal = () => {
    setIsAddModalOpen(true)
  }

  const showUpdateModal = (record) => {
    setSelectedRecord(record)
    setIsUpdateModalOpen(true)
  }

  const showCreateModal = () => {
    setIsCreateModalOpen(true)
  }

  const { data: departments, isSuccess } = useGetAllDepartmentsQuery()

  const { mutate: createDepartment } = useCreateDepartmentQuery()

  const { mutate: updateDepartment } = useUpdateDepartmentByIdQuery()

  const { mutate: removeDepartment } = useRemoveDepartmentByIdQuery()

  return (
    <>
      <Space>
        <Button onClick={showCreateModal}>Добавить кафедру</Button>
        <Button onClick={showAddModal}>Добавить предмет</Button>
      </Space>
      <AddLessonForm
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
      />
      <DepartmentForm
        setSelectedRecord={setSelectedRecord}
        isModalOpen={isCreateModalOpen}
        setIsModalOpen={setIsCreateModalOpen}
        title='Создание кафедры'
        btnTitle='Создать'
        onSubmit={createDepartment}
      />
      <Divider />
      {selectedRecord && (
        <DepartmentForm
          id={selectedRecord.id}
          setSelectedRecord={setSelectedRecord}
          isModalOpen={isUpdateModalOpen}
          setIsModalOpen={setIsUpdateModalOpen}
          title='Редактирование кафедры'
          btnTitle='Обновить'
          initialData={{
            value: selectedRecord.value,
            description: selectedRecord.description,
          }}
          onSubmit={updateDepartment}
        />
      )}
      {isSuccess && (
        <Badge count={departments?.count} color='blue'>
          <Table
            tableLayout='fixed'
            columns={columns}
            dataSource={departments?.rows}
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
