import { Badge, Image, Popconfirm, Space, Table, Tooltip } from 'antd'
import { useState } from 'react'
import { UpdateScheduleForm } from '../UpdateScheduleForm/UpdateScheduleForm'
import { useGetAllSchedulesQuery } from '../../../../hooks/useGetAllSchedulesQuery'
import { useRemoveScheduleByIdQuery } from '../../hooks/useRemoveScheduleByIdQuery'
import { useTableFilterAndSearch } from '../../../../hooks/useTableFilterAndSearch'
import { ActionsColumn } from '../../../../components'

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

  const { data: schedules, isSuccess } = useGetAllSchedulesQuery()

  const { mutate: removeSchedule } = useRemoveScheduleByIdQuery()

  return (
    <>
      <UpdateScheduleForm
        id={id}
        setId={setId}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
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
