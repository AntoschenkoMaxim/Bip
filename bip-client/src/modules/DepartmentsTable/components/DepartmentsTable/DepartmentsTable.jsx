import { Badge, Button, Divider, Space, Table, Tag } from 'antd'
import { useState } from 'react'
import { useTableFilterAndSearch } from '../../../../hooks/useTableFilterAndSearch'
import { ActionsColumn } from '../../../../components'
import { DepartmentForm } from '../DepartmentForm/DepartmentForm'
import { AddLessonForm } from '../AddLessonForm/AddLessonForm'
import { useGetAllItemsQuery } from '../../../../hooks/useGetAllItemsQuery'
import { DEPARTMENTS_URL } from '../../../../constants/urls'
import { DEPARTMENTS_KEY } from '../../../../constants/keys'
import { useCreateItemQuery } from '../../../../hooks/useCreateItemQuery'
import { useUpdateItemByIdQuery } from '../../../../hooks/useUpdateItemByIdQuery'
import { useRemoveItemByIdQuery } from '../../../../hooks/useRemoveItemByIdQuery'

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

  const { data: departments, isSuccess } = useGetAllItemsQuery(
    DEPARTMENTS_URL,
    DEPARTMENTS_KEY
  )

  const { mutate: createDepartment } = useCreateItemQuery(
    DEPARTMENTS_URL,
    DEPARTMENTS_KEY
  )

  const { mutate: updateDepartment } = useUpdateItemByIdQuery(
    DEPARTMENTS_URL,
    DEPARTMENTS_KEY
  )

  const { mutate: removeDepartment } = useRemoveItemByIdQuery(
    DEPARTMENTS_URL,
    DEPARTMENTS_KEY
  )

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
        key='create'
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
          key='update'
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
