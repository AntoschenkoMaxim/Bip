import { Badge, Popconfirm, Space, Table } from 'antd'
import { UpdateLessonForm } from '../UpdateLessonForm/UpdateLessonForm'
import { useState } from 'react'
import { useRemoveLessonByIdQuery } from '../../hooks/useRemoveLessonByIdQuery'
import { useGetAllLessonsQuery } from '../../hooks/useGetAllLessonsQuery'

export function LessonsTable() {
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
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Действия',
      dataIndex: 'operations',
      key: 'operations',
      render: (_, record) =>
        lessons?.rows.length >= 1 ? (
          <Space>
            <Popconfirm
              title='Вы уверены?'
              onConfirm={() => removeLesson(record.id)}
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

  const { data: lessons, isSuccess } = useGetAllLessonsQuery()

  const { mutate: removeLesson } = useRemoveLessonByIdQuery()

  return (
    <>
      <UpdateLessonForm
        id={id}
        setId={setId}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
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
