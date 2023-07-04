import { Badge, Button, Divider, Image, Table } from 'antd'
import { useState } from 'react'
import { useTableFilterAndSearch } from '../../../../hooks/useTableFilterAndSearch'
import { ActionsColumn } from '../../../../components'
import { ScheduleForm } from '../ScheduleForm/ScheduleForm'
import { useGetAllItemsQuery } from '../../../../hooks/useGetAllItemsQuery'
import { SCHEDULES_URL } from '../../../../constants/urls'
import { SCHEDULES_KEY } from '../../../../constants/keys'
import { useCreateItemQuery } from '../../../../hooks/useCreateItemQuery'
import { useUpdateItemByIdQuery } from '../../../../hooks/useUpdateItemByIdQuery'
import { useRemoveItemByIdQuery } from '../../../../hooks/useRemoveItemByIdQuery'

export function SchedulesTable() {
  const { getColumnSearchProps } = useTableFilterAndSearch()
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Заголовок',
      dataIndex: 'title',
      key: 'title',
      ...getColumnSearchProps('title', 'заголовку'),
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
        schedules?.rows.length >= 1 ? (
          <ActionsColumn
            record={record}
            removeItem={removeSchedule}
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

  const { data: schedules, isSuccess } = useGetAllItemsQuery(
    SCHEDULES_URL,
    SCHEDULES_KEY
  )

  const { mutate: createSchedule } = useCreateItemQuery(
    SCHEDULES_URL,
    SCHEDULES_KEY
  )

  const { mutate: updateSchedule } = useUpdateItemByIdQuery(
    SCHEDULES_URL,
    SCHEDULES_KEY
  )

  const { mutate: removeSchedule } = useRemoveItemByIdQuery(
    SCHEDULES_URL,
    SCHEDULES_KEY
  )

  return (
    <>
      <Button onClick={showCreateModal}>
        Добавить график учебного процесса
      </Button>
      <ScheduleForm
        key='create'
        setSelectedRecord={setSelectedRecord}
        isModalOpen={isCreateModalOpen}
        setIsModalOpen={setIsCreateModalOpen}
        title='Создание графика'
        btnTitle='Создать'
        onSubmit={createSchedule}
      />
      <Divider />
      {selectedRecord && (
        <ScheduleForm
          key='update'
          id={selectedRecord.id}
          setSelectedRecord={setSelectedRecord}
          isModalOpen={isUpdateModalOpen}
          setIsModalOpen={setIsUpdateModalOpen}
          title='Редактирование графика'
          btnTitle='Обновить'
          initialData={{
            title: selectedRecord.title,
            image: selectedRecord.image,
          }}
          onSubmit={updateSchedule}
        />
      )}
      {isSuccess && (
        <Badge count={schedules?.count} color='blue'>
          <Table
            tableLayout='fixed'
            columns={columns}
            dataSource={schedules?.rows}
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
