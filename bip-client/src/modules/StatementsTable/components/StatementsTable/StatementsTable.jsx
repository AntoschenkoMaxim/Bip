import { Badge, Image, Popconfirm, Space, Table, Tooltip } from 'antd'
import { useState } from 'react'
import { useGetAllStatementsQuery } from '../../../../hooks/useGetAllStatementsQuery'
import { UpdateStatementForm } from '../UpdateStatementForm/UpdateStatementForm'
import { useRemoveStatementByIdQuery } from '../../hooks/useRemoveStatementByIdQuery'

export function StatementsTable() {
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
        statements?.rows.length >= 1 ? (
          <Space>
            <Popconfirm
              title='Вы уверены?'
              onConfirm={() => removeStatement(record.id)}
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

  const { data: statements, isSuccess } = useGetAllStatementsQuery()

  const { mutate: removeStatement } = useRemoveStatementByIdQuery()

  return (
    <>
      <UpdateStatementForm
        id={id}
        setId={setId}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      {isSuccess && (
        <Badge count={statements?.count} color='blue'>
          <Table
            tableLayout='fixed'
            columns={columns}
            dataSource={statements?.rows}
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
