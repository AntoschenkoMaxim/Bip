import { Badge, Button, Divider, Table } from 'antd'
import { useState } from 'react'
import { useRemoveLessonByIdQuery } from '../../hooks/useRemoveLessonByIdQuery'
import { useTableFilterAndSearch } from '../../../../hooks/useTableFilterAndSearch'
import { ActionsColumn } from '../../../../components'
import { LessonForm } from '../LessonForm/LessonForm'
import { useUpdateLessonByIdQuery } from '../../hooks/useUpdateLessonByIdQuery'
import { useCreateLessonQuery } from '../../hooks/useCreateLessonQuery'
import { useGetAllItemsQuery } from '../../../../hooks/useGetAllItemsQuery'
import { LESSONS_URL } from '../../../../constants/urls'
import { LESSONS_KEY } from '../../../../constants/keys'

export function LessonsTable() {
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
      title: 'Действия',
      dataIndex: 'operations',
      key: 'operations',
      render: (_, record) =>
        lessons?.rows.length >= 1 ? (
          <ActionsColumn
            record={record}
            removeItem={removeLesson}
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
    setSelectedRecord(null)
    setIsCreateModalOpen(true)
  }

  const { data: lessons, isSuccess } = useGetAllItemsQuery(
    LESSONS_URL,
    LESSONS_KEY
  )

  const { mutate: createLesson } = useCreateLessonQuery()

  const { mutate: updateLesson } = useUpdateLessonByIdQuery()

  const { mutate: removeLesson } = useRemoveLessonByIdQuery()

  return (
    <>
      <Button onClick={showCreateModal}>Добавить предмет</Button>
      <LessonForm
        key='create'
        setSelectedRecord={setSelectedRecord}
        isModalOpen={isCreateModalOpen}
        setIsModalOpen={setIsCreateModalOpen}
        title='Создание предмета'
        btnTitle='Создать'
        onSubmit={createLesson}
      />
      <Divider />
      {selectedRecord && (
        <LessonForm
          key='update'
          id={selectedRecord.id}
          setSelectedRecord={setSelectedRecord}
          isModalOpen={isUpdateModalOpen}
          setIsModalOpen={setIsUpdateModalOpen}
          title='Обновление предмета'
          btnTitle='Обновить'
          initialData={{
            value: selectedRecord.value,
            description: selectedRecord.description,
          }}
          onSubmit={updateLesson}
        />
      )}
      {isSuccess && (
        <Badge count={lessons?.count} color='blue'>
          <Table
            tableLayout='fixed'
            columns={columns}
            dataSource={lessons?.rows}
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
