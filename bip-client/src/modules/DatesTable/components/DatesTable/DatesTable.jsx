import { Badge, Image, Popconfirm, Space, Table, Tooltip } from 'antd'
import { useState } from 'react'
import { UpdateDateForm } from '../UpdateDatesForm/UpdateDatesForm'
import { useRemoveDateByIdQuery } from '../../hooks/useRemoveDateByIdQuery'
import { useGetAllDatesQuery } from '../../../../hooks/useGetAllDatesQuery'

export function DatesTable() {
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
        dates?.rows.length >= 1 ? (
          <Space>
            <Popconfirm
              title='Вы уверены?'
              onConfirm={() => removeDate(record.id)}
            >
              <a>Удалить</a>
            </Popconfirm>
            <a onClick={() => showModal(record.id)}>Изменить</a>
          </Space>
        ) : null,
    },
  ]

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [id, setId] = useState(null)

  const showModal = (id) => {
    setId(id)
    setIsModalOpen(true)
  }

  const { data: dates, isSuccess } = useGetAllDatesQuery()

  const { mutate: removeDate } = useRemoveDateByIdQuery()

  return (
    <>
      <UpdateDateForm
        id={id}
        setId={setId}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      {isSuccess && (
        <Badge count={dates?.count} color='blue'>
          <Table
            tableLayout='fixed'
            columns={columns}
            dataSource={dates?.rows}
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
