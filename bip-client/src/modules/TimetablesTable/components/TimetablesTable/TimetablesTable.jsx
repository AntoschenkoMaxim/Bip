import { Badge, Button, Divider, Image, Table } from 'antd'
import { useState } from 'react'
import { useTableFilterAndSearch } from '../../../../hooks/useTableFilterAndSearch'
import { ActionsColumn } from '../../../../components'
import { useGetAllTimetablesQuery } from '../../../../hooks/useGetAllTimetablesQuery'
import { useRemoveTimetableByIdQuery } from '../../hooks/useRemoveTimetableByIdQuery'
import { useUpdateTimetableByIdQuery } from '../../hooks/useUpdateTimetableByIdQuery'
import { useCreateTimetableQuery } from '../../hooks/useCreateTimetableQuery'
import { TimetableForm } from '../TimetableForm/TimetableForm'

export function TimetablesTable() {
  const { getColumnSearchProps } = useTableFilterAndSearch()
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      ...getColumnSearchProps('date', 'дате'),
    },
    {
      title: 'Изображение',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <Image
          src={`${import.meta.env.VITE_BASE_URL}/${image}`}
          alt='image'
          width={100}
        />
      ),
    },
    {
      title: 'Действия',
      dataIndex: 'operations',
      key: 'operations',
      render: (_, record) =>
        timetables?.rows.length >= 1 ? (
          <ActionsColumn
            record={record}
            removeItem={removeTimetable}
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

  const { data: timetables, isSuccess } = useGetAllTimetablesQuery()

  const { mutate: createTimetable } = useCreateTimetableQuery()

  const { mutate: updateTimetable } = useUpdateTimetableByIdQuery()

  const { mutate: removeTimetable } = useRemoveTimetableByIdQuery()

  return (
    <>
      <Button onClick={showCreateModal}>Добавить расписание</Button>
      <TimetableForm
        setSelectedRecord={setSelectedRecord}
        isModalOpen={isCreateModalOpen}
        setIsModalOpen={setIsCreateModalOpen}
        title='Создание расписания'
        btnTitle='Создать'
        onSubmit={createTimetable}
      />
      <Divider />
      {selectedRecord && (
        <TimetableForm
          id={selectedRecord.id}
          setSelectedRecord={setSelectedRecord}
          isModalOpen={isUpdateModalOpen}
          setIsModalOpen={setIsUpdateModalOpen}
          title='Редактирование расписания'
          btnTitle='Обновить'
          initialData={{
            title: selectedRecord.title,
            description: selectedRecord.description,
          }}
          onSubmit={updateTimetable}
        />
      )}
      {isSuccess && (
        <Badge count={timetables?.count} color='blue'>
          <Table
            tableLayout='fixed'
            columns={columns}
            dataSource={timetables?.rows}
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
