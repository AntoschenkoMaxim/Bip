import { Badge, Image, Table } from 'antd'
import { useState } from 'react'
import { UpdateTimetableForm } from '../UpdateTimetableForm/UpdateTimetableForm'
import { useTableFilterAndSearch } from '../../../../hooks/useTableFilterAndSearch'
import { ActionsColumn } from '../../../../components'
import { useGetAllTimetablesQuery } from '../../../../hooks/useGetAllTimetablesQuery'
import { useRemoveTimetableByIdQuery } from '../../hooks/useRemoveTimetableByIdQuery'

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

  const { data: timetables, isSuccess } = useGetAllTimetablesQuery()

  const { mutate: removeTimetable } = useRemoveTimetableByIdQuery()

  return (
    <>
      <UpdateTimetableForm
        id={id}
        setId={setId}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
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
